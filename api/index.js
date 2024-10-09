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
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const [rows] = await db.execute(query, [username, password]);
  if (rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  await db.execute(query, [username, password]);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
```
