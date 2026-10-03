// Product Inventory Manager
// Features:
// 1. Add Product
// 2. Edit Product
// 3. Delete Product
// 4. Search Product
// 5. Low Stock Warning
// 6. Total Products
// 7. Total Inventory Value

interface Product {
    name: string;
    price: number;
    quantity: number;
}

// Store products
let products: Product[] = [];

// Track which product is being edited
let editingIndex: number = -1;

// Get HTML elements
const productNameInput =
    document.getElementById("productName") as HTMLInputElement;

const priceInput =
    document.getElementById("price") as HTMLInputElement;

const quantityInput =
    document.getElementById("quantity") as HTMLInputElement;

const addButton =
    document.getElementById("addButton") as HTMLButtonElement;

const productTable =
    document.getElementById("productTable") as HTMLTableSectionElement;

const totalProducts =
    document.getElementById("totalProducts") as HTMLSpanElement;

const totalValue =
    document.getElementById("totalValue") as HTMLSpanElement;

// Search box
const searchInput =
    document.getElementById("searchInput") as HTMLInputElement;


// ==========================================
// ADD / UPDATE PRODUCT
// ==========================================

function addProduct(): void {

    const name: string = productNameInput.value.trim();
    const price: number = Number(priceInput.value);
    const quantity: number = Number(quantityInput.value);

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

        const product: Product = {
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

function clearInputs(): void {

    productNameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(): void {

    productTable.innerHTML = "";

    // Get search text
    const searchText: string =
        searchInput ? searchInput.value.trim().toLowerCase() : "";

    products.forEach(
        (product: Product, index: number) => {

            // Search filter
            if (
                searchText !== "" &&
                !product.name.toLowerCase().includes(searchText)
            ) {
                return;
            }

            const row = document.createElement("tr");

            // Low stock
            const lowStock: boolean =
                product.quantity <= 5;

            row.innerHTML = `
                <td>${product.name}</td>

                <td>₹${product.price.toFixed(2)}</td>

                <td>
                    ${product.quantity}

                    ${
                        lowStock
                            ? '<span style="color:red; font-weight:bold;"> Low Stock</span>'
                            : ""
                    }
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
        }
    );

    updateSummary();
}


// ==========================================
// EDIT PRODUCT
// ==========================================

function editProduct(index: number): void {

    const product: Product = products[index];

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

function deleteProduct(index: number): void {

    const confirmDelete: boolean =
        confirm("Are you sure you want to delete this product?");

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

function updateSummary(): void {

    let total: number = 0;

    products.forEach(
        (product: Product) => {

            total =
                total +
                (product.price * product.quantity);
        }
    );

    totalProducts.textContent =
        products.length.toString();

    totalValue.textContent =
        total.toFixed(2);
}


// ==========================================
// BUTTON EVENTS
// ==========================================

addButton.addEventListener(
    "click",
    addProduct
);


// ==========================================
// SEARCH EVENT
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayProducts
    );
}


// ==========================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ==========================================

(window as any).deleteProduct =
    deleteProduct;

(window as any).editProduct =
    editProduct;


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts();