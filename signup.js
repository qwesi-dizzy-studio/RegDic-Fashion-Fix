
// Import mysql2
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
};

// Create connection
async function main() {
  try {
    // Connect to database
    const db = await mysql.createConnection(dbConfig);
    console.log('Connected to database');

    // Event listener for signup form submission
    document.getElementById('signupForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Hash password (recommended)
      const hashedPassword = await hashPassword(password);

      // Query database to check if username exists
      const [rows] = await db.execute(`
        SELECT * FROM users
        WHERE username = ?;
      `, [username]);

      if (rows.length > 0) {
        document.getElementById('signupMessage').textContent = 'Username already exists!';
      } else {
        // Insert user data into database
        await db.execute(`
          INSERT INTO users (username, password, role)
          VALUES (?, ?, 'user');
        `, [username, hashedPassword]);

        document.getElementById('signupMessage').textContent = 'Sign-Up successful!';
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

// Hash password function (recommended)
async function hashPassword(password) {
  const crypto = require('crypto');
  const salt = 'your-salt-value';
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  return hash.digest('hex');
}

// Call main function
main();
