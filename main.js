// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  initializeApp()
})

function initializeApp() {
  // Set current year in footer
  setCurrentYear()

  // Initialize countdown timer
  initializeCountdown()

  // Load featured products on homepage
  if (document.getElementById("featuredProducts")) {
    loadFeaturedProducts()
  }

  // Initialize search functionality
  initializeSearch()

  // Initialize newsletter form
  initializeNewsletter()

  // Initialize mobile menu if exists
  initializeMobileMenu()
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// Initialize countdown timer
function initializeCountdown() {
  const countdownElement = document.getElementById("countdown")
  if (!countdownElement) return

  // Set end time (24 hours from now)
  const endTime = new Date().getTime() + 24 * 60 * 60 * 1000

  function updateCountdown() {
    const now = new Date().getTime()
    const timeLeft = endTime - now

    if (timeLeft > 0) {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

      countdownElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    } else {
      countdownElement.textContent = "00:00:00"
    }
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// Load featured products
function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts")
  if (!container || !window.featuredProducts) return

  container.innerHTML = ""

  window.featuredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  const discountBadge = product.onSale
    ? `<div class="sale-badge">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>`
    : ""

  const priceHTML = product.originalPrice
    ? `<div class="product-prices">
            <span class="sale-price">${product.price.toFixed(2)} zł</span>
            <span class="original-price">${product.originalPrice.toFixed(2)} zł</span>
        </div>`
    : `<div class="product-price">${product.price.toFixed(2)} zł</div>`

  card.innerHTML = `
        <div class="product-image">
            <a href="product.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${product.name}">
            </a>
            ${discountBadge}
            <button class="wishlist-button" onclick="toggleWishlist('${product.id}')">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="review-count">(${product.reviews})</span>
            </div>
            ${priceHTML}
            <div class="product-actions">
                <button class="btn btn-primary btn-block" onclick="addToCartFromCard('${product.id}')">
                    Dodaj do koszyka
                </button>
            </div>
        </div>
    `

  return card
}

// Generate star rating HTML
function generateStars(rating) {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "star filled" : "star"
    starsHTML += `<span class="${starClass}"><i class="fas fa-star"></i></span>`
  }
  return starsHTML
}

// Add product to cart from product card
function addToCartFromCard(productId) {
  const product = window.getProductById(productId)
  if (!product) return

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    quantity: 1,
    size: product.sizes[0],
    color: product.colors[0],
  }

  window.addToCart(cartItem)
  showToast("Dodano do koszyka", `${product.name} został dodany do koszyka.`)
}

// Toggle wishlist
function toggleWishlist(productId) {
  // Get current wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

  const index = wishlist.indexOf(productId)
  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1)
    showToast("Usunięto z listy życzeń", "Produkt został usunięty z listy życzeń.")
  } else {
    // Add to wishlist
    wishlist.push(productId)
    showToast("Dodano do listy życzeń", "Produkt został dodany do listy życzeń.")
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistUI()
}

// Update wishlist UI
function updateWishlistUI() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  const wishlistButtons = document.querySelectorAll(".wishlist-button")

  wishlistButtons.forEach((button) => {
    const productId = button.getAttribute("onclick").match(/'([^']+)'/)[1]
    const icon = button.querySelector("i")

    if (wishlist.includes(productId)) {
      icon.className = "fas fa-heart"
      button.style.color = "#ef4444"
    } else {
      icon.className = "far fa-heart"
      button.style.color = ""
    }
  })
}

// Initialize search functionality
function initializeSearch() {
  const searchForms = document.querySelectorAll(".search-form")

  searchForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const query = this.querySelector("input").value.trim()
      if (query) {
        // Redirect to search results page
        window.location.href = `search.html?q=${encodeURIComponent(query)}`
      }
    })

    // Also handle real-time search on category pages
    const searchInput = this.querySelector("input")
    if (
      searchInput &&
      (window.location.pathname.includes("men.html") ||
        window.location.pathname.includes("women.html") ||
        window.location.pathname.includes("children.html"))
    ) {
      searchInput.addEventListener("input", () => {
        // This will be handled by category.js
      })
    }
  })
}

// Initialize newsletter form
function initializeNewsletter() {
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      if (email) {
        // Simulate newsletter subscription
        showToast("Zapisano do newslettera", "Dziękujemy za zapisanie się do naszego newslettera!")
        this.querySelector('input[type="email"]').value = ""
      }
    })
  })
}

// Initialize mobile menu
function initializeMobileMenu() {
  // Add mobile menu toggle if needed
  const header = document.querySelector(".header")
  if (window.innerWidth <= 768) {
    // Mobile-specific functionality can be added here
  }
}

// Show toast notification
function showToast(title, message, type = "info") {
  const toast = document.getElementById("toast")
  if (!toast) return

  const titleElement = toast.querySelector(".toast-title")
  const messageElement = toast.querySelector(".toast-message")

  titleElement.textContent = title
  messageElement.textContent = message

  // Add type-specific styling
  toast.className = `toast ${type}`
  toast.classList.add("show")

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Utility function to get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

// Utility function to format price
function formatPrice(price) {
  return price.toFixed(2) + " zł"
}

// Utility function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString("pl-PL")
}

// Export functions for global use
window.showToast = showToast
window.getUrlParameter = getUrlParameter
window.formatPrice = formatPrice
window.formatDate = formatDate
window.addToCartFromCard = addToCartFromCard
window.toggleWishlist = toggleWishlist
