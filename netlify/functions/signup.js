const mysql = require('mysql');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { username, password } = JSON.parse(event.body);

    const connection = mysql.createConnection({
        host: 'YOUR_XAMPP_HOST', // Usually localhost
        user: 'root', // Default XAMPP user
        password: '', // Leave empty if no password
        database: 'user_auth',
    });

    connection.connect();

    const hashedPassword = /* your hashing logic here */;
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const values = [username, hashedPassword, 'user'];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'User created successfully' }),
                });
            }
        });
    });
};
