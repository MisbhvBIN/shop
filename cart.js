// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []

// Add item to cart
function addToCart(item) {
  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color,
  )

  if (existingItem) {
    existingItem.quantity += item.quantity || 1
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
    })
  }

  localStorage.setItem("styleHavenCart", JSON.stringify(cart))
  updateCartCount()
  updateCartDisplay()
}

// Remove item from cart
function removeFromCart(itemId, size, color) {
  cart = cart.filter((item) => !(item.id === itemId && item.size === size && item.color === color))
  localStorage.setItem("styleHavenCart", JSON.stringify(cart))
  updateCartCount()
  updateCartDisplay()
}

// Update item quantity
function updateQuantity(itemId, size, color, newQuantity) {
  const item = cart.find((cartItem) => cartItem.id === itemId && cartItem.size === size && cartItem.color === color)

  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size, color)
    } else {
      item.quantity = newQuantity
      localStorage.setItem("styleHavenCart", JSON.stringify(cart))
      updateCartCount()
      updateCartDisplay()
    }
  }
}

// Get cart total
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems

    // Show/hide cart count badge
    if (totalItems > 0) {
      cartCount.style.display = "flex"
    } else {
      cartCount.style.display = "none"
    }
  }
}

// Update cart display on cart page
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItems")
  const cartSubtotal = document.getElementById("cartSubtotal")
  const cartTotal = document.getElementById("cartTotal")
  const emptyCartMessage = document.getElementById("emptyCartMessage")
  const cartSummary = document.querySelector(".cart-summary")

  if (!cartItemsContainer) return

  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = "block"
    if (cartSummary) cartSummary.style.display = "none"
    cartItemsContainer.innerHTML = ""
    return
  }

  if (emptyCartMessage) emptyCartMessage.style.display = "none"
  if (cartSummary) cartSummary.style.display = "block"

  cartItemsContainer.innerHTML = ""
  let subtotal = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image || "/placeholder.svg?height=100&width=100"}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-options">
                    <span>Rozmiar: ${item.size}</span>
                    <span>Kolor: ${item.color}</span>
                </div>
                <div class="item-price">${item.price.toFixed(2)} zł</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity + 1})">+</button>
            </div>
            <div class="item-total">${itemTotal.toFixed(2)} zł</div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.size}', '${item.color}')">
                <i class="fas fa-trash"></i>
            </button>
        `

    cartItemsContainer.appendChild(cartItem)
  })

  if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2) + " zł"
  if (cartTotal) cartTotal.textContent = subtotal.toFixed(2) + " zł"
}

// Clear cart
function clearCart() {
  cart = []
  localStorage.setItem("styleHavenCart", JSON.stringify(cart))
  updateCartCount()
  updateCartDisplay()
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  updateCartDisplay()

  // Checkout button
  const checkoutButton = document.getElementById("checkoutButton")
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      // Check if user is logged in
      if (!window.isLoggedIn()) {
        window.showToast("Wymagane logowanie", "Musisz się zalogować, aby przejść do kasy.")
        setTimeout(() => {
          window.location.href = "login.html"
        }, 2000)
        return
      }

      if (cart.length === 0) {
        window.showToast("Pusty koszyk", "Dodaj produkty do koszyka przed przejściem do kasy.")
        return
      }

      // Redirect to checkout page
      window.location.href = "checkout.html"
    })
  }
})

// Export functions for global use
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateQuantity = updateQuantity
window.getCartTotal = getCartTotal
window.clearCart = clearCart
window.cart = cart
