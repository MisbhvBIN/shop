// Category page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get current category from URL
  const currentCategory = getCurrentCategory()

  if (currentCategory) {
    loadCategoryProducts(currentCategory)
    setupCategoryFilters(currentCategory)
    setupViewToggle()
    setupCategorySearch(currentCategory)
  }
})

// Get current category from URL
function getCurrentCategory() {
  const path = window.location.pathname
  if (path.includes("men.html")) return "men"
  if (path.includes("women.html")) return "women"
  if (path.includes("children.html")) return "children"
  return null
}

// Load products for category
function loadCategoryProducts(category) {
  const container = document.getElementById(`${category}Products`)
  if (!container || !window.categoryProducts) return

  const products = window.categoryProducts[category] || []
  displayCategoryProducts(products, container)
}

// Display category products
function displayCategoryProducts(products, container) {
  const noResults = document.getElementById("noResults")

  if (products.length === 0) {
    container.style.display = "none"
    if (noResults) noResults.style.display = "block"
    return
  }

  container.style.display = "grid"
  if (noResults) noResults.style.display = "none"
  container.innerHTML = ""

  products.forEach((product) => {
    const productCard = createCategoryProductCard(product)
    container.appendChild(productCard)
  })
}

// Create category product card
function createCategoryProductCard(product) {
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
                    ${generateCategoryStars(product.rating)}
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

// Generate stars for category products
function generateCategoryStars(rating) {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "star filled" : "star"
    starsHTML += `<span class="${starClass}"><i class="fas fa-star"></i></span>`
  }
  return starsHTML
}

// Setup category filters
function setupCategoryFilters(category) {
  const sortBy = document.getElementById("sortBy")
  const priceRange = document.getElementById("priceRange")
  const colorFilter = document.getElementById("colorFilter")

  if (sortBy) {
    sortBy.addEventListener("change", () => applyCategoryFilters(category))
  }

  if (priceRange) {
    priceRange.addEventListener("change", () => applyCategoryFilters(category))
  }

  if (colorFilter) {
    colorFilter.addEventListener("change", () => applyCategoryFilters(category))
  }
}

// Apply category filters
function applyCategoryFilters(category) {
  let products = [...(window.categoryProducts[category] || [])]

  // Apply search filter if exists
  const searchInput = document.getElementById("searchInput")
  if (searchInput && searchInput.value.trim()) {
    const query = searchInput.value.trim().toLowerCase()
    products = products.filter(
      (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
    )
  }

  // Apply price filter
  const priceRange = document.getElementById("priceRange")?.value
  if (priceRange && priceRange !== "all") {
    products = filterCategoryByPrice(products, priceRange)
  }

  // Apply color filter
  const colorFilter = document.getElementById("colorFilter")?.value
  if (colorFilter && colorFilter !== "all") {
    products = products.filter((product) => product.colors.includes(colorFilter))
  }

  // Apply sorting
  const sortBy = document.getElementById("sortBy")?.value
  if (sortBy) {
    products = sortCategoryProducts(products, sortBy)
  }

  const container = document.getElementById(`${category}Products`)
  displayCategoryProducts(products, container)
}

// Filter category products by price
function filterCategoryByPrice(products, range) {
  switch (range) {
    case "0-100":
      return products.filter((p) => p.price <= 100)
    case "100-200":
      return products.filter((p) => p.price > 100 && p.price <= 200)
    case "200-300":
      return products.filter((p) => p.price > 200 && p.price <= 300)
    case "300+":
      return products.filter((p) => p.price > 300)
    default:
      return products
  }
}

// Sort category products
function sortCategoryProducts(products, sortBy) {
  switch (sortBy) {
    case "name":
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case "price-low":
      return products.sort((a, b) => a.price - b.price)
    case "price-high":
      return products.sort((a, b) => b.price - a.price)
    case "rating":
      return products.sort((a, b) => b.rating - a.rating)
    case "newest":
      return products.sort((a, b) => b.id.localeCompare(a.id))
    default:
      return products
  }
}

// Setup view toggle
function setupViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn")
  const productsGrid = document.querySelector(".products-grid")

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.getAttribute("data-view")

      // Update active button
      viewButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Update grid view
      if (productsGrid) {
        if (view === "list") {
          productsGrid.classList.add("list-view")
        } else {
          productsGrid.classList.remove("list-view")
        }
      }
    })
  })
}

// Setup category search
function setupCategorySearch(category) {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  searchInput.addEventListener("input", () => {
    applyCategoryFilters(category)
  })
}

// Add to cart from card
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
  window.showToast("Dodano do koszyka", `${product.name} został dodany do koszyka.`)
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault()
  const searchInput = document.getElementById("searchInput")
  if (searchInput && searchInput.value.trim()) {
    window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`
  }
}

// Export functions
window.addToCartFromCard = addToCartFromCard
window.handleSearch = handleSearch
