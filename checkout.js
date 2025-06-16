// Checkout functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  if (!window.isLoggedIn()) {
    window.location.href = "login.html"
    return
  }

  // Check if cart is not empty
  const cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []
  if (cart.length === 0) {
    window.location.href = "cart.html"
    return
  }

  initializeCheckout()
})

function initializeCheckout() {
  loadOrderSummary()
  setupPaymentMethods()
  setupCardValidation()
  setupFormSubmission()
  setupPromoCode()
  prefillUserData()
}

// Load order summary
function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []
  const orderItemsContainer = document.getElementById("orderItems")
  const itemsTotalElement = document.getElementById("itemsTotal")
  const shippingCostElement = document.getElementById("shippingCost")
  const orderTotalElement = document.getElementById("orderTotal")

  if (!orderItemsContainer) return

  let itemsTotal = 0
  orderItemsContainer.innerHTML = ""

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    itemsTotal += itemTotal

    const orderItem = document.createElement("div")
    orderItem.className = "order-item"
    orderItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-options">
                    <span>Rozmiar: ${item.size}</span>
                    <span>Kolor: ${item.color}</span>
                    <span>Ilość: ${item.quantity}</span>
                </div>
            </div>
            <div class="item-price">${itemTotal.toFixed(2)} zł</div>
        `
    orderItemsContainer.appendChild(orderItem)
  })

  const shippingCost = itemsTotal >= 150 ? 0 : 15
  const orderTotal = itemsTotal + shippingCost

  if (itemsTotalElement) itemsTotalElement.textContent = itemsTotal.toFixed(2) + " zł"
  if (shippingCostElement) {
    shippingCostElement.textContent = shippingCost === 0 ? "Za darmo" : shippingCost.toFixed(2) + " zł"
  }
  if (orderTotalElement) orderTotalElement.textContent = orderTotal.toFixed(2) + " zł"
}

// Setup payment methods
function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]')
  const cardDetails = document.getElementById("cardDetails")
  const blikDetails = document.getElementById("blikDetails")
  const transferDetails = document.getElementById("transferDetails")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      // Hide all payment details
      cardDetails.style.display = "none"
      blikDetails.style.display = "none"
      transferDetails.style.display = "none"

      // Show selected payment method details
      switch (this.value) {
        case "card":
          cardDetails.style.display = "block"
          break
        case "blik":
          blikDetails.style.display = "block"
          break
        case "transfer":
          transferDetails.style.display = "block"
          break
      }
    })
  })
}

// Setup card validation
function setupCardValidation() {
  const cardNumberInput = document.getElementById("cardNumber")
  const cardExpiryInput = document.getElementById("cardExpiry")
  const cardCvvInput = document.getElementById("cardCvv")
  const cardNameInput = document.getElementById("cardName")
  const cardTypeElement = document.getElementById("cardType")

  // Card number formatting and validation
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      const value = this.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value

      if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19)
      }

      this.value = formattedValue

      // Detect card type
      const cardType = detectCardType(value)
      updateCardTypeDisplay(cardType, cardTypeElement)

      // Validate card number
      validateCardNumber(value, this)
    })
  }

  // Card expiry formatting
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      this.value = value

      // Validate expiry date
      validateExpiryDate(value, this)
    })
  }

  // CVV validation
  if (cardCvvInput) {
    cardCvvInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "")
      validateCvv(this.value, this)
    })
  }

  // Card name validation
  if (cardNameInput) {
    cardNameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase()
    })
  }
}

// Detect card type
function detectCardType(number) {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  }

  for (const type in patterns) {
    if (patterns[type].test(number)) {
      return type
    }
  }
  return "unknown"
}

// Update card type display
function updateCardTypeDisplay(cardType, element) {
  if (!element) return

  const icons = {
    visa: '<i class="fab fa-cc-visa"></i>',
    mastercard: '<i class="fab fa-cc-mastercard"></i>',
    amex: '<i class="fab fa-cc-amex"></i>',
    discover: '<i class="fab fa-cc-discover"></i>',
  }

  element.innerHTML = icons[cardType] || ""
}

// Validate card number using Luhn algorithm
function validateCardNumber(number, element) {
  const isValid = luhnCheck(number) && number.length >= 13
  updateFieldValidation(element, isValid)
  return isValid
}

// Luhn algorithm for card validation
function luhnCheck(number) {
  let sum = 0
  let alternate = false

  for (let i = number.length - 1; i >= 0; i--) {
    let n = Number.parseInt(number.charAt(i), 10)

    if (alternate) {
      n *= 2
      if (n > 9) {
        n = (n % 10) + 1
      }
    }

    sum += n
    alternate = !alternate
  }

  return sum % 10 === 0
}

// Validate expiry date
function validateExpiryDate(expiry, element) {
  if (expiry.length !== 5) {
    updateFieldValidation(element, false)
    return false
  }

  const [month, year] = expiry.split("/")
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const isValidMonth = month >= 1 && month <= 12
  const isValidYear = year >= currentYear
  const isNotExpired = year > currentYear || (year == currentYear && month >= currentMonth)

  const isValid = isValidMonth && isValidYear && isNotExpired
  updateFieldValidation(element, isValid)
  return isValid
}

// Validate CVV
function validateCvv(cvv, element) {
  const isValid = cvv.length >= 3 && cvv.length <= 4
  updateFieldValidation(element, isValid)
  return isValid
}

// Update field validation styling
function updateFieldValidation(element, isValid) {
  if (element.value.length === 0) {
    element.classList.remove("valid", "invalid")
    return
  }

  if (isValid) {
    element.classList.remove("invalid")
    element.classList.add("valid")
  } else {
    element.classList.remove("valid")
    element.classList.add("invalid")
  }
}

// Setup form submission
function setupFormSubmission() {
  const checkoutForm = document.getElementById("checkoutForm")

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()
      processOrder()
    })
  }
}

// Process order
function processOrder() {
  const formData = collectFormData()

  if (!validateFormData(formData)) {
    return
  }

  // Show loading overlay
  showLoadingOverlay()

  // Simulate payment processing
  setTimeout(() => {
    hideLoadingOverlay()

    // Save order data
    saveOrderData(formData)

    // Redirect to success page
    const orderNumber = generateOrderNumber()
    const orderTotal = calculateOrderTotal()

    localStorage.setItem("lastOrderNumber", orderNumber)
    localStorage.setItem("lastOrderTotal", orderTotal.toFixed(2))
    localStorage.setItem("lastDeliveryAddress", `${formData.address}, ${formData.city}`)

    window.location.href = `order-success.html?order=${orderNumber}`
  }, 3000)
}

// Collect form data
function collectFormData() {
  return {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    postalCode: document.getElementById("postalCode").value,
    country: document.getElementById("country").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    cardNumber: document.getElementById("cardNumber")?.value,
    cardName: document.getElementById("cardName")?.value,
    cardExpiry: document.getElementById("cardExpiry")?.value,
    cardCvv: document.getElementById("cardCvv")?.value,
    blikCode: document.getElementById("blikCode")?.value,
    bank: document.querySelector('input[name="bank"]:checked')?.value,
  }
}

// Validate form data
function validateFormData(data) {
  const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode", "country"]

  for (const field of requiredFields) {
    if (!data[field]) {
      window.showToast("Błąd", `Pole "${field}" jest wymagane`)
      return false
    }
  }

  // Validate payment method specific fields
  if (data.paymentMethod === "card") {
    if (!data.cardNumber || !data.cardName || !data.cardExpiry || !data.cardCvv) {
      window.showToast("Błąd", "Wypełnij wszystkie dane karty płatniczej")
      return false
    }

    if (!validateCardNumber(data.cardNumber.replace(/\s/g, ""), document.getElementById("cardNumber"))) {
      window.showToast("Błąd", "Nieprawidłowy numer karty")
      return false
    }
  } else if (data.paymentMethod === "blik") {
    if (!data.blikCode || data.blikCode.length !== 6) {
      window.showToast("Błąd", "Wprowadź prawidłowy kod BLIK")
      return false
    }
  } else if (data.paymentMethod === "transfer") {
    if (!data.bank) {
      window.showToast("Błąd", "Wybierz bank do przelewu")
      return false
    }
  }

  return true
}

// Save order data
function saveOrderData(formData) {
  const cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []
  const orderData = {
    ...formData,
    items: cart,
    total: calculateOrderTotal(),
    orderDate: new Date().toISOString(),
    orderNumber: generateOrderNumber(),
  }

  // Save to localStorage (in real app would send to server)
  const orders = JSON.parse(localStorage.getItem("userOrders")) || []
  orders.unshift(orderData)
  localStorage.setItem("userOrders", JSON.stringify(orders))
}

// Calculate order total
function calculateOrderTotal() {
  const cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []
  const itemsTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingCost = itemsTotal >= 150 ? 0 : 15
  return itemsTotal + shippingCost
}

// Generate order number
function generateOrderNumber() {
  return (
    "#SH" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
  )
}

// Show/hide loading overlay
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay")
  if (overlay) {
    overlay.style.display = "flex"
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay")
  if (overlay) {
    overlay.style.display = "none"
  }
}

// Setup promo code
function setupPromoCode() {
  const applyPromoButton = document.getElementById("applyPromo")
  const promoCodeInput = document.getElementById("promoCode")

  if (applyPromoButton) {
    applyPromoButton.addEventListener("click", () => {
      const promoCode = promoCodeInput.value.trim().toUpperCase()
      applyPromoCode(promoCode)
    })
  }
}

// Apply promo code
function applyPromoCode(code) {
  const validCodes = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    FIRST15: 0.15,
  }

  if (validCodes[code]) {
    const discount = validCodes[code]
    const itemsTotal = calculateItemsTotal()
    const discountAmount = itemsTotal * discount

    // Update display
    const discountRow = document.getElementById("discountRow")
    const discountAmountElement = document.getElementById("discountAmount")
    const orderTotalElement = document.getElementById("orderTotal")

    if (discountRow && discountAmountElement && orderTotalElement) {
      discountRow.style.display = "flex"
      discountAmountElement.textContent = `-${discountAmount.toFixed(2)} zł`

      const newTotal = calculateOrderTotal() - discountAmount
      orderTotalElement.textContent = newTotal.toFixed(2) + " zł"
    }

    window.showToast("Kod promocyjny zastosowany", `Zniżka ${discount * 100}% zastosowana!`)
  } else {
    window.showToast("Błąd", "Nieprawidłowy kod promocyny")
  }
}

// Calculate items total
function calculateItemsTotal() {
  const cart = JSON.parse(localStorage.getItem("styleHavenCart")) || []
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Prefill user data
function prefillUserData() {
  const user = window.getCurrentUser()
  if (user) {
    const firstNameInput = document.getElementById("firstName")
    const lastNameInput = document.getElementById("lastName")
    const emailInput = document.getElementById("email")

    if (firstNameInput && user.firstName) firstNameInput.value = user.firstName
    if (lastNameInput && user.lastName) lastNameInput.value = user.lastName
    if (emailInput && user.email) emailInput.value = user.email
  }
}
