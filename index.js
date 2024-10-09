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

    // Event listener for role change
    document.getElementById('role').addEventListener('change', function() {
      const role = document.getElementById('role').value;
      const usernameGroup = document.getElementById('usernameGroup');
      const passwordLabel = document.getElementById('passwordLabel');
      
      if (role === 'admin') {
        // Hide username field for admin and change password label to "Type unique code"
        usernameGroup.style.display = 'none';
        passwordLabel.textContent = 'Type unique code';
      } else {
        // Show username field for user and revert the password label back to "Password"
        usernameGroup.style.display = 'block';
        passwordLabel.textContent = 'Password';
      }
    });

    // Event listener for login form submission
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      const role = document.getElementById('role').value;
      const password = document.getElementById('password').value;

      if (role === 'user') {
        const username = document.getElementById('username').value;
        
        // Query database for user data
        const [rows] = await db.execute(`
          SELECT * FROM users
          WHERE username = ? AND password = ? AND role = 'user';
        `, [username, password]);

        if (rows.length > 0) {
          window.location.href = 'userpage.html'; // Redirect to user dashboard
        } else {
          document.getElementById('loginMessage').textContent = 'Invalid login credentials!';
        }
      } else if (role === 'admin') {
        const adminCode = 'pRGnS611';
        if (password === adminCode) {
          window.location.href = 'admin_dashboard.html'; // Redirect to admin dashboard
        } else {
          document.getElementById('loginMessage').textContent = 'Invalid admin code!';
        }
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

// Call main function
main();

