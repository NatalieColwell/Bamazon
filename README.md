# Welcome to Bamazon


__Bamazon__ is an *Amazon-like* storefront that is a command-line inventory app in node.js and mySQL 

### To get started, follow the steps below

1. You will need to clone the repository in addition to installing the listed npm dependencies below:
(you must install from your terminal command line)

* repositry:
    * git@github.com:NatalieColwell/Bamazon.git

* npm dependencies  
    * npm initi 
    (if you would like to set up your own JSON package)
    * npm inquirer
    * npm chalk 
    (if you want to add fancy colors to your borning plane command text)
    * npm console.table (display table data in command line)
    * npm cli-table (a fancier table display option..NOTE: only one npm table is necessary)

## How It Works...

### Customer View

* file bamazonCustomers.js displays the entire list of items for sale and prompts the customer to input the ITEM ID and quantity amount for the product they would like to purchase.

* If they input matches the SQL database, the customer is asked to review and submit purchase

* the database is then updated with the new sale, total sales for that item and the inventory is updated

### Manager View

* Displays an input menu with the following options
    * Products: 
    this is a full list of all items in the store and displays the item Id, Department, Products Name, Price, Stock Quantity, and Product sales per product

    * Inventory: 
    this displays only the items that have a stock quantity below 5

    * Update Inventory:
    prompts the user to input the item ID and new stock quantity for a product they would like to update the inventory level and updates the database

    * Add Products:
    prompts user to input new product into the database. They are asked to input an item ID, department, product name, price and quantity. The new product is saved and added to the list of sale items


    I hope you enjoy!