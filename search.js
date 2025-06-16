// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")

  if (query) {
    performSearch(query)
    setupSearchFilters()
  } else {
    showNoResults()
  }

  // Setup search input
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.value = query || ""
  }
})

// Perform search
function performSearch(query) {
  const searchQuery = document.getElementById("searchQuery")
  const resultsCount = document.getElementById("resultsCount")

  if (searchQuery) {
    searchQuery.textContent = `Szukasz: "${query}"`
  }

  // Search products
  const results = window.searchProducts(query)

  if (resultsCount) {
    resultsCount.textContent = `Znaleziono ${results.length} produktów`
  }

  displaySearchResults(results)
}

// Display search results
function displaySearchResults(products) {
  const container = document.getElementById("searchResults")
  const noResults = document.getElementById("noResults")

  if (!container) return

  if (products.length === 0) {
    container.style.display = "none"
    if (noResults) noResults.style.display = "block"
    return
  }

  container.style.display = "grid"
  if (noResults) noResults.style.display = "none"
  container.innerHTML = ""

  products.forEach((product) => {
    const productCard = createSearchResultCard(product)
    container.appendChild(productCard)
  })
}

// Create search result card
function createSearchResultCard(product) {
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

  const categoryBadge = getCategoryBadge(product.category)

  card.innerHTML = `
        <div class="product-image">
            <a href="product.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${product.name}">
            </a>
            ${discountBadge}
            ${categoryBadge}
            <button class="wishlist-button" onclick="toggleWishlist('${product.id}')">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
            <div class="product-rating">
                <div class="stars">
                    ${generateSearchStars(product.rating)}
                </div>
                <span class="review-count">(${product.reviews})</span>
            </div>
            <p class="product-description">${product.description}</p>
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

// Get category badge
function getCategoryBadge(category) {
  const categoryNames = {
    men: "Mężczyźni",
    women: "Kobiety",
    children: "Dzieci",
  }

  return `<div class="category-badge">${categoryNames[category] || category}</div>`
}

// Setup search filters
function setupSearchFilters() {
  const sortBy = document.getElementById("sortBy")
  const categoryFilter = document.getElementById("categoryFilter")
  const priceRange = document.getElementById("priceRange")

  if (sortBy) {
    sortBy.addEventListener("change", applySearchFilters)
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applySearchFilters)
  }

  if (priceRange) {
    priceRange.addEventListener("change", applySearchFilters)
  }
}

// Apply search filters
function applySearchFilters() {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")

  if (!query) return

  let results = window.searchProducts(query)

  // Apply category filter
  const categoryFilter = document.getElementById("categoryFilter")?.value
  if (categoryFilter && categoryFilter !== "all") {
    results = results.filter((product) => product.category === categoryFilter)
  }

  // Apply price filter
  const priceRange = document.getElementById("priceRange")?.value
  if (priceRange && priceRange !== "all") {
    results = filterSearchByPrice(results, priceRange)
  }

  // Apply sorting
  const sortBy = document.getElementById("sortBy")?.value
  if (sortBy) {
    results = sortSearchResults(results, sortBy, query)
  }

  // Update results count
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    resultsCount.textContent = `Znaleziono ${results.length} produktów`
  }

  displaySearchResults(results)
}

// Filter search results by price
function filterSearchByPrice(products, range) {
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

// Sort search results
function sortSearchResults(products, sortBy, query) {
  switch (sortBy) {
    case "relevance":
      return sortByRelevance(products, query)
    case "name":
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case "price-low":
      return products.sort((a, b) => a.price - b.price)
    case "price-high":
      return products.sort((a, b) => b.price - a.price)
    case "rating":
      return products.sort((a, b) => b.rating - a.rating)
    default:
      return products
  }
}

// Sort by relevance
function sortByRelevance(products, query) {
  const queryLower = query.toLowerCase()

  return products.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(queryLower)
    const bNameMatch = b.name.toLowerCase().includes(queryLower)
    const aDescMatch = a.description.toLowerCase().includes(queryLower)
    const bDescMatch = b.description.toLowerCase().includes(queryLower)

    // Prioritize name matches over description matches
    if (aNameMatch && !bNameMatch) return -1
    if (!aNameMatch && bNameMatch) return 1
    if (aDescMatch && !bDescMatch) return -1
    if (!aDescMatch && bDescMatch) return 1

    // If both have same type of match, sort by rating
    return b.rating - a.rating
  })
}

// Show no results
function showNoResults() {
  const container = document.getElementById("searchResults")
  const noResults = document.getElementById("noResults")
  const searchQuery = document.getElementById("searchQuery")
  const resultsCount = document.getElementById("resultsCount")

  if (container) container.style.display = "none"
  if (noResults) noResults.style.display = "block"
  if (searchQuery) searchQuery.textContent = 'Szukasz: ""'
  if (resultsCount) resultsCount.textContent = "Znaleziono 0 produktów"
}

// Generate stars for search results
function generateSearchStars(rating) {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "star filled" : "star"
    starsHTML += `<span class="${starClass}"><i class="fas fa-star"></i></span>`
  }
  return starsHTML
}
