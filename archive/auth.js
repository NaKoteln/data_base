const express = require('express');
const {sequelize, DbContext} = require('../db/dbContext');
const bcrypt = require('bcrypt');

const app = express();
const port = 5500;

// const pool = new Pool(dbConfig);

app.use(express.json());

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO Users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
});


// Вход пользователя
app.post('/login', async (req, res) => {
    // парсинг запроса, отправленного клиентом
    const { username, password } = req.body;

    try {
        // user содержит плользователя, найденного в таблице по такому username
        const { rows: [user] } = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username] // значение для $1
        );

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid username or password');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
