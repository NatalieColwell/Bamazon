var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk"); // module to add colors
var Table = require('cli-table'); //creates custom style tables in the command line
var cTable = require('console.table');

//connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    // console.log("Yay! your connected as ID " + connection.threadId + "\r\n");
    managerDashboard();
});

//display of manager options
function managerDashboard() {
   inquirer.prompt([
       {
           type: "list",
           name: "mngrOptions",
           message: "Menu Selection",
           choices: [new inquirer.Separator(), "Products", "Inventory", "Update Inventory", "Add Products"]
       }
   ]).then(function(results) {
        switch(results.mngrOptions) {
            case "Products":
            products();
            break;

            case "Inventory":
            lowInventory();
            break;

            case "Update Inventory":
            addInventory();
            break;

            case "Add Products":
            addProduct();
            break;
        }
   })
}

//function to display items and product details from database
function products() {
    var query = connection.query("SELECT item_id, department_name, product_name, price, stock_qty, product_sales FROM products ORDER BY item_id", function(err, results, fields) {
        if(err) throw err;
        console.log("\r\n" + " - - - - - - - - - - - - - - - - - - - - - - - - " + "\r\n");
        console.log("\r\n" + "-------- BAMAZON PRODUCTS ----------" + "\r\n");
        var productsList = [];
        console.table(results);
        for(obj in results) {
            productsList.push(results[obj].products);
        }
        return managerDashboard(productsList);
    })
};

//function to display all items that have an inventory quantity below 5
function lowInventory() {
    var query = connection.query("SELECT item_id, department_name, product_name, price, stock_qty FROM products WHERE stock_qty < 5", function(err, results, fields) {
        if(err) throw err;
        console.log("\r\n" + " - - - - - - - - - - - - - - - - - - - - - - - - " + "\r\n");
        console.log("\r\n" + "-------- BAMAZON LOW INVENOTRY ----------" + "\r\n");
        var inventoryLow = [];
        console.table(results);
        for(obj in results) {
            inventoryLow.push(results[obj].products);
        }
        return managerDashboard();
    })
};

//function to update product inventory in Bamazon current product list
function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "\r\n" + "Enter the ITEM ID for the product you would like to update to: "
        },
        {
            type: "input",
            name: "stockUpdate",
            message: "\r\n" + "Enter the new stock quantity for this item: "
        }
    ]).then(function(response) {
        var query = connection.query("UPDATE products SET stock_qty = ? WHERE item_id = ?", [response.stockUpdate, response.itemID],
    function(err, res) {
        if(err) throw err;
        console.log("\r\n" + "-------- BAMAZON UPDATED INVENOTRY ----------" + "\r\n");
        console.log("You updated the stock quantity to: " + response.stockUpdate + " for item ID: " + response.itemID  + "\r\n");
        console.log("\r\n" + " - - - - - - - - - - - - - - - - - - - - - - - - " + "\r\n");
        return managerDashboard();
        })
        
    })
};

//function that prompts user to input/add new products to the Bamazon Store
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the item ID number: "
        },
        {
            type: "input",
            name: "department",
            message: "Enter the Department category for the product: "
        },
        {
            type: "input",
            name: "product",
            message: "Enter the product name: "
        },
        {
            type: "input",
            name: "price",
            message: "Enter the retail sale price for the product: "
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the stock quantity amount for the new product: "
        }
    ]).then(function(userInput) {
        var query = connection.query("INSERT INTO products (item_id, department_name, product_name, price, stock_qty) VALUES (?, ?, ?, ?, ?)", 
        [
            userInput.id,
            userInput.department,
            userInput.product,
            userInput.price,
            userInput.quantity
        ],
        function(err, res) {
            if(err) throw err;
            
        })
        console.log("\r\n" + "-------- BAMAZON NEW PRODUCT ----------" + "\r\n");
        console.log("The following item has been added: " + "\r\n" + "item ID: " + userInput.id + "\r\n" + "Department: " + userInput.department + "\r\n" + "Product Name: " + userInput.product + "\r\n" + "Price per unit: " + userInput.price + "\r\n" + "Quantity: "  + userInput.quantity);
        return products();
    })
    
}

