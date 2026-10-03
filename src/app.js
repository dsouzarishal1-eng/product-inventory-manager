"use strict";
// Product Inventory Manager
// This project demonstrates:
// 1. Basic Types
// 2. Functions
// 3. Scope
// 4. Interfaces
// 5. TypeScript Compilation
Object.defineProperty(exports, "__esModule", { value: true });
// Array to store all products
let products = [];
// Get HTML elements
const productNameInput = document.getElementById("productName");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const addButton = document.getElementById("addButton");
const productTable = document.getElementById("productTable");
const totalProducts = document.getElementById("totalProducts");
const totalValue = document.getElementById("totalValue");
// Function to add a product
function addProduct() {
    // These variables have local scope inside this function
    const name = productNameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    // Check if the user entered valid information
    if (name === "" || price <= 0 || quantity <= 0) {
        alert("Please enter a valid product name, price and quantity.");
        return;
    }
    // Create a new Product object
    const product = {
        name: name,
        price: price,
        quantity: quantity
    };
    // Add product to the products array
    products.push(product);
    // Display updated products
    displayProducts();
    // Clear input fields
    productNameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}
// Function to display products
function displayProducts() {
    // Clear the existing table
    productTable.innerHTML = "";
    // Display every product
    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>₹${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="delete-button" onclick="deleteProduct(${index})">
                    Delete
                </button>
            </td>
        `;
        productTable.appendChild(row);
    });
    updateSummary();
}
// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}
// Function to calculate and display summary
function updateSummary() {
    // Calculate total inventory value
    let total = 0;
    products.forEach((product) => {
        total = total + (product.price * product.quantity);
    });
    totalProducts.textContent = products.length.toString();
    totalValue.textContent = total.toFixed(2);
}
// Connect the button to the addProduct function
addButton.addEventListener("click", addProduct);
// Make deleteProduct available to the HTML buttons
window.deleteProduct = deleteProduct;
//# sourceMappingURL=app.js.map