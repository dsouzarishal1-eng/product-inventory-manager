"use strict";
// Product Inventory Manager
// Features:
// 1. Add Product
// 2. Edit Product
// 3. Delete Product
// 4. Search Product
// 5. Low Stock Warning
// 6. Total Products
// 7. Total Inventory Value
// Store products
let products = [];
// Track which product is being edited
let editingIndex = -1;
// Get HTML elements
const productNameInput = document.getElementById("productName");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const addButton = document.getElementById("addButton");
const productTable = document.getElementById("productTable");
const totalProducts = document.getElementById("totalProducts");
const totalValue = document.getElementById("totalValue");
// Search box
const searchInput = document.getElementById("searchInput");
// ==========================================
// ADD / UPDATE PRODUCT
// ==========================================
function addProduct() {
    const name = productNameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    // Validate input
    if (name === "" || price <= 0 || quantity <= 0) {
        alert("Please enter a valid product name, price and quantity.");
        return;
    }
    // If editing an existing product
    if (editingIndex !== -1) {
        products[editingIndex] = {
            name: name,
            price: price,
            quantity: quantity
        };
        editingIndex = -1;
        addButton.textContent = "Add Product";
    }
    // Otherwise add a new product
    else {
        const product = {
            name: name,
            price: price,
            quantity: quantity
        };
        products.push(product);
    }
    displayProducts();
    clearInputs();
}
// ==========================================
// CLEAR INPUTS
// ==========================================
function clearInputs() {
    productNameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}
// ==========================================
// DISPLAY PRODUCTS
// ==========================================
function displayProducts() {
    productTable.innerHTML = "";
    // Get search text
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    products.forEach((product, index) => {
        // Search filter
        if (searchText !== "" &&
            !product.name.toLowerCase().includes(searchText)) {
            return;
        }
        const row = document.createElement("tr");
        // Low stock
        const lowStock = product.quantity <= 5;
        row.innerHTML = `
                <td>${product.name}</td>

                <td>₹${product.price.toFixed(2)}</td>

                <td>
                    ${product.quantity}

                    ${lowStock
            ? '<span style="color:red; font-weight:bold;"> Low Stock</span>'
            : ""}
                </td>

                <td>

                    <button
                        class="edit-button"
                        onclick="editProduct(${index})">
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteProduct(${index})">
                        Delete
                    </button>

                </td>
            `;
        productTable.appendChild(row);
    });
    updateSummary();
}
// ==========================================
// EDIT PRODUCT
// ==========================================
function editProduct(index) {
    const product = products[index];
    // Put product data into input fields
    productNameInput.value = product.name;
    priceInput.value =
        product.price.toString();
    quantityInput.value =
        product.quantity.toString();
    // Remember which product is being edited
    editingIndex = index;
    // Change button text
    addButton.textContent = "Update Product";
    // Move cursor to product name
    productNameInput.focus();
}
// ==========================================
// DELETE PRODUCT
// ==========================================
function deleteProduct(index) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) {
        return;
    }
    products.splice(index, 1);
    editingIndex = -1;
    addButton.textContent = "Add Product";
    displayProducts();
}
// ==========================================
// UPDATE SUMMARY
// ==========================================
function updateSummary() {
    let total = 0;
    products.forEach((product) => {
        total =
            total +
                (product.price * product.quantity);
    });
    totalProducts.textContent =
        products.length.toString();
    totalValue.textContent =
        total.toFixed(2);
}
// ==========================================
// BUTTON EVENTS
// ==========================================
addButton.addEventListener("click", addProduct);
// ==========================================
// SEARCH EVENT
// ==========================================
if (searchInput) {
    searchInput.addEventListener("input", displayProducts);
}
// ==========================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ==========================================
window.deleteProduct =
    deleteProduct;
window.editProduct =
    editProduct;
// ==========================================
// INITIAL DISPLAY
// ==========================================
displayProducts();
