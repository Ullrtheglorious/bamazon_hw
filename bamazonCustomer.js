// --Drops the programming_db if it already exists--
// DROP DATABASE IF EXISTS bamazon_db;
// --Create a database called programming_db--
// CREATE DATABASE bamazon_db;
// --Use programming db for the following statements--
// USE bamazon_db;
// CREATE TABLE products(
//     item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     product_name VARCHAR(40) NULL,
//     department_name VARCHAR(40) NULL,
//     stock_quantity INT NULL,
//     price DECIMAL(10, 2) NULL
// );
// SELECT * FROM products;
// INSERT INTO products(product_name, department_name, stock_quantity, price)
// VALUES('Purple Pillow', 'Home', 7, 99.99); 


var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

startingQuestion();

function startingQuestion() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Hello, Welcome to Bamazon. Lets get started!",
                choices: ["View Items"],
                name: "start"
            },
        ])
        .then(function (data) {
            console.log(data.start);
            if (data.start === "View Items") {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "What type of items would you like to view?",
                            choices: ["All Items", "Electronics", "Kitchen", "Office", "Furniture", "Home"],
                            name: "items"
                        }
                    ])
                    .then(function (data) {
                        connection.connect(function (err) {
                            switch (data.items) {
                                case "All Items":
                                    allItems();
                                    break;
                                case "Electronics":
                                    electronicsItems();
                                    break;
                                case "Kitchen":
                                    kitchenItems();
                                    break;
                                case "Office":
                                    officeItems();
                                    break;
                                case "Furniture":
                                    furnitureItems();
                                    break;
                                case "Home":
                                    homeItems();
                                    break;
                            }
                            connection.end();
                        });
                    })
            }
        });
}


function allItems() {
    connection.query("SELECT * FROM products", function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};

function electronicsItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Electronics"], function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};
function kitchenItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Kitchen"], function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};
function officeItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Office"], function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};
function furnitureItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Furniture"], function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};
function homeItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Home"], function (err, data) {
        var itemList = [];
        for (var i = 0; i < data.length; i++) {
            itemList.push((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Quantity Left: " + data[i].stock_quantity + " | Price: " + data[i].price));
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "stocklist"
                },
            ])
        // console.log("-----------------------------------")
    });
};




// function addItem(i, s, c) {
//     console.log("Adding a new Item\n");
//     var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//             department_name: c,
//             item: i,
//             starting_price: s
//         },
//         function (err, data) {
//             console.log("Item Added\n");
//         }
//     );
//     console.log(query.sql);
//     startingQuestion();
// }