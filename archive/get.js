// const express = require('express');
// const { Pool } = require('pg');

const { DataTypes } = require('sequelize');

const { sequelize, DbContext: Models } = require('../db/dbContext.js');

// Установка связи между People и самим собой для родительского ID
Models.Peoples.belongsTo(Models.Peoples, { foreignKey: 'Parent_ID', allowNull: true });

Models.Hotels.hasMany(Models.HotelBooking, { foreignKey: 'Hotel_ID' });
Models.HotelBooking.belongsTo(Models.Hotels, { foreignKey: 'Hotel_ID' });

Models.HotelBooking.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });
Models.Tourists.hasMany(Models.HotelBooking, { foreignKey: 'Tourist_ID' });

Models.Tourists.belongsTo(Models.Peoples, { foreignKey: 'People_ID' });
Models.Peoples.hasMany(Models.Tourists, { foreignKey: 'People_ID' });

Models.TouristGroups.hasMany(Models.Tourists, { foreignKey: 'Group_ID' });
Models.Tourists.belongsTo(Models.TouristGroups, { foreignKey: 'Group_ID' });

Models.Tourists.hasMany(Models.Visas, { foreignKey: 'Tourist_ID' });
Models.Visas.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });

Models.Visas.hasMany(Models.VisasDocument, { foreignKey: 'Visa_ID' });
Models.VisasDocument.belongsTo(Models.Visas, { foreignKey: 'Visa_ID' });

Models.Tourists.hasMany(Models.Feedback, { foreignKey: 'Tourist_ID' });
Models.Feedback.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });

Models.Feedback.belongsTo(Models.Excursions, { foreignKey: 'Excursion_ID' });
Models.Excursions.hasMany(Models.Feedback, { foreignKey: 'Excursion_ID' });

Models.Agencies.hasMany(Models.Excursions, { foreignKey: 'Agency_ID' });
Models.Excursions.belongsTo(Models.Agencies, { foreignKey: 'Agency_ID' });

Models.FlightsSchedule.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });
Models.Tourists.hasMany(Models.FlightsSchedule, { foreignKey: 'Tourist_ID' });

Models.FlightsSchedule.belongsTo(Models.Flights, { foreignKey: 'Flight_ID' });
Models.Flights.hasMany(Models.FlightsSchedule, { foreignKey: 'Flight_ID' });

Models.Excursions.hasMany(Models.ExcursionSchedule, { foreignKey: 'Excursion_ID' });
Models.ExcursionSchedule.belongsTo(Models.Excursions, { foreignKey: 'Excursion_ID' });

Models.ExcursionSchedule.hasMany(Models.ExcursionBookingRecords, { foreignKey: 'Schedule_ID' });
Models.ExcursionBookingRecords.belongsTo(Models.ExcursionSchedule, { foreignKey: 'Schedule_ID' });

Models.ExcursionBookingRecords.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });
Models.Tourists.hasMany(Models.ExcursionBookingRecords, { foreignKey: 'Tourist_ID' });

Models.Warehouse.hasMany(Models.Purchases, { foreignKey: 'Product_ID' });
Models.Purchases.belongsTo(Models.Warehouse, { foreignKey: 'Product_ID' });

Models.Purchases.belongsTo(Models.Tourists, { foreignKey: 'Tourist_ID' });
Models.Tourists.hasMany(Models.Purchases, { foreignKey: 'Tourist_ID' });

// Синхронизация моделей с базой данных
(async () => {
    try {
        await sequelize.sync();
        console.log('Модели синхронизированы успешно.');
    } catch (error) {
        console.error('Ошибка синхронизации моделей:', error);
    } finally {
        sequelize.close();
    }
})();

let people = {
    model: Models.Peoples,
    attributes: ['People_ID', 'Last_Name', 'First_Name', 'Middle_Name', 'Passport_Data', 'Gender'],
};

let group = {
    model: Models.TouristGroups,
    attributes: ['Group_ID', 'Name_Group', 'Country'],
};

let hotel = {
    model: Models.Hotels,
    attributes: ['Hotel_ID', 'Hotel_Name', 'Night_Cost'],
};

let tourist = {
    model: Models.Tourists,
    attributes: ['Tourist_ID', 'Group_ID', 'People_ID', 'Category'],
};

async function getTouristsForCustoms(category = null) {
    try {
        let tourists;
        if (category) {
            tourists = await Models.Tourists.findAll({
                include: [people, group],
                where: { Category: category },
            });
        } else {
            tourists = await Models.Tourists.findAll({
                include: [people, group],
            });
        }
        return tourists;
    } catch (error) {
        console.error('Ошибка при получении списка туристов для таможни:', error);
        throw error;
    }
}

async function getHotelBooking(category = null) {
    try {
        let hotels;
        if (category) {
            hotels = await Models.HotelBooking.findAll({
                include: [{
                    model: Models.Hotels,
                    model: Models.Tourists,
                    where: { Category: category },
                }],
            });
        } else {
            hotels = await Models.HotelBooking.findAll({
                include: [hotel, tourist],
            });
        }
        return hotels;
    } catch (error) {
        console.error('Ошибка при получении списка отелей:', error);
        throw error;
    }
}

async function getCountTouristsInCountry(country, category, startDate, endDate) { 
    try {
        let count;
        if (category) {
            count = await Models.TouristGroups.findAndCountAll({
                where: {
                    Check_in_date: { [Op.gte]: startDate },
                    Check_out_date: { [Op.lte]: endDate },
                },
                include: [{
                    model: Models.Tourists,
                    where: { Category: category },
                }],
            });
        } else {
            count = await Models.TouristGroups.findAndCountAll({
                where: {
                    Check_in_date: { [Op.gte]: startDate },
                    Check_out_date: { [Op.lte]: endDate },
                },
                include: [{ model: Models.Tourists }],
            });
        }
        return count;
    } catch (error) {
        console.error('Ошибка при получении количества туристов:', error);
        throw error;
    }
}


// Получение всех записей из таблицы Peoples
// async function getAllPeople() {
//     try {
//         const people = await Models.Peoples.findAll();
//         console.log(people);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
// // Вызов функции для получения всех записей из таблицы
// getAllPeople();


// const dbConfig = {
//     user: 'postgres',
//     password: '!Pa090ac72',
//     host: 'localhost',
//     port: 5432, // Порт, на котором работает PostgreSQL
//     database: 'TravelCompany',
// }

// const app = express();
// const port = 5500;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// const pool = new Pool(dbConfig);

// // Получение данных из базы данных
// app.get('/users', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM users');
//         const users = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(users);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/tourists/all', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT t.Tourist_ID, p.Last_Name, p.First_Name,
//         p.Middle_Name, p.Passport_Data, p.Gender
//         FROM Tourists t
//         JOIN Peoples p ON t.People_ID = p.People_ID;`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// // Должно быть по разным категориям: отдых, груз, дети
// app.get('/tourists/cargo', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT t.Tourist_ID, p.Last_Name, p.First_Name,
//         p.Middle_Name, p.Passport_Data, p.Gender
//         FROM Tourists t
//         JOIN Peoples p ON t.People_ID = p.People_ID
//         WHERE t.Category = 'cargo';`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// app.get('/tourists/accommodation', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT h.Hotel_Name, hb.Check_in_date, hb.Check_out_date,
//         p.Last_Name, p.First_Name
//         FROM Hotel_Booking hb
//         JOIN Tourists t ON hb.Tourist_ID = t.Tourist_ID
//         JOIN Peoples p ON t.People_ID = p.People_ID
//         JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
//         WHERE h.Hotel_Name = 'Название отеля';`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// // Должно быть по разным категориям: отдых, груз, дети
// app.get('/tourists/accommodation/cargo', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT h.Hotel_Name, hb.Check_in_date, hb.Check_out_date,
//         p.Last_Name, p.First_Name
//         FROM Hotel_Booking hb
//         JOIN Tourists t ON hb.Tourist_ID = t.Tourist_ID
//         JOIN Peoples p ON t.People_ID = p.People_ID
//         JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
//         WHERE h.Hotel_Name = 'Название отеля' AND t.Category = 'cargo';`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// app.get('/tourists/country', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT COUNT (*) AS total_tourists
//         FROM Tourists t
//         JOIN Tourist_Groups tg ON t.Group_ID = tg.Group_ID
//         JOIN Flights_Schedule fs ON t.Tourist_ID = fs.Tourist_ID
//         WHERE tg.Country = 'Название страны' AND fs.flight_type = 'arrival' AND fs.date_time BETWEEN '2022-03-24' AND '2022-03-29';`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// // Должно быть по разным категориям: отдых, груз, дети
// app.get('/tourists/country/cargo', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(`SELECT COUNT (*) AS total_tourists
//         FROM Tourists t
//         JOIN Tourist_Groups tg ON t.Group_ID = tg.Group_ID
//         JOIN Flights_Schedule fs ON t.Tourist_ID = fs.Tourist_ID
//         WHERE tg.Country = 'Название страны' AND t.Category = 'cargo' AND fs.flight_type = 'arrival'
//         AND fs.date_time BETWEEN '2022-03-24' AND '2022-03-29';`);
//         const tourists = result.rows;
//         // освобождение клиента, его возврат в pool
//         client.release();
//         // отправка данных клиенту
//         res.json(tourists);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// и тд все SQL запросы



// Создание нового клиента PostgreSQL
// const client = new Client(dbConfig);

// // Подключение к базе данных
// client
//     .connect()
//     .then(() => {
//         console.log('Connected to PostgreSQL database');

//         // Execute SQL queries here

//         client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['name', 'name'], (err, result) => {
//             if (err) {
//                 console.error('Error executing query', err);
//             } else {
//                 console.log('Query result:', result.rows);
//             }

//             // Close the connection when done
//             client
//                 .end()
//                 .then(() => {
//                     console.log('Connection to PostgreSQL closed');
//                 })
//                 .catch((err) => {
//                     console.error('Error closing connection', err);
//                 });
//         });
//     })
//     .catch((err) => {
//         console.error('Error connecting to PostgreSQL database', err);
//     });

