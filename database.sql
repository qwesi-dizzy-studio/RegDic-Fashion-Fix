CREATE DATABASE mydb;

USE mydb;

--Login Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
    role ENUM('user','admin') NOT NULL
);

--Signup Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
    role ENUM('user','admin') NOT NULL
);

INSERT INTO users (username,password,role)
VALUES
    ('john','password123','user'),
    ('admin','pRGnS611','admin'); 




SELECT * FROM users;

-- Items Table
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    image VARCHAR(255)
);

-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_name VARCHAR(100),
    item_name VARCHAR(100),
    buyer_location VARCHAR(255),
    buyer_phone VARCHAR(20),
    payment_method VARCHAR(50)
);
