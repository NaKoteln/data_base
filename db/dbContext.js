const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('travelCompany', 'postgres', 'Password',
    {
        host: 'localhost',
        dialect: 'postgres',
    },
    {
        define: {
            freezeTableName: true,
        },
    });

const DbContext = {
    Peoples: sequelize.define('Peoples', {
        peopleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lastName: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        passportData: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }),

    Countries: sequelize.define('Countries', {
        countryId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            
        },
    }),

    TouristGroups: sequelize.define('TouristGroups', {
        groupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Countries', key: 'countryId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        checkInDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkOutDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }),

    Tourists: sequelize.define('Tourists', {
        touristId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'TouristGroups', key: 'groupId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        peopleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Peoples', key: 'peopleId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        category: {
            type: DataTypes.ENUM('child', 'shop', 'rest'),
            allowNull: false,
        }
    }),

    Hotels: sequelize.define('Hotels', {
        hotelId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        nightCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }),

    HotelBookings: sequelize.define('HotelBookings', {
        bookingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hotelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Hotels', key: 'hotelId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        checkInDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkOutDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }),

    Agencies: sequelize.define('Agencies', {
        agencyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        }
    }),

    Excursions: sequelize.define('Excursions', {
        excursionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Agencies', key: 'agencyId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maximumPeople: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }),

    ExcursionSchedules: sequelize.define('ExcursionSchedules', {
        scheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        excursionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Excursions', key: 'excursionId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        excursionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        }
    }),

    ExcursionBookingRecords: sequelize.define('ExcursionBookingRecords', {
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        scheduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: { model: 'ExcursionSchedules', key: 'scheduleId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }),

    Feedbacks: sequelize.define('Feedbacks', {
        recordId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        excursionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Excursions', key: 'excursionId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        estimation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(150),
            allowNull: true,
        }
    }),

    Flights: sequelize.define('Flights', {
        flightId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        seatsNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cargoSeats: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }),

    FlightsSchedules: sequelize.define('FlightsSchedules', {
        scheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        flightNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Flights', key: 'flightId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        flightType: {
            type: DataTypes.ENUM('departure', 'arrival'),
            allowNull: false,
        }
    }),

    Visas: sequelize.define('Visas', {
        visaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        issueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    }),

    VisaDocuments: sequelize.define('VisaDocuments', {
        documentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        visaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Visas', key: 'visaId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING(150),
            allowNull: true,
        }
    }),

    WarehouseItems: sequelize.define('WarehouseItems', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        placeNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        insuranceCost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        packagingCost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        receiptDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        unloadingDate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }),

    Purchases: sequelize.define('Purchases', {
        purchaseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'WarehouseItems', key: 'productId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }),

    Users: sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "reader",
        }
    }),

    Services: sequelize.define('Services', {
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            readOnly: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            readOnly: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }),

    TouristServices: sequelize.define('TouristService', {
        recordId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        touristId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Tourists', key: 'touristId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Services', key: 'serviceId' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }),
};

// Установка связи между People и самим собой для родительского ID
DbContext.Peoples.belongsTo(DbContext.Peoples, { foreignKey: 'parentId', allowNull: true });

DbContext.Countries.hasMany(DbContext.TouristGroups, { foreignKey: 'countryId', onDelete: 'CASCADE' });
DbContext.TouristGroups.belongsTo(DbContext.Countries,  { foreignKey: 'countryId', onDelete: 'CASCADE' });

DbContext.Hotels.hasMany(DbContext.HotelBookings, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
DbContext.HotelBookings.belongsTo(DbContext.Hotels, { foreignKey: 'hotelId', onDelete: 'CASCADE' });

DbContext.HotelBookings.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Tourists.hasMany(DbContext.HotelBookings, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.Tourists.belongsTo(DbContext.Peoples, { foreignKey: 'peopleId', onDelete: 'CASCADE' });
DbContext.Peoples.hasMany(DbContext.Tourists, { foreignKey: 'peopleId', onDelete: 'CASCADE' });

DbContext.TouristGroups.hasMany(DbContext.Tourists, { foreignKey: 'groupId', onDelete: 'CASCADE' });
DbContext.Tourists.belongsTo(DbContext.TouristGroups, { foreignKey: 'groupId', onDelete: 'CASCADE' });

DbContext.Tourists.hasMany(DbContext.Visas, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Visas.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.Visas.hasMany(DbContext.VisaDocuments, { foreignKey: 'visaId', onDelete: 'CASCADE' });
DbContext.VisaDocuments.belongsTo(DbContext.Visas, { foreignKey: 'visaId', onDelete: 'CASCADE' });

DbContext.Tourists.hasMany(DbContext.Feedbacks, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Feedbacks.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.Feedbacks.belongsTo(DbContext.Excursions, { foreignKey: 'excursionId', onDelete: 'CASCADE' });
DbContext.Excursions.hasMany(DbContext.Feedbacks, { foreignKey: 'excursionId', onDelete: 'CASCADE' });

DbContext.Agencies.hasMany(DbContext.Excursions, { foreignKey: 'Agency_ID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
DbContext.Excursions.belongsTo(DbContext.Agencies, { foreignKey: 'Agency_ID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

DbContext.FlightsSchedules.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Tourists.hasMany(DbContext.FlightsSchedules, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.FlightsSchedules.belongsTo(DbContext.Flights, { foreignKey: 'flightId', onDelete: 'CASCADE' });
DbContext.Flights.hasMany(DbContext.FlightsSchedules, { foreignKey: 'flightId', onDelete: 'CASCADE' });

DbContext.Excursions.hasMany(DbContext.ExcursionSchedules, { foreignKey: 'excursionId', onDelete: 'CASCADE' });
DbContext.ExcursionSchedules.belongsTo(DbContext.Excursions, { foreignKey: 'excursionId', onDelete: 'CASCADE' });

DbContext.ExcursionSchedules.hasMany(DbContext.ExcursionBookingRecords, { foreignKey: 'scheduleId', onDelete: 'CASCADE' });
DbContext.ExcursionBookingRecords.belongsTo(DbContext.ExcursionSchedules, { foreignKey: 'scheduleId', onDelete: 'CASCADE' });

DbContext.ExcursionBookingRecords.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Tourists.hasMany(DbContext.ExcursionBookingRecords, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.WarehouseItems.hasMany(DbContext.Purchases, { foreignKey: 'productId', onDelete: 'CASCADE' });
DbContext.Purchases.belongsTo(DbContext.WarehouseItems, { foreignKey: 'productId', onDelete: 'CASCADE' });

DbContext.Purchases.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Tourists.hasMany(DbContext.Purchases, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.TouristServices.belongsTo(DbContext.Tourists, { foreignKey: 'touristId', onDelete: 'CASCADE' });
DbContext.Tourists.hasMany(DbContext.TouristServices, { foreignKey: 'touristId', onDelete: 'CASCADE' });

DbContext.TouristServices.belongsTo(DbContext.Services, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
DbContext.Services.hasMany(DbContext.TouristServices, { foreignKey: 'serviceId', onDelete: 'CASCADE' });

// Синхронизация моделей с базой данных
(async () => {
    try {
        // await sequelize.sync({ force: true });
        await sequelize.sync();
        console.log('Модели синхронизированы успешно.');
    } catch (error) {
        console.error('Ошибка синхронизации моделей:', error);
    } finally {
        // sequelize.close();
    }
})();

module.exports = { sequelize, DbContext, Op };
