const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('db.sqlite3');
const app = express();

app.use(express.json());


app.post('/', async (req, res) => {
    console.log('Request accepted!');

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO users(name, email, phone, comment) VALUES(?,?,?,?)');
        stmt.run(req.body.name, req.body.email, req.body.phone, req.body.comment);
        stmt.finalize();
    });

    return res.json({
        status: 'ok',
        message: 'Ваши данные успешно записаны'
    });
});

app.get('/', async (req, res) => { 
    const token = req.query.token;

    db.get('SELECT token FROM admins WHERE token=?', [token], (err, row) => {
        if (row === undefined) { 
            console.error('Request rejected for token=', token);
            return res.status(403).json({
                status: 'error', 
                message: 'Token invalid'
            });
        }
        console.log('Request accepted for token=', token);
        const stmt = db.all('SELECT DISTINCT * FROM users', [], (err, rows) => { 
            return res.json(rows);
        });
    });

});

app.listen(3000);