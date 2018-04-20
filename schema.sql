 --Drops the programming_db if it already exists--
 DROP DATABASE IF EXISTS bamazon_db;
 --Create a database called programming_db--
 CREATE DATABASE bamazon_db;
 --Use programming db for the following statements--
 USE bamazon_db;
 CREATE TABLE products(
     item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     product_name VARCHAR(40) NULL,
     department_name VARCHAR(40) NULL,
     stock_quantity INT NULL,
     price DECIMAL(10, 2) NULL
 );
 SELECT * FROM products;
 INSERT INTO products(product_name, department_name, stock_quantity, price)
 VALUES('Purple Pillow', 'Home', 7, 99.99); 