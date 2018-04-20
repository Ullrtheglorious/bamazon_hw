


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
                                    console.log("----------------------------")
                                    allItems();
                                    break;
                                case "Electronics":
                                    console.log("----------------------------")
                                    electronicsItems();
                                    break;
                                case "Kitchen":
                                    console.log("----------------------------")
                                    kitchenItems();
                                    break;
                                case "Office":
                                    console.log("----------------------------")
                                    officeItems();
                                    break;
                                case "Furniture":
                                    console.log("----------------------------")
                                    furnitureItems();
                                    break;
                                case "Home":
                                    console.log("----------------------------")
                                    homeItems();
                                    break;
                            }
                            
                        });
                    })
            }
        });
}

var selectedItem;

function allItems() {
    connection.query("SELECT * FROM products", function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};

function electronicsItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Electronics"], function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};
function kitchenItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Kitchen"], function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};
function officeItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Office"], function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};
function furnitureItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Furniture"], function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};
function homeItems() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Home"], function (err, data) {
        var itemList = [];
        var stockQty = {};
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity))
            itemList.push(data[i].item_id.toString() + ") " + data[i].product_name)
            stockQty[data[i].item_id] = (data[i].stock_quantity);
        }
        console.log("----------------------------------------")
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select an item to purchase?",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How many would you like to buy",
                    name: "count",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                        startingQuestion()
                    }
                }    
            ])
            .then(function (data) {
                var itemId = data.item.split(")")[0];
                if (data.count > stockQty[itemId] || stockQty[itemId] == 0) {
                    console.log("\nInsufficient Quantity!\n");
                    startingQuestion()
                } else {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockQty[parseInt(itemId)] - parseInt(data.count)
                            },
                            {
                                Item_id: itemId
                            }
                        ]);
                }
                console.log("\nPurchase Complete!\n");
                connection.end();
                startingQuestion()
            })
    });
};
// function buyItems () {
    
// }



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