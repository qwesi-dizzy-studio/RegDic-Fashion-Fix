const mysql = require('mysql');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse the form data from the request
  const data = JSON.parse(event.body);
  const username = data.username;
  const password = data.password;

  // Validate the input (this is basic validation; you can improve it)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username and password are required' }),
    };
  }

  // Connect to the database (update the credentials)
  const connection = mysql.createConnection({
    host: 'localhost', // e.g., 'localhost' or AWS RDS instance
    user: 'ecommerce',
    password: 'dizzy',
    database: 'ecommerce'
  });

  connection.connect();

  // Check if the username already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  return new Promise((resolve, reject) => {
    connection.query(checkUserQuery, [username], (err, results) => {
      if (err) {
        connection.end();
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Database query error' }),
        });
      }

      if (results.length > 0) {
        connection.end();
        return resolve({
          statusCode: 400,
          body: JSON.stringify({ error: 'Username already exists' }),
        });
      }

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const hashedPassword = password; // Use bcrypt for hashing in a real-world app

      connection.query(insertUserQuery, [username, hashedPassword], (err) => {
        connection.end();
        if (err) {
          return resolve({
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create user' }),
          });
        }

        return resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'User created successfully' }),
        });
      });
    });
  });
};
