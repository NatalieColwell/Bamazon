CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	item_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2),
    stock_qty INT 
);

DESCRIBE products;

SELECT * FROM products;

INSERT INTO products (item_id, department_name, product_name, price, stock_qty)
VALUES (001, "Clothing, Shoes & Jewelry", "Versace Black Leather High-heel", 450.00, 3), (004, "Clothing, Shoes & Jewelry", "Lulu Lemon Yoga Pant", 45.00, 5),
(002, "Clothing, Shoes & Jewelry", "Raybans Classic Frame Sunglasses", 175.00, 3), (003, "Beauty & Health", "Neutrogrna Facial Cleanser", 12.50, 10);

INSERT INTO products (item_id, department_name, product_name, price, stock_qty)
VALUES (005, "Electronics", "Sonos Wireless Speaker Set", 298.00, 3), (006, "Sports & Outdoor", "Manduka Pro Yoga & Pilates Mat", 82.50, 5),
(007, "Electronics", "Wireless Earbuds", 49.99, 12), (008, "Beauty & Health", "TruSkin Natural Vitamin C Oil", 19.99, 100), 
(009, "Home Decor & Garden", "Vintage Moroccan Trellis Rug", 96.99, 6), (10, "Home Decor & Garden", "Cashmere Throw Blanket", 199.00, 4);


