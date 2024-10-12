<?php
// Database connection
$host = 'localhost'; // Database host
$user = 'root'; // Database username
$pass = 'dizzy'; // Database password
$dbname = 'ecommerce'; // Database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check if connection was successful
if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

// Get the submitted data from the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if username already exists
    $checkUser = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $checkUser->bind_param('s', $username);
    $checkUser->execute();
    $checkUserResult = $checkUser->get_result();

    if ($checkUserResult->num_rows > 0) {
        echo 'Username already exists';
    } else {
        // Insert the new user into the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Hash the password for security

        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param('ss', $username, $hashedPassword);

        if ($stmt->execute()) {
            echo 'success';
        } else {
            echo 'Error creating account';
        }

        $stmt->close();
    }
    $checkUser->close();
}

$conn->close();
?>
