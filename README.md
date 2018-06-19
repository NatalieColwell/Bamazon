# Welcome to Bamazon


 __Bamazon__ is an  *Amazon-like* storefront that is a command-line inventory app in node.js and mySQL 


## How It Works...

### Customer View

* file bamazonCustomers.js displays the entire list of items for sale and prompts the customer to input the *Item ID* and *quantity* amount for the product they would like to purchase.

* If the input matches the SQL database, the customer is asked to review the order and submit purchase.

* the database is then updated with the new sale details that include total sales for that item and updates the product inventory.

### Manager View

* __Displays an input menu with the following options...__
    * __Products:__ 
    this is a full list of all items in the store and displays the item Id, Department, Products Name, Price, Stock Quantity, and Product sales per product

    * __Inventory:__ 
    this displays only the items that have a stock quantity below 5

    * __Update Inventory:__
    prompts the user to input the item ID and new stock quantity for a product they would like to update the inventory level and updates the database

    * __Add Products:__
    prompts user to input new product into the database. They are asked to input an item ID, department, product name, price and quantity. The new product is saved and added to the list of sale items


#### *you can also view a quick step-by-step video to get a better understanding of how the app works!*
## [View Video](https://youtu.be/xy4mban1mRM)


### To get started follow the steps below...

1. You will need to clone the repository in addition to installing the listed npm dependencies below:
(you must install from your terminal command line)

* #### repositry:
    * git@github.com:NatalieColwell/Bamazon.git

* #### npm dependencies  
    * __npm initi__ 
    (*if you would like to set up your own JSON package*)
    * __npm inquirer__
    * __npm mysql__
    * __npm chalk__ 
    (*if you want to add fancy colors to your borning plane command text*)
    * __npm console.table__ (*display table data in command line*)
    * __npm cli-table__ (*a fancier table display option..__NOTE: only one npm table is necessary__*)



 ### *I hope you enjoy!*


![ScreenShots](/images/0modules_createConnection.png)
![ScreenShots](/images/1customerView_commandTable.png)
![ScreenShots](/images/2customerView.productList.png)
![ScreenShots](/images/3managerView_commandTable_productDetails.png)
![ScreenShots](/images/4managerView_addNewProduct_commandLine.png)


   