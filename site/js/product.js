// Product page functionality
document.addEventListener("DOMContentLoaded", () => {
  loadProductPage()
})

// Load product page
function loadProductPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (!productId) {
    showProductNotFound()
    return
  }

  const product = window.getProductById(productId)
  if (!product) {
    showProductNotFound()
    return
  }

  displayProduct(product)
  updateBreadcrumb(product)
}

// Update breadcrumb navigation
function updateBreadcrumb(product) {
  const categoryBreadcrumb = document.getElementById("categoryBreadcrumb")
  const productBreadcrumb = document.getElementById("productBreadcrumb")

  if (categoryBreadcrumb) {
    const categoryNames = {
      men: "Mężczyźni",
      women: "Kobiety",
      children: "Dzieci",
    }
    categoryBreadcrumb.textContent = categoryNames[product.category] || "Kategoria"
  }

  if (productBreadcrumb) {
    productBreadcrumb.textContent = product.name
  }
}

// Display product
function displayProduct(product) {
  const container = document.getElementById("productContent")
  if (!container) return

  container.innerHTML = `
        <div class="product-details">
            <div class="product-image-section">
                <div class="main-product-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage">
                    ${product.onSale ? `<div class="sale-badge">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>` : ""}
                </div>
            </div>
            
            <div class="product-info-section">
                <div class="product-header">
                    <h1>${product.name}</h1>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateProductStars(product.rating)}
                        </div>
                        <span class="review-count">(${product.reviews} opinii)</span>
                    </div>
                </div>
                
                <div class="product-price-section">
                    ${
                      product.originalPrice
                        ? `<div class="product-prices">
                                <span class="sale-price">${product.price.toFixed(2)} zł</span>
                                <span class="original-price">${product.originalPrice.toFixed(2)} zł</span>
                                <span class="savings">Oszczędzasz ${(product.originalPrice - product.price).toFixed(2)} zł</span>
                            </div>`
                        : `<div class="product-price">${product.price.toFixed(2)} zł</div>`
                    }
                </div>
                
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                
                <div class="product-options">
                    <div class="option-group">
                        <label>Kolor:</label>
                        <div class="color-options" id="colorOptions">
                            ${product.colors
                              .map(
                                (color, index) => `
                                <label class="color-option ${index === 0 ? "selected" : ""}">
                                    <input type="radio" name="color" value="${color}" ${index === 0 ? "checked" : ""}>
                                    <span class="color-swatch color-${color}"></span>
                                    <span class="color-label">${getColorName(color)}</span>
                                </label>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <label>Rozmiar:</label>
                        <div class="size-options" id="sizeOptions">
                            ${product.sizes
                              .map(
                                (size, index) => `
                                <label class="size-option ${index === 0 ? "selected" : ""}">
                                    <input type="radio" name="size" value="${size}" ${index === 0 ? "checked" : ""}>
                                    <span class="size-label">${size}</span>
                                </label>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="option-group">
                        <label>Ilość:</label>
                        <div class="quantity-selector">
                            <button type="button" class="quantity-btn" onclick="changeQuantity(-1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display" id="quantityDisplay">1</span>
                            <button type="button" class="quantity-btn" onclick="changeQuantity(1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary btn-lg" onclick="addProductToCart('${product.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Dodaj do koszyka
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="toggleWishlist('${product.id}')">
                        <i class="far fa-heart"></i>
                        Dodaj do ulubionych
                    </button>
                </div>
                
                <div class="product-features">
                    <div class="feature">
                        <i class="fas fa-truck"></i>
                        <div class="feature-text">
                            <strong>Darmowa dostawa</strong>
                            <span>Od 150 zł</span>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-undo"></i>
                        <div class="feature-text">
                            <strong>30 dni na zwrot</strong>
                            <span>Bez pytań</span>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <div class="feature-text">
                            <strong>Gwarancja jakości</strong>
                            <span>2 lata</span>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-headset"></i>
                        <div class="feature-text">
                            <strong>Wsparcie 24/7</strong>
                            <span>Pomoc online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" onclick="showTab('description')">Opis produktu</button>
                <button class="tab-btn" onclick="showTab('details')">Szczegóły</button>
                <button class="tab-btn" onclick="showTab('reviews')">Opinie (${product.reviews})</button>
                <button class="tab-btn" onclick="showTab('shipping')">Dostawa i zwroty</button>
            </div>
            
            <div class="tab-content">
                <div class="tab-panel active" id="description">
                    <div class="description-content">
                        <h3>O produkcie</h3>
                        <p>${product.longDescription || product.description}</p>
                        
                        <h4>Dlaczego warto wybrać ten produkt?</h4>
                        <ul>
                            <li>Wysokiej jakości materiały</li>
                            <li>Nowoczesny design</li>
                            <li>Komfort noszenia</li>
                            <li>Trwałość i wytrzymałość</li>
                        </ul>
                    </div>
                </div>
                
                <div class="tab-panel" id="details">
                    <div class="details-grid">
                        <div class="details-column">
                            <h3>Specyfikacja</h3>
                            <div class="spec-list">
                                <div class="spec-item">
                                    <span class="spec-label">Materiał:</span>
                                    <span class="spec-value">Wysokiej jakości tkanina</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Kraj pochodzenia:</span>
                                    <span class="spec-value">Polska</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Sezon:</span>
                                    <span class="spec-value">Cały rok</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Styl:</span>
                                    <span class="spec-value">Casual</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Dostępne kolory:</span>
                                    <span class="spec-value">${product.colors.map((color) => getColorName(color)).join(", ")}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Dostępne rozmiary:</span>
                                    <span class="spec-value">${product.sizes.join(", ")}</span>
                                </div>
                            </div>
                        </div>
                        <div class="details-column">
                            <h3>Pielęgnacja</h3>
                            <div class="care-instructions">
                                <div class="care-item">
                                    <i class="fas fa-tint"></i>
                                    <span>Prać w temperaturze 30°C</span>
                                </div>
                                <div class="care-item">
                                    <i class="fas fa-ban"></i>
                                    <span>Nie wybielać</span>
                                </div>
                                <div class="care-item">
                                    <i class="fas fa-fire"></i>
                                    <span>Prasować w niskiej temperaturze</span>
                                </div>
                                <div class="care-item">
                                    <i class="fas fa-times-circle"></i>
                                    <span>Nie czyścić chemicznie</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-panel" id="reviews">
                    <div class="reviews-summary">
                        <div class="rating-overview">
                            <div class="rating-score">${product.rating}</div>
                            <div class="rating-details">
                                <div class="stars large">
                                    ${generateProductStars(product.rating)}
                                </div>
                                <p>Na podstawie ${product.reviews} opinii</p>
                            </div>
                        </div>
                        
                        <div class="rating-breakdown">
                            <div class="rating-bar">
                                <span>5 gwiazdek</span>
                                <div class="bar"><div class="fill" style="width: 70%"></div></div>
                                <span>70%</span>
                            </div>
                            <div class="rating-bar">
                                <span>4 gwiazdki</span>
                                <div class="bar"><div class="fill" style="width: 20%"></div></div>
                                <span>20%</span>
                            </div>
                            <div class="rating-bar">
                                <span>3 gwiazdki</span>
                                <div class="bar"><div class="fill" style="width: 7%"></div></div>
                                <span>7%</span>
                            </div>
                            <div class="rating-bar">
                                <span>2 gwiazdki</span>
                                <div class="bar"><div class="fill" style="width: 2%"></div></div>
                                <span>2%</span>
                            </div>
                            <div class="rating-bar">
                                <span>1 gwiazdka</span>
                                <div class="bar"><div class="fill" style="width: 1%"></div></div>
                                <span>1%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="reviews-list">
                        <div class="review-item">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <span class="reviewer-name">Anna K.</span>
                                    <span class="review-date">12.04.2023</span>
                                </div>
                                <div class="review-rating">
                                    ${generateProductStars(5)}
                                </div>
                            </div>
                            <p class="review-text">Świetny produkt! Bardzo dobra jakość i szybka dostawa. Materiał jest miękki i wygodny. Polecam wszystkim!</p>
                            <div class="review-helpful">
                                <span>Czy ta opinia była pomocna?</span>
                                <button class="helpful-btn">👍 Tak (12)</button>
                                <button class="helpful-btn">👎 Nie (1)</button>
                            </div>
                        </div>
                        
                        <div class="review-item">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <span class="reviewer-name">Marek W.</span>
                                    <span class="review-date">28.03.2023</span>
                                </div>
                                <div class="review-rating">
                                    ${generateProductStars(4)}
                                </div>
                            </div>
                            <p class="review-text">Dobry stosunek jakości do ceny. Produkt zgodny z opisem. Jedynym minusem jest to, że rozmiary są trochę większe niż oczekiwałem.</p>
                            <div class="review-helpful">
                                <span>Czy ta opinia była pomocna?</span>
                                <button class="helpful-btn">👍 Tak (8)</button>
                                <button class="helpful-btn">👎 Nie (0)</button>
                            </div>
                        </div>
                        
                        <div class="review-item">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <span class="reviewer-name">Katarzyna M.</span>
                                    <span class="review-date">15.03.2023</span>
                                </div>
                                <div class="review-rating">
                                    ${generateProductStars(5)}
                                </div>
                            </div>
                            <p class="review-text">Jestem bardzo zadowolona z zakupu. Produkt wygląda dokładnie jak na zdjęciach. Szybka dostawa i profesjonalne pakowanie.</p>
                            <div class="review-helpful">
                                <span>Czy ta opinia była pomocna?</span>
                                <button class="helpful-btn">👍 Tak (15)</button>
                                <button class="helpful-btn">👎 Nie (0)</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="write-review">
                        <h3>Napisz opinię</h3>
                        <button class="btn btn-outline">Dodaj opinię</button>
                    </div>
                </div>
                
                <div class="tab-panel" id="shipping">
                    <div class="shipping-info">
                        <div class="shipping-section">
                            <h3><i class="fas fa-truck"></i> Dostawa</h3>
                            <div class="shipping-options">
                                <div class="shipping-option">
                                    <strong>Dostawa kurierem</strong>
                                    <span>15 zł - 1-2 dni robocze</span>
                                </div>
                                <div class="shipping-option">
                                    <strong>Dostawa do paczkomatu</strong>
                                    <span>12 zł - 1-2 dni robocze</span>
                                </div>
                                <div class="shipping-option">
                                    <strong>Darmowa dostawa</strong>
                                    <span>Od 150 zł - 2-3 dni robocze</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="shipping-section">
                            <h3><i class="fas fa-undo"></i> Zwroty</h3>
                            <ul>
                                <li>30 dni na zwrot bez podania przyczyny</li>
                                <li>Produkt musi być w stanie nienaruszonym</li>
                                <li>Zwrot kosztów dostawy w przypadku reklamacji</li>
                                <li>Szybki proces zwrotu pieniędzy</li>
                            </ul>
                        </div>
                        
                        <div class="shipping-section">
                            <h3><i class="fas fa-shield-alt"></i> Gwarancja</h3>
                            <ul>
                                <li>2 lata gwarancji na wszystkie produkty</li>
                                <li>Bezpłatna naprawa lub wymiana</li>
                                <li>Profesjonalna obsługa reklamacji</li>
                                <li>Szybkie rozpatrzenie zgłoszeń</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

  // Setup option selection handlers
  setupOptionHandlers()
}

// Setup option selection handlers
function setupOptionHandlers() {
  // Color options
  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".color-option").forEach((opt) => opt.classList.remove("selected"))
      option.classList.add("selected")
    })
  })

  // Size options
  document.querySelectorAll(".size-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".size-option").forEach((opt) => opt.classList.remove("selected"))
      option.classList.add("selected")
    })
  })
}

// Show product not found
function showProductNotFound() {
  const container = document.getElementById("productContent")
  if (!container) return

  container.innerHTML = `
        <div class="product-not-found">
            <div class="not-found-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h1>Produkt nie znaleziony</h1>
            <p>Przepraszamy, ale szukany produkt nie istnieje lub został usunięty z naszej oferty.</p>
            <div class="not-found-actions">
                <a href="index.html" class="btn btn-primary">Wróć do strony głównej</a>
                <a href="sale.html" class="btn btn-outline">Zobacz promocje</a>
            </div>
        </div>
    `
}

// Generate stars for product
function generateProductStars(rating) {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "star filled" : "star"
    starsHTML += `<span class="${starClass}"><i class="fas fa-star"></i></span>`
  }
  return starsHTML
}

// Get color name in Polish
function getColorName(color) {
  const colorNames = {
    white: "Biały",
    black: "Czarny",
    gray: "Szary",
    blue: "Niebieski",
    red: "Czerwony",
    green: "Zielony",
    yellow: "Żółty",
    pink: "Różowy",
    navy: "Granatowy",
    "light-blue": "Jasnoniebieski",
    "floral-blue": "Kwiatowy niebieski",
    "floral-pink": "Kwiatowy różowy",
    "floral-white": "Kwiatowy biały",
    beige: "Beżowy",
    brown: "Brązowy",
    tan: "Jasnobrązowy",
    cream: "Kremowy",
    burgundy: "Bordowy",
  }
  return colorNames[color] || color
}

// Change quantity
function changeQuantity(change) {
  const quantityDisplay = document.getElementById("quantityDisplay")
  if (!quantityDisplay) return

  let currentQuantity = Number.parseInt(quantityDisplay.textContent)
  currentQuantity += change

  if (currentQuantity < 1) currentQuantity = 1
  if (currentQuantity > 10) currentQuantity = 10

  quantityDisplay.textContent = currentQuantity
}

// Add product to cart
function addProductToCart(productId) {
  const product = window.getProductById(productId)
  if (!product) return

  const selectedColor = document.querySelector('input[name="color"]:checked')?.value || product.colors[0]
  const selectedSize = document.querySelector('input[name="size"]:checked')?.value || product.sizes[0]
  const quantity = Number.parseInt(document.getElementById("quantityDisplay")?.textContent || "1")

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    quantity: quantity,
    size: selectedSize,
    color: selectedColor,
  }

  window.addToCart(cartItem)
  window.showToast("Dodano do koszyka", `${product.name} został dodany do koszyka.`)
}

// Show tab
function showTab(tabName) {
  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"))

  // Add active class to clicked button and corresponding panel
  event.target.classList.add("active")
  document.getElementById(tabName).classList.add("active")
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault()
  const searchInput = event.target.querySelector('input[type="search"]')
  if (searchInput && searchInput.value.trim()) {
    window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`
  }
}

// Export functions
window.changeQuantity = changeQuantity
window.addProductToCart = addProductToCart
window.showTab = showTab
window.handleSearch = handleSearch
