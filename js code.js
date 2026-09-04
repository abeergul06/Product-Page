// PRODUCT DATA 

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 45,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 85,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "fashion",
        price: 75,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 4,
        name: "Denim Jacket",
        category: "fashion",
        price: 65,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    },

    {
        id: 5,
        name: "Leather Backpack",
        category: "accessories",
        price: 120,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },

    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 35,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    }
];


// CART STATE

let cart = [];


const productsContainer =
    document.getElementById("products-container");

const categoryFilter =
    document.getElementById("category-filter");

const priceFilter =
    document.getElementById("price-filter");

const cartCount =
    document.getElementById("cart-count");

const summaryQuantity =
    document.getElementById("summary-quantity");

const summaryTotal =
    document.getElementById("summary-total");

const checkoutBtn =
    document.getElementById("checkout-btn");


// DISPLAY PRODUCTS

function displayProducts(productList) {

    productsContainer.innerHTML = "";

    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;
    }

    productList.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <button
                    class="add-cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}


//  ADD TO CART 

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

}


// UPDATE CART

function updateCart() {

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    // Update header cart count
    cartCount.textContent = totalQuantity;


    // Update cart summary
    summaryQuantity.textContent = totalQuantity;

    summaryTotal.textContent =
        totalPrice.toFixed(2);
}


//  FILTER PRODUCTS 

function filterProducts() {

    const selectedCategory =
        categoryFilter.value;

    const selectedPrice =
        priceFilter.value;


    const filteredProducts = products.filter(product => {

        // Category filter
        const categoryMatch =
            selectedCategory === "all" ||
            product.category === selectedCategory;


        // Price filter
        let priceMatch = true;

        if (selectedPrice === "low") {

            priceMatch = product.price < 50;

        } else if (selectedPrice === "medium") {

            priceMatch =
                product.price >= 50 &&
                product.price <= 100;

        } else if (selectedPrice === "high") {

            priceMatch = product.price > 100;
        }


        return categoryMatch && priceMatch;
    });


    displayProducts(filteredProducts);
}


//  FILTER EVENTS

categoryFilter.addEventListener(
    "change",
    filterProducts
);

priceFilter.addEventListener(
    "change",
    filterProducts
);


// CHECKOUT 

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Thank you for shopping with ShopEase!"
    );

});


// INITIAL LOAD

displayProducts(products);

updateCart();