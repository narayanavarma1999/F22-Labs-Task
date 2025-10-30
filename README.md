# F22-Labs-Task

Task 3: Product Inventory Manager 
Goal 
Expose basic product and category management with validation and relational lookup. Context 
You are building an internal inventory service for a small shop. No auth needed. Database Schema 
Minimum required tables: 
categories 
● id (auto) 
● name (string, required, unique-ish is nice to have) 
products 
● id (auto) 
● name (string, required) 
● price (number > 0) 
● category_id (foreign key to categories.id) 
● created_at (timestamp) 
Requirements 
Endpoints 
POST /categories 
Request: 
{ "name": "Electronics" }
1. 
○ name required, ≥ 3 chars. 
Response: 
○ 201 Created with new category. 
POST /products 
Request: 
{ 
 "name": "iPhone 16", 
 "price": 1299, 
 "categoryId": 1 
} 
2. Rules: 
○ name required, ≥ 3 chars. 
○ price required, must be > 0. 
○ categoryId must exist in categories. 
3. Response: 
○ 201 Created with the saved product. 
4. GET /products 
Return a list of products with their category name, e.g.: 
[ 
 { 
 "id": 5, 
 "name": "iPhone 16", 
 "price": 1299, 
 "category": "Electronics", 
 "createdAt": "2025-10-24T10:00:00Z" 
 }
] 
5. PUT /products/:id 
○ Allow updating name and/or price. 
○ Must still validate (e.g. price > 0). 
○ Return 404 if product not found. 
Bonus (optional) 
5. GET /categories/:


I have opted for the above task 


and i have created two schemas namely 

Product

Category

and created end points for creating category and products as below are the attached curl endpoints with data



// for creating a new category

curl --location 'localhost:8000/categories' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Electronics"
}'


// for creating a new product

curl --location 'http://localhost:8000/products' \
--header 'Content-Type: application/json' \
--data '{ 
 "name": "iPhone 16", 
 "price": 1299, 
 "categoryId": 1 
} 
'

// for fetching all products

curl --location --request GET 'localhost:8000/products' \
--header 'Content-Type: application/json' \
--data '{ 
 "name": "iPhone 16", 
 "price": 1299, 
 "categoryId": 1 
} 
'

// for updating a product based on productId

curl --location --request PUT 'localhost:8000/products/1 ' \
--header 'Content-Type: application/json' \
--data '{
    "name":"Samsung",
    "price":20
}'


