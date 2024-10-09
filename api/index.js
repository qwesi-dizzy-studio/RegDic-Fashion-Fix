const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
};

const db = mysql.createPool(dbConfig);

app.post('/login', async (req, res) => {
  const { role, username, password } = req.body;
  if (role === 'user') {
    const [rows] = await db.execute(`SELECT * FROM users WHERE username = ? AND password = ? AND role = 'user';`, [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, redirect: 'userpage.html' });
    } else {
      res.json({ success: false, message: 'Invalid login credentials!' });
    }
  } else if (role === 'admin') {
    const adminCode = 'pRGnS611';
    if (password === adminCode) {
      res.json({ success: true, redirect: 'admin_dashboard.html' });
    } else {
      res.json({ success: false, message: 'Invalid admin code!' });
    }
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});

