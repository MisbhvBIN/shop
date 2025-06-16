// Products data and functionality
window.allProducts = {
  // Men's products
  men_001: {
    id: "men_001",
    name: "Classic White Sneakers",
    price: 299.99,
    originalPrice: 349.99,
    description: "Klasyczne białe sneakersy idealne na każdą okazję",
    longDescription:
      "Nasze klasyczne białe sneakersy to must-have w każdej szafie. Wykonane z najwyższej jakości materiałów, łączą w sobie styl i funkcjonalność. Miękka wyściółka i ergonomiczna konstrukcja zapewniają wyjątkowy komfort noszenia, niezależnie od tego, czy spędzasz aktywny dzień w mieście, czy wybierasz się na długi spacer.",
    images: ["classic w s.png"],
    category: "men",
    colors: ["white", "black", "gray"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    onSale: true,
  },
  men_002: {
    id: "men_002",
    name: "Casual Denim Jacket",
    price: 189.99,
    description: "Stylowa kurtka jeansowa na każdą porę roku",
    longDescription:
      "Klasyczna kurtka jeansowa wykonana z wysokiej jakości denimu. Uniwersalny krój pasuje do wielu stylizacji. Idealna na chłodniejsze dni.",
    images: ["casual d j.png"],
    category: "men",
    colors: ["blue", "black", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviews: 89,
    inStock: true,
    onSale: false,
  },
  men_003: {
    id: "men_003",
    name: "Cotton T-Shirt",
    price: 79.99,
    description: "Wygodna koszulka z bawełny organicznej",
    longDescription:
      "Podstawowa koszulka wykonana z 100% bawełny organicznej. Miękka, przewiewna i trwała. Dostępna w różnych kolorach.",
    images: ["premium ctsh.png"],
    category: "men",
    colors: ["white", "black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.3,
    reviews: 234,
    inStock: true,
    onSale: false,
  },
  men_004: {
    id: "men_004",
    name: "Chino Pants",
    price: 149.99,
    description: "Eleganckie spodnie chino do pracy i na co dzień",
    longDescription:
      "Klasyczne spodnie chino wykonane z wysokiej jakości bawełny. Elegancki krój sprawia, że nadają się zarówno do pracy, jak i na codzienne wyjścia.",
    images: ["slim fch.png"],
    category: "men",
    colors: ["navy", "black", "gray"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    rating: 4.6,
    reviews: 167,
    inStock: true,
    onSale: false,
  },
  men_005: {
    id: "men_005",
    name: "Wool Sweater",
    price: 219.99,
    originalPrice: 279.99,
    description: "Ciepły sweter z wełny merino",
    longDescription:
      "Luksusowy sweter wykonany z najwyższej jakości wełny merino. Miękki, ciepły i oddychający. Idealny na chłodniejsze dni.",
    images: ["wool bs.png"],
    category: "men",
    colors: ["gray", "navy", "black"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 98,
    inStock: true,
    onSale: true,
  },
  men_006: {
    id: "men_006",
    name: "Running Shoes",
    price: 329.99,
    description: "Profesjonalne buty do biegania",
    longDescription:
      "Zaawansowane buty do biegania z technologią amortyzacji. Lekkie, wygodne i zapewniające doskonałą przyczepność na każdej powierzchni.",
    images: ["run shoe.png"],
    category: "men",
    colors: ["black", "blue", "gray"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    rating: 4.9,
    reviews: 312,
    inStock: true,
    onSale: false,
  },

  // Women's products
  women_001: {
    id: "women_001",
    name: "Floral Summer Dress",
    price: 159.99,
    description: "Zwiewna sukienka w kwiaty na lato",
    longDescription:
      "Piękna sukienka w kwiatowy wzór, idealna na letnie dni. Wykonana z lekkiej, przewiewnej tkaniny. Kobiecy krój podkreśla sylwetkę.",
    images: ["sum dr.png"],
    category: "women",
    colors: ["floral-blue", "floral-pink", "floral-white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 187,
    inStock: true,
    onSale: false,
  },
  women_002: {
    id: "women_002",
    name: "Elegant Blouse",
    price: 129.99,
    originalPrice: 169.99,
    description: "Elegancka bluzka do pracy i na specjalne okazje",
    longDescription:
      "Stylowa bluzka wykonana z wysokiej jakości materiału. Klasyczny krój sprawia, że nadaje się zarówno do pracy, jak i na eleganckie wyjścia.",
    images: ["el bluz.png"],
    category: "women",
    colors: ["white", "black", "pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 143,
    inStock: true,
    onSale: true,
  },
  women_003: {
    id: "women_003",
    name: "High-Waist Jeans",
    price: 199.99,
    description: "Modne jeansy z wysokim stanem",
    longDescription:
      "Trendy jeansy z wysokim stanem, które optycznie wydłużają nogi. Wykonane z elastycznego denimu zapewniającego komfort noszenia.",
    images: ["hwj.png"],
    category: "women",
    colors: ["blue", "black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 298,
    inStock: true,
    onSale: false,
  },
  women_004: {
    id: "women_004",
    name: "Cashmere Cardigan",
    price: 289.99,
    description: "Luksusowy kardigan z kaszmiru",
    longDescription:
      "Wyjątkowo miękki kardigan wykonany z najwyższej jakości kaszmiru. Elegancki i ciepły, idealny na chłodniejsze dni.",
    images: ["cc.png"],
    category: "women",
    colors: ["pink", "white", "black"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 76,
    inStock: true,
    onSale: false,
  },
  women_005: {
    id: "women_005",
    name: "Ballet Flats",
    price: 149.99,
    originalPrice: 189.99,
    description: "Wygodne baleriny na co dzień",
    longDescription:
      "Klasyczne baleriny wykonane ze skóry naturalnej. Wygodne i eleganckie, pasują do wielu stylizacji. Idealne na co dzień.",
    images: ["balet.png"],
    category: "women",
    colors: ["black", "pink", "white"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    rating: 4.4,
    reviews: 201,
    inStock: true,
    onSale: true,
  },
  women_006: {
    id: "women_006",
    name: "Silk Scarf",
    price: 89.99,
    description: "Jedwabny szalik w eleganckie wzory",
    longDescription:
      "Luksusowy szalik wykonany z naturalnego jedwabiu. Piękne wzory i żywe kolory. Idealny dodatek do każdej stylizacji.",
    images: ["sharf.png"],
    category: "women",
    colors: ["blue", "red", "pink"],
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    onSale: false,
  },

  // Children's products
  children_001: {
    id: "children_001",
    name: "Colorful Hoodie",
    price: 89.99,
    description: "Kolorowa bluza z kapturem dla dzieci",
    longDescription:
      "Wygodna i ciepła bluza z kapturem w żywych kolorach. Wykonana z miękkiej bawełny. Idealna na chłodniejsze dni i aktywne zabawy.",
    images: ["hoodie.png"],
    category: "children",
    colors: ["red", "blue", "green", "yellow"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    onSale: false,
  },
  children_002: {
    id: "children_002",
    name: "Denim Overalls",
    price: 119.99,
    originalPrice: 149.99,
    description: "Modne ogrodniczki jeansowe",
    longDescription:
      "Stylowe ogrodniczki jeansowe dla dzieci. Wygodne i praktyczne, idealne na co dzień. Wykonane z miękkiego denimu.",
    images: ["do.png"],
    category: "children",
    colors: ["blue", "light-blue"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    rating: 4.5,
    reviews: 87,
    inStock: true,
    onSale: true,
  },
  children_003: {
    id: "children_003",
    name: "Rainbow T-Shirt",
    price: 49.99,
    description: "Kolorowa koszulka z motywem tęczy",
    longDescription:
      "Wesoła koszulka z kolorowym nadrukiem tęczy. Wykonana z miękkiej bawełny organicznej. Idealna na lato i aktywne zabawy.",
    images: ["raduga.png"],
    category: "children",
    colors: ["white", "pink", "blue"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    onSale: false,
  },
  children_004: {
    id: "children_004",
    name: "Sport Sneakers",
    price: 129.99,
    description: "Sportowe buty dla aktywnych dzieci",
    longDescription:
      "Wygodne buty sportowe zaprojektowane specjalnie dla dzieci. Lekkie, oddychające i zapewniające dobrą amortyzację podczas zabawy.",
    images: ["snikers.png"],
    category: "children",
    colors: ["red", "blue", "green"],
    sizes: ["28", "29", "30", "31", "32", "33", "34", "35"],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    onSale: false,
  },
  children_005: {
    id: "children_005",
    name: "Winter Jacket",
    price: 179.99,
    originalPrice: 219.99,
    description: "Ciepła kurtka zimowa z kapturem",
    longDescription:
      "Ciepła i wodoodporna kurtka zimowa. Wyposażona w kaptur z futerkiem. Idealna ochrona przed zimnem i wiatrem.",
    images: ["winter.png"],
    category: "children",
    colors: ["red", "blue", "pink"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    onSale: true,
  },
  children_006: {
    id: "children_006",
    name: "Cotton Pajamas",
    price: 69.99,
    description: "Wygodna piżama z bawełny organicznej",
    longDescription:
      "Miękka piżama wykonana z bawełny organicznej. Wygodna i oddychająca, zapewnia komfortowy sen. Dostępna w różnych wzorach.",
    images: ["pijama.png"],
    category: "children",
    colors: ["blue", "pink", "yellow"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    rating: 4.4,
    reviews: 167,
    inStock: true,
    onSale: false,
  },
}

// Category products
window.categoryProducts = {
  men: [
    window.allProducts.men_001,
    window.allProducts.men_002,
    window.allProducts.men_003,
    window.allProducts.men_004,
    window.allProducts.men_005,
    window.allProducts.men_006,
  ],
  women: [
    window.allProducts.women_001,
    window.allProducts.women_002,
    window.allProducts.women_003,
    window.allProducts.women_004,
    window.allProducts.women_005,
    window.allProducts.women_006,
  ],
  children: [
    window.allProducts.children_001,
    window.allProducts.children_002,
    window.allProducts.children_003,
    window.allProducts.children_004,
    window.allProducts.children_005,
    window.allProducts.children_006,
  ],
}

// Featured products for homepage
window.featuredProducts = [
  window.allProducts.men_001,
  window.allProducts.women_001,
  window.allProducts.children_001,
  window.allProducts.men_006,
  window.allProducts.women_003,
  window.allProducts.children_004,
]

// Sale products
window.saleProducts = Object.values(window.allProducts).filter((product) => product.onSale)

// Get product by ID
window.getProductById = (id) => window.allProducts[id] || null

// Get products by category
window.getProductsByCategory = (category) => window.categoryProducts[category] || []

// Search products
window.searchProducts = (query) => {
  const searchTerm = query.toLowerCase()
  return Object.values(window.allProducts).filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )
}

// Get all products
window.getAllProducts = () => Object.values(window.allProducts)
