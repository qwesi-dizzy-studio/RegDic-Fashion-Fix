
const mysql = require('mysql2/promise');


// Connect to the database
const db = await mysql.createConnection(dbConfig);

if (role === 'user') {
  // Query to check user credentials
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ? AND password = ? AND role = "user";',
    [username, password]
  );
  if (rows.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirect: 'userpage.html' })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Invalid login credentials' })
    };
  }
} else if (role === 'admin') {
  const adminCode = 'pRGnS611';
  if (password === adminCode) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirect: 'admin_dashboard.html' })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: 'Invalid admin code' })
    };
  }
}
