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

app.post('/peoples', async (req, res) => {
    const { l_n, f_n, s_n, passport_data, gender, p_id } = req.body;
    try {
        await pool.query('INSERT INTO peoples (last_name, first_name, second_name, passport_data, gender, parent_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [l_n, f_n, s_n, passport_data, gender, p_id]);
        res.status(201).send('People added successfully');
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
});

app.post('/grours', async (req, res) => {
    const { name, country, check_in_date, check_out_date } = req.body;
    try {
        await pool.query('INSERT INTO tourist_groups (name, country, check_in_date, check_out_date) VALUES ($1, $2, $3, $4)',
            [name, country, check_in_date, check_out_date]);
        res.status(201).send('Group added successfully');
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
});

// существование группы с group_id проверять здесь или где-то в другом месте?
// в задании написано "Ограничения целостности максимально вынести на уровень БД"
app.post('/tourists', async (req, res) => {
    const { group_id, people_id, category } = req.body;
    try {
        await pool.query('INSERT INTO tourist_groups (group_id, people_id, category) VALUES ($1, $2, $3)',
            [group_id, people_id, category]);
        res.status(201).send('Tourist added successfully');
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
})