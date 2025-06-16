// Authentication functionality
let currentUser = null

// Check if user is logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus()
})

function checkAuthStatus() {
  const user = localStorage.getItem("currentUser")
  if (user) {
    currentUser = JSON.parse(user)
    updateAuthUI(true)
  } else {
    updateAuthUI(false)
  }
}

function updateAuthUI(isLoggedIn) {
  const authLinks = document.getElementById("authLinks")
  if (!authLinks) return

  if (isLoggedIn && currentUser) {
    authLinks.innerHTML = `
            <div class="user-menu">
                <span>Witaj, ${currentUser.firstName || currentUser.name}!</span>
                <a href="account.html">Moje konto</a>
                <span>|</span>
                <a href="#" onclick="logout()">Wyloguj</a>
            </div>
        `
  } else {
    authLinks.innerHTML = `
            <a href="login.html">Zaloguj</a>
            <span>|</span>
            <a href="register.html">Zarejestruj</a>
        `
  }
}

function login(email, password) {
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("styleHavenUsers")) || []

  // Find user
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    updateAuthUI(true)
    return { success: true, user: user }
  } else {
    return { success: false, message: "Nieprawidłowy email lub hasło" }
  }
}

function register(userData) {
  // Get existing users
  const users = JSON.parse(localStorage.getItem("styleHavenUsers")) || []

  // Check if user already exists
  if (users.find((u) => u.email === userData.email)) {
    return { success: false, message: "Użytkownik z tym emailem już istnieje" }
  }

  // Add new user
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem("styleHavenUsers", JSON.stringify(users))

  // Auto login after registration
  currentUser = newUser
  localStorage.setItem("currentUser", JSON.stringify(newUser))
  updateAuthUI(true)

  return { success: true, user: newUser }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateAuthUI(false)

  // Redirect to home page
  window.location.href = "index.html"
}

function isLoggedIn() {
  return currentUser !== null || localStorage.getItem("currentUser") !== null
}

function getCurrentUser() {
  if (!currentUser) {
    const user = localStorage.getItem("currentUser")
    if (user) {
      currentUser = JSON.parse(user)
    }
  }
  return currentUser
}

// Export functions for global use
window.login = login
window.register = register
window.logout = logout
window.isLoggedIn = isLoggedIn
window.getCurrentUser = getCurrentUser
window.checkAuthStatus = checkAuthStatus
