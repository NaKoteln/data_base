const { sequelize, DbContext, Op } = require("../dbContext");
const { QueryTypes } = require('sequelize');

let people = {
    model: DbContext.Peoples,
    attributes: ['lastName', 'firstName', 'middleName', 'passportData', 'gender'],
};

function getReport1(body) {
    let category = body.category;
    try {
        let tourists;
        if (category) {
            tourists = DbContext.Tourists.findAll({
                attributes: ['touristId', 'category'],
                include: [people],
                where: { category: category },
            });
        } else {
            tourists = DbContext.Tourists.findAll({
                attributes: ['touristId', 'category'],
                include: [people],
            });
        }
        return tourists;
    } catch (error) {
        console.error('Ошибка при получении списка туристов для таможни:', error);
        throw error;
    }
}

function getReport2(body) {
    let category = body.category;
    let hotelName = body.hotelName;
    try {
        let list;
        if (category) {
            list = DbContext.HotelBookings.findAll({
                attributes: ['checkInDate', 'checkOutDate'],
                include: [
                    {
                        model: DbContext.Hotels,
                        attributes: ['name'],
                        where: { name: hotelName },
                    },
                    {
                        model: DbContext.Tourists,
                        include: [{
                            model: DbContext.Peoples,
                            attributes: ['lastName', 'firstName'],
                        }],
                        where: { category: category },
                    },
                ],
            });
            //     list = sequelize.query(`SELECT 
            //     h.Hotel_Name,
            //     hb.Check_in_date,
            //     hb.Check_out_date,
            //     p.Last_Name, 
            //     p.First_Name
            // FROM Hotel_Booking hb
            // JOIN Tourists t ON hb.Tourist_ID = t.Tourist_ID
            // JOIN Peoples p ON t.People_ID = p.People_ID
            // JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
            // WHERE h.Hotel_Name = :hotel AND t.Category = :category;`, { replacements: { hotel: hotelName, category: category } })
        } else {
            list = DbContext.HotelBookings.findAll({
                attributes: ['checkInDate', 'checkOutDate'],
                include: [
                    {
                        model: DbContext.Hotels,
                        attributes: ['name'],
                        where: { name: hotelName },
                    },
                    {
                        model: DbContext.Tourists,
                        include: [{
                            model: DbContext.Peoples,
                            attributes: ['lastName', 'firstName'],
                        }],
                    },
                ],
            });
        }
        return list;
    } catch (error) {
        console.error('Ошибка при получении списка отелей:', error);
        throw error;
    }
}

function getReport3(body) {
    let category = body.category;
    let country = body.country;
    let startDate = body.startDate;
    let endDate = body.endDate;
    try {
        let count;
        if (category) {
            count = DbContext.Tourists.count({
                include: [{
                    model: DbContext.TouristGroups,
                    include: [{
                        model: DbContext.Countries,
                        where: { name: country },
                    }],
                    where: {
                        checkInDate: { [Op.gte]: startDate },
                        checkOutDate: { [Op.lte]: endDate },
                    }
                }],
                where: { category: category },
            })
        } else {
            count = DbContext.Tourists.count({
                include: [{
                    model: DbContext.TouristGroups,
                    include: [{
                        model: DbContext.Countries,
                        where: { name: country },
                    }],
                    where: {
                        checkInDate: { [Op.gte]: startDate },
                        checkOutDate: { [Op.lte]: endDate },
                    }
                }],
            })
        };
        return count;
    } catch (error) {
        console.error('Ошибка при получении количества туристов, побывавших в стране:', error);
        throw error;
    }
}

async function getReport4(body) {
    try {
        let country = body.country;
        let tourist = body.touristId;
        let flights = await DbContext.FlightsSchedules.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('*')), 'visits'],
                [sequelize.fn('MIN', sequelize.col('date')), 'firstArrival'],
                [sequelize.fn('MAX', sequelize.col('date')), 'lastDeparture'],
            ],
            include: [{
                model: DbContext.Tourists,
                include: [{
                    model: DbContext.TouristGroups,
                    include: [{
                        model: DbContext.Countries,
                        where: { name: country },
                        attributes: [],
                    }],
                    attributes: [],
                }],
                attributes: [],
            }],
            // group: ['scheduleId'],
            raw: true,
        });
        let hotels = await DbContext.HotelBookings.findAll({
            attributes: [
                [sequelize.col('Hotel.name'), 'hotelName'],
                'checkInDate', 'checkOutDate',
            ],
            include: [{
                model: DbContext.Hotels,
                attributes: [],
            },
            {
                model: DbContext.Tourists,
                where: { touristId: tourist },
                attributes: [],
            }],
            raw: true,
        });
        let excursions = await DbContext.ExcursionBookingRecords.findAll({
            attributes: [
                [sequelize.col('ExcursionSchedule->Excursion.name'), 'excursionName'],
                [sequelize.col('ExcursionSchedule->Excursion->Agency.name'), 'agencyName'],
            ],
            include: [{
                model: DbContext.ExcursionSchedules,
                include: [{
                    model: DbContext.Excursions,
                    include: [{
                        model: DbContext.Agencies,
                        attributes: [],
                    }],
                    attributes: [],
                }],
                attributes: [],
            }],
            where: { touristId: tourist },
            raw: true,
        });
        let purchases = await DbContext.WarehouseItems.findAll({
            attributes: ['name', 'weight'],
            include: [{
                model: DbContext.Purchases,
                include: [{
                    model: DbContext.Tourists,
                    where: { touristId: tourist },
                    attributes: [],
                }],
                attributes: [],
            }],
            raw: true,
        })
        return { flights, hotels, excursions, purchases };
    } catch (error) {
        console.error('Ошибка при получении данных про туриста:', error);
        throw error;
    }
}

function getReport5(body) {
    try {
        let startDate = body.startDate;
        let endDate = body.endDate;
        return sequelize.query(`SELECT 
        h.name,
        COUNT(*) AS occupiedRooms,
        SUM(t.numberOfGuests) AS totalGuests
    FROM "Hotels" h
    JOIN "HotelBookings" hb ON h."hotelId" = hb."hotelId"
    LEFT JOIN 
        (SELECT 
             hb."hotelId",
             hb."bookingId",
             COUNT(*) AS numberOfGuests
         FROM "HotelBookings" hb
         JOIN "Tourists" t ON hb."touristId" = t."touristId"
         WHERE hb."checkInDate" BETWEEN :start AND :date
         GROUP BY hb."hotelId", hb."bookingId") AS t ON hb."hotelId" = t."hotelId" AND hb."bookingId" = t."bookingId"
    WHERE hb."checkInDate" BETWEEN :start AND :date
    GROUP BY h.name;`, { replacements: { start: startDate, date: endDate }, type: QueryTypes.SELECT });
    } catch {
        console.error('Ошибка при получении списка гостиниц:', error);
        throw error;
    }

}

function getReport6(body) {
    let startDate = body.startDate;
    let endDate = body.endDate;
    try {
        return DbContext.ExcursionBookingRecords.count({
            include: [{
                model: DbContext.ExcursionSchedules,
                where: {
                    excursionDate: { [Op.between]: [startDate, endDate] }
                }
            }],
            // group: ['touristId', 'scheduleId'],
        })
    } catch (error) {
        console.error('Ошибка при получении количества туристов, заказавших экскурсии:', error);
        throw error;
    }
}

async function getReport7() {
    try {
        // let excursions = DbContext.ExcursionBookingRecords.findAll({
        //     attributes: [
        //         [sequelize.fn('COUNT', sequelize.col('*')), 'countBookings'],
        //         [sequelize.col('ExcursionSchedule->Excursion.name'), 'excursionName']
        //     ],
        //     include: [
        //         {
        //             model: DbContext.ExcursionSchedules,
        //             include: [{
        //                 model: DbContext.Excursions,
        //                 attributes: [],
        //             }],
        //             attributes: [],
        //         },
        //     ],
        //     group: ['excursionName'],
        //     order: [['countBookings', 'DESC']],
        //     limit: 10,
        // });
        let excursions = await sequelize.query(`SELECT
        e."excursionId",
        e.name,
        COUNT (1) AS count_bookings
    FROM "ExcursionBookingRecords" ebr
    JOIN "ExcursionSchedules" es ON ebr."scheduleId" = es."scheduleId"
    JOIN "Excursions" e ON es."excursionId" = e."excursionId"
    GROUP BY e."excursionId", e.name
    ORDER BY count_bookings DESC
    LIMIT 10;`, { type: QueryTypes.SELECT });
        // let agencies = DbContext.Feedbacks.findAll({
        //     attributes: [
        //         [sequelize.col('Excursion->Agency.name'), 'agencyName'],
        //         [sequelize.fn('AVG', sequelize.col('estimation')), 'averageEstimation']
        //     ],
        //     include: [
        //         {
        //             model: DbContext.Excursions,
        //             include: [{
        //                 model: DbContext.Agencies,
        //                 attributes: [],
        //             }],
        //             attributes: [],
        //         },
        //     ],
        //     group: ['agencyName'],
        //     order: [['averageEstimation', 'DESC']],
        //     limit: 10,
        // });
        let agencies = await sequelize.query(`SELECT 
        a."agencyId",
        a.name,
        AVG(f.estimation) AS average_estimation
    FROM "Feedbacks" f
    JOIN "Excursions" e ON f."excursionId" = e."excursionId"
    JOIN "Agencies" a ON e."agencyId" = a."agencyId"
    GROUP BY a."agencyId", a.name
    ORDER BY average_estimation DESC
    LIMIT 10;`, { type: QueryTypes.SELECT });
        return ({ excursions, agencies });
    } catch (error) {
        console.error('Ошибка при получении экскурсий и агенств:', error);
        throw error;
    }
}

function getReport8(body) {
    let flight = body.flightNumber;
    let date = body.date;
    try {
        // return DbContext.Flights.findAll({
        //     attributes: ['flightId', 'seatsNumber',
        //         [sequelize.fn('COUNT', sequelize.col('FlightsSchedules.touristId')), 'occupiedSeats'],
        //         [sequelize.fn('SUM', sequelize.col('FlightsSchedules->Tourist->Purchases->WarehouseItem.weight')), 'totalWeight'],
        //     ],
        //     include: [{
        //         model: DbContext.FlightsSchedules,
        //         include: [{
        //             model: DbContext.Tourists,
        //             include: [{
        //                 model: DbContext.Purchases,
        //                 include: [{
        //                     model: DbContext.WarehouseItems,
        //                     attributes: [],
        //                 }],
        //                 attributes: [],
        //             }],
        //             attributes: [],
        //         }],
        //         where: { date: date },
        //         attributes: [],
        //     }],
        //     where: { flightId: flight },
        //     group: ['Flights.flightId', 'seatsNumber'],
        // });
        return sequelize.query(`SELECT 
        f."flightId",
        f."seatsNumber" AS total_seats,
        COUNT(fs."touristId") AS occupied_seats,
        SUM(w.weight) AS total_cargo_weight
    FROM "Flights" f
    JOIN "FlightsSchedules" fs ON f."flightId" = fs."flightNumber"
    JOIN "Purchases" p ON fs."touristId" = p."touristId"
    LEFT JOIN "WarehouseItems" w ON p."productId" = w."productId"
    WHERE 
        f."flightId" = :flight
        AND fs.date = :date
    GROUP BY 
        f."flightId", f."seatsNumber";`, { replacements: { flight: flight, date: date }, type: QueryTypes.SELECT });
    } catch (error) {
        console.error('Ошибка при получении данных про рейс:', error);
    }
}

function getReport9(body) {
    let startDate = body.startDate;
    let endDate = body.endDate;
    try {
        return DbContext.WarehouseItems.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('placeNumber'))), 'occupiedSeats'],
                [sequelize.fn('SUM', sequelize.col('weight')), 'totalWeight'],
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('Purchases->Tourist->FlightsSchedules.flightNumber'))), 'totalFlights'],
            ],
            include: [{
                model: DbContext.Purchases,
                include: [{
                    model: DbContext.Tourists,
                    include: [{
                        model: DbContext.FlightsSchedules,
                        attributes: [],
                    }],
                    attributes: [],
                }],
                attributes: [],
            }],
            where: {
                unloadingDate: { [Op.between]: [startDate, endDate] }
            },
            raw: true,
        });
    } catch (error) {
        console.error('Ошибка при получении грузооборота склада:', error);
        throw error;
    }
}

function getReport10(body) {
    try {
        let category = body.category;
        let groupId = body.groupId;
        if (groupId && !category) {
            return sequelize.query(`SELECT
            tg."groupId",
            SUM(h."nightCost" * (hb."checkOutDate" - hb."checkInDate")) AS totalHotelCost,
            SUM(e.cost) AS totalExcursionCost,
            COUNT(DISTINCT t."touristId") AS totalTourists
        FROM "TouristGroups" tg
        JOIN "Tourists" t ON tg."groupId" = t."groupId"
        LEFT JOIN "HotelBookings" hb ON t."touristId" = hb."touristId"
        LEFT JOIN "Hotels" h ON hb."hotelId" = h."hotelId"
        LEFT JOIN "ExcursionBookingRecords" ebs ON t."touristId" = ebs."touristId"
        LEFT JOIN "ExcursionSchedules" es ON ebs."scheduleId" = es."scheduleId"
        LEFT JOIN "Excursions" e ON es."excursionId" = e."excursionId"
        WHERE tg."groupId" = :group
        GROUP BY tg."groupId";`, { replacements: { group: groupId }, type: QueryTypes.SELECT });
        } else if (groupId && category) {
            return sequelize.query(`SELECT
            tg."groupId",
            SUM(h."nightCost" * (hb."checkOutDate" - hb."checkInDate")) AS totalHotelCost,
            SUM(e.cost) AS totalExcursionCost,
            COUNT(DISTINCT t."touristId") AS totalTourists
        FROM "TouristGroups" tg
        JOIN "Tourists" t ON tg."groupId" = t."groupId"
        LEFT JOIN "HotelBookings" hb ON t."touristId" = hb."touristId"
        LEFT JOIN "Hotels" h ON hb."hotelId" = h."hotelId"
        LEFT JOIN "ExcursionBookingRecords" ebs ON t."touristId" = ebs."touristId"
        LEFT JOIN "ExcursionSchedules" es ON ebs."scheduleId" = es."scheduleId"
        LEFT JOIN "Excursions" e ON es."excursionId" = e."excursionId"
        WHERE tg."groupId" = :group AND t.category = :category
        GROUP BY tg."groupId";`, { replacements: { group: groupId, category: category }, type: QueryTypes.SELECT });
        }
    } catch {

    }
}

async function getReport11(body) {
    try {
        let startDate = body.startDate;
        let endDate = body.endDate;
        let income = await DbContext.TouristServices.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Service.cost')), 'totalExpense'],
            ],
            include: [{
                model: DbContext.Services,
                where: { cost: { [Op.gt]: 0 } },
                attributes: [],
            }],
            where: { date: { [Op.between]: [startDate, endDate] } },
            raw: true
        });
        income = +income[0].totalExpense;
        
        let temp = await DbContext.TouristServices.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Service.cost')), 'totalExpense'],
            ],
            include: [{
                model: DbContext.Services,
                where: { cost: { [Op.lt]: 0 } },
                attributes: [],
            }],
            where: { date: { [Op.between]: [startDate, endDate] } },
            raw: true
        });
        let expense = +temp[0].totalExpense;

        temp = await DbContext.ExcursionSchedules.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Excursion.cost')), 'totalExpense'],
            ],
            include: [{
                model: DbContext.Excursions,
                attributes: [],
            }],
            where: { 'excursionDate': { [Op.between]: [startDate, endDate] } },
            raw: true
        });
        income += +temp[0].totalExpense;

        temp = await DbContext.HotelBookings.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Hotel.nightCost')), 'totalExpense'],
            ],
            include: [{
                model: DbContext.Hotels,
                attributes: [],
            }],
            where: {
                checkInDate: { [Op.gte]: startDate },
                checkOutDate: { [Op.lte]: endDate },
            },
            raw: true
        });
        income += +temp[0].totalExpense;

        return { expense, income }
    } catch (error) {
        console.error('Ошибка при получении расходов и доходов:', error);
        throw error;
    }
}

function getReport12() {
    try {
        return sequelize.query(`SELECT
        w.name,
        COUNT(*) AS totalShipments,
        COUNT(*) * 100.0 / totalTotalShipments AS sharePercentage
    FROM "Purchases"
    JOIN (SELECT COUNT(*) AS totalTotalShipments FROM "Purchases") ON true
    JOIN "WarehouseItems" w ON "Purchases"."productId" = w."productId"
    GROUP BY w.name, totalTotalShipments
    ORDER BY totalShipments DESC;`, { type: QueryTypes.SELECT })
    } catch (error) {
        console.error('Ошибка при получении статистики:', error);
        throw error;
    }
}

async function getReport13(body) {
    try {
        let { expense, income } = await getReport11(body);
        if (expense === 0) {
            return ('Нет затрат представительства');
        }
        return income / expense;
    } catch (error) {
        console.error('Ошибка при получении рентабельности:', error);
        throw error;
    }
}
async function getReport14(body) {
    try {
        let startDate = body.startDate;
        let endDate = body.endDate;
        if (startDate && endDate) {
            let countShopTourists = await sequelize.query(`SELECT COUNT(*) FROM "TouristGroups" tg2 
            JOIN "Tourists" t2 ON tg2."groupId" = t2."groupId" 
            WHERE t2.category = 'shop' AND tg2."checkInDate" BETWEEN :start AND :end`, { replacements: { end: endDate, start: startDate }, type: QueryTypes.SELECT });
            let count = countShopTourists[0].count;
            if (+count === 0) {
                return ('Нет туристов на шоппинг, их количество = 0');
            } else {
                return sequelize.query(`SELECT
                (SELECT COUNT(*) FROM "TouristGroups"
                JOIN "Tourists" ON "TouristGroups"."groupId" = "Tourists"."groupId" WHERE "checkInDate" BETWEEN :start AND :end) AS totalTourists,
                (SELECT COUNT(*) FROM "TouristGroups" tg 
                JOIN "Tourists" t ON tg."groupId" = t."groupId" 
                WHERE t.category = 'rest' AND tg."checkInDate" BETWEEN :start AND :end) AS leisureTourists,
                (SELECT COUNT(*) FROM "TouristGroups" tg 
                JOIN "Tourists" t ON tg."groupId" = t."groupId" 
                WHERE t.category = 'shop' AND tg."checkInDate" BETWEEN :start AND :end) AS shopTourists,
                (SELECT COUNT(*) FROM "TouristGroups" tg1 
                JOIN "Tourists" t1 ON tg1."groupId" = t1."groupId" 
                WHERE t1.category = 'rest' AND tg1."checkInDate" BETWEEN :start AND :end) * 100.0 /
                (SELECT COUNT(*) FROM "TouristGroups" tg2 
                JOIN "Tourists" t2 ON tg2."groupId" = t2."groupId" 
                WHERE t2.category = 'shop' AND tg2."checkInDate" BETWEEN :start AND :end) AS leisureShopRatio;`, { replacements: { end: endDate, start: startDate }, type: QueryTypes.SELECT });
            }
        } else {
            let countShopTourists = await sequelize.query(`SELECT COUNT(*) FROM "Tourists" WHERE category = 'shop'`, { type: QueryTypes.SELECT });
            let count = countShopTourists[0].count;
            console.log(countShopTourists);
            if (+count === 0) {
                return ('Количество туристов на шоппинг равно 0');
            } else {
                return sequelize.query(`SELECT
                (SELECT COUNT(*) FROM "Tourists") AS totalTourists,
                (SELECT COUNT(*) FROM "Tourists" WHERE category = 'rest') AS leisureTourists,
                (SELECT COUNT(*) FROM "Tourists" WHERE category = 'shop') AS shopTourists,
                (SELECT COUNT(*) FROM "Tourists" WHERE category = 'rest') * 100.0 /
                (SELECT COUNT(*) FROM "Tourists" WHERE category = 'shop') AS leisureShopRatio;`, { type: QueryTypes.SELECT })
            }
        }
    } catch (error) {
        console.error('Ошибка при получении соотношения:', error);
        throw error;
    }
}

function getReport15(body) {
    try {
        return sequelize.query(`SELECT
        t."touristId",
        tg."groupId",
        tg.name AS groupName,
        w.name as cargo,
        h.name AS hotel,
        fs."flightNumber" AS flightNumber,
        fs.date AS flightDate
    FROM "FlightsSchedules" fs
    JOIN "Tourists" t ON fs."touristId" = t."touristId"
    JOIN "TouristGroups" tg ON t."groupId" = tg."groupId"
    LEFT JOIN "HotelBookings" hb ON t."touristId" = hb."touristId"
    LEFT JOIN "Hotels" h ON hb."hotelId" = h."hotelId"
    LEFT JOIN "Purchases" p ON t."touristId" = p."touristId"
    LEFT JOIN "WarehouseItems" w ON p."productId" = w."productId"
    WHERE fs."flightNumber" = :flight
    GROUP BY t."touristId",
    tg."groupId",
    groupName,
    hotel,
    flightNumber,
    flightDate, cargo;`, { replacements: { flight: body.flightId }, type: QueryTypes.SELECT })
    } catch (error) {
        console.error('Ошибка при получении туристов рейса:', error);
        throw error;
    }
}

module.exports = {
    getReport1,
    getReport2,
    getReport3,
    getReport4,
    getReport5,
    getReport6,
    getReport7,
    getReport8,
    getReport9,
    getReport10,
    getReport11,
    getReport12,
    getReport13,
    getReport14,
    getReport15,
};