const { Client } = require('pg');

exports.handler = async function (event, context) {
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

  // Connect to the PostgreSQL database (update the credentials with your Render DB details)
  const client = new Client({
    host: process.env.RENDER_DB_HOST, // Your Render PostgreSQL host
    user: process.env.RENDER_DB_USER, // Your PostgreSQL user
    password: process.env.RENDER_DB_PASSWORD, // Your PostgreSQL password
    database: process.env.RENDER_DB_NAME, // Your PostgreSQL database name
    port: 5432, // Default PostgreSQL port
  });

  try {
    // Connect to the database
    await client.connect();

    // Check if the username already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
    const userResult = await client.query(checkUserQuery, [username]);

    if (userResult.rows.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username already exists' }),
      };
    }

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const hashedPassword = password; // Use bcrypt for hashing in a real-world app
    await client.query(insertUserQuery, [username, hashedPassword]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User created successfully' }),
    };

  } catch (err) {
    console.error('Database error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database query error' }),
    };
  } finally {
    // Ensure the database connection is closed
    await client.end();
  }
};
  
