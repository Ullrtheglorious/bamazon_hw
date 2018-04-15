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
                message: "Manager Menu, Please Select Operation",
                choices: ["View all Items", "View Low Inventory", "Add to Inventory", "Add a New Product"],
                name: "start"
            },
        ])
        .then(function (data) {
            console.log(data.start);
            connection.connect(function (err) {
                switch(data.start) {
                    case "View all Items":
                        allItems();
                        break;

                    case "View Low Inventory":
                        lowInventory();
                        break;
                    
                    case "Add to Inventory":
                        addInventory();
                        break;
                    
                    case "Add a New Product":
                        addProduct();
                        break;
                }
            });
        });
}

function allItems() {
    connection.query("SELECT * FROM products", function (err, data) {
        for (var i = 0; i < data.length; i++) {
            console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity));
        }
        console.log("----------------------------------------")
        startingQuestion();
    })
};


function lowInventory() {
    console.log("----------------------------------------")
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            if (data[i].stock_quantity < 5) {
                console.log((data[i].item_id + " | Department: " + data[i].department_name + " | Item: " + data[i].product_name + " | Price: " + data[i].price + " | Quantity Left: " + data[i].stock_quantity));
            }
        }
        console.log("----------------------------------------")
        startingQuestion();
    })
}

function addInventory() {
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
                    message: "Select an item to order",
                    choices: itemList,
                    name: "item"
                },
                {
                    type: "input",
                    message: "How much would you like to order?",
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
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQty[parseInt(itemId)] += parseInt(data.count)
                        },
                        {
                            Item_id: itemId
                        }
                    ]);
                console.log("\nOrder Completed!\n"),
                connection.end(),
                startingQuestion()
                })

    });
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Product name",
            name: "product"
        },
        {
            type: "input",
            message: "What department?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price?",
            name: "price",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            message: "How many do you want to order?",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (data) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: data.product,
                department_name: data.department,
                stock_quantity: data.quantity,
                price: data.price
            })
        console.log("\n-----------------------------\n" + data.product + " added to store!" + "\n-----------------------------\n");
        startingQuestion();
    })
}
