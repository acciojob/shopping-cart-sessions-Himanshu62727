// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = []; // [{ id, name, price, qty }]

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <input id="item-qty-input-${item.id}" type="number" value="${item.qty}" min="1" />
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);

    // Quantity update
    document
      .getElementById(`item-qty-input-${item.id}`)
      .addEventListener("change", (e) => {
        const newQty = Number(e.target.value);
        item.qty = newQty <= 0 ? 1 : newQty;
        renderCart();
      });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  const exists = cart.find((item) => item.id == productId);

  if (exists) {
    exists.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

// Event Listeners
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addToCart(Number(e.target.dataset.id));
  }

  if (e.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(Number(e.target.dataset.id));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();