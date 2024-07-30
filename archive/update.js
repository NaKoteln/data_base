const express = require('express');
const { Pool } = require('pg');

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

app.patch('/peoples/:id', async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;
    const { l_n, f_n, s_n, passport_data, gender, p_id } = req.body;
    const query = 'UPDATE peoples SET last_name = $1, first_name = $2, second_name = $3, passport_data = $4, gender = $5, parent_id = $6 WHERE id = $7';
    const values = [l_n, f_n, s_n, passport_data, gender, p_id, id];
    try {
        await client.query(query, values);
        res.status(200).send('People updated successfully');
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).send('Error updating user');
    } finally {
        client.release();
    }
});

