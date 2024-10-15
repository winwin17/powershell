const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4300;

// MySQL connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Incognito@17", // Change it to your own password
    database: "mydb5"
});

conn.connect(err => {
    if (err) throw err;
    console.log("MySQL connected");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'myht.html'));
});

// Handle form submission
app.post('/submitform', (req, res) => {
    const { Name, Room, Address } = req.body;
    const query = `INSERT INTO students (name, room, address) VALUES (?, ?, ?)`;
    const values = [Name, Room, Address];

    conn.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send(err.message);
            return;
        }
        res.status(200).send("Data inserted successfully");
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
