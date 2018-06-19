
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk"); // module to add colors
var Table = require('cli-table'); //creates custom style tables in the command line
var cTable = require('console.table');

var items = [];

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
    displayAll();
});

//function displays all current products by item id, product name and price
function displayAll() {
    console.log("\r\n" + chalk.yellow("*----------* " + (chalk.green("Welcome to Bamazon")) + " *-----------*" + "\r\n"));
    var query = connection.query("SELECT item_id, product_name, price FROM products ORDER BY item_id", function(err, results, fields) {
        if(err) throw err;
        console.table(results);
        for(obj in results) {
            items.push(results[obj].item_id);
        }
        return purchaseItems(items);
    })
}

//function to prompt customer to place order for any item in store by using item id and quantity
function purchaseItems() {
   inquirer.prompt([
       {
           type: "input",
           name: "orderItem",
           message: "Please enter the item ID for the product you would like to purchase"
       },
       {
           type: "input",
           name: "itemQty",
           message: "Please enter the quantity amount you would like to purchase"
       }
   ]).then(function(customerOrder) {
    //    var orderArr = [];
       for (var i = 0; i < items.length; i++) {
           if(parseInt(customerOrder.orderItem) === items[i]) {
            var available = true;
           }
           
       }
      if(available === true) {
          var query = connection.query("SELECT item_id, product_name, price, stock_qty FROM products WHERE ?", 
        {
            item_id: customerOrder.orderItem
        }, 
        function(err, results) {
            if(err) throw err;
            // console.log(results);

            if(results[0].stock_qty < customerOrder.itemQty) {
                console.log("Oh no! looks like your requested quantity is not available!");
                purchaseItems(items);
            } else {
                var newStock = results[0].stock_qty - customerOrder.itemQty
                var qty = customerOrder.itemQty
                var id = results[0].item_id
                var price = results[0].price
                var product = results[0].product_name

                updateStock(id, product, qty, price, newStock);
                productSales(id, qty, price);
            }
        })
    } else {
        console.log("Yikes! There was an error while placing your order. Please re-enter the item ID & quantity again.");
        purchaseItems(items);
    }
   })
   
}

//function that updates product info into database with new sale
function productSales(id, qty, price) {
    var query = connection.query("UPDATE products SET product_sales=IFNULL(product_sales, 0) + ?*? WHERE item_id=?", [qty, price, id], 
function(err, results) {
    if(err) throw err;
    // console.log(results)
});

}

//function that updates the new stock availability in database
function updateStock(id, product, qty, price, newStock){
    var query = connection.query("UPDATE products SET stock_qty=? WHERE item_id=?", [newStock, id], 
function(err, results) {
    if(err) throw err;
    // console.log(results);

    var orderTotal = price * qty
    console.log("\r\n" + "Your order details: " + "\r\n" + qty + " " + product + " $" + orderTotal.toFixed(2) + "\r\n");
    inquirer.prompt([
        {
            type: "list",
            name: "orderConfirm",
            message: "\r\n" + "Please confirm your order before purchase",
            choices: ["PURCHASE", "No Thanks"]
        }
    ]).then(function(confirm) {
        if(confirm.orderConfirm === "PURCHASE") {
            console.log("\r\n" + "Thank you for your purchase! Your total order is " + "$" + orderTotal + ".00");
        }
        else{
            console.clear();
            console.log("I'm sorry you are not satisfied with your order, we hope to see you return soon!");
        }
    })
  
    })
    console.clear();
}


