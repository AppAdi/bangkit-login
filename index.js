const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bangkit'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            throw err;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
        } else {
            res.json({ success: true, data:results });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
