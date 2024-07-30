const express = require('express');
const { Pool } = require('pg');

const { sequelize, DbContext: Models } = require('../db/dbContext.js');

const dbConfig = {
    user: 'postgres',
    password: '!Pa090ac72',
    host: 'localhost',
    port: 5432, // Порт, на котором работает PostgreSQL
    database: 'TravelCompany',
}

const app = express();
app.use(express.json());
const port = 5500;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const pool = new Pool(dbConfig);

app.delete('/peoples', async (req, res) => {
    const { id } = req.body;
    try {
        await Models.Peoples.destroy({
            where: { People_ID: id, },
        });
        // await pool.query('DELETE FROM peoples WHERE id = $1', [id]);
        res.status(200).send('People deleted successfully');
    } catch (err) {
        console.error('Error deleting user', err);
        res.status(500).send('Error deleting user');
    }
});

app.delete('/people/all', async (req, res) => {
    try {
        await Models.Peoples.destroy({
            truncate: true,
        });
        res.status(200).send('All people deleted successfully');
    } catch {
        console.error('Error deleting user', err);
        res.status(500).send('Error deleting user');
    }
})