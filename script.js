// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle")
const htmlElement = document.documentElement

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode")
  document.querySelector("nav").classList.add("dark-mode")
  darkModeToggle.textContent = "☀️"
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")
  document.querySelector("nav").classList.toggle("dark-mode")

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled")
    darkModeToggle.textContent = "☀️"
  } else {
    localStorage.setItem("darkMode", "disabled")
    darkModeToggle.textContent = "🌙"
  }
})

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav")
  if (window.pageYOffset > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Hamburger Menu
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

hamburger.addEventListener("click", (e) => {
  e.stopPropagation()
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

document.addEventListener("click", (e) => {
  const nav = document.querySelector("nav")
  if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  }
})

window.addEventListener("scroll", () => {
  if (navLinks.classList.contains("active")) {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  }
})

// DateTime Update
function updateDateTime() {
  const now = new Date()
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  const dateStr = now.toLocaleDateString("en-US", dateOptions)
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  document.getElementById("current-date").textContent = dateStr
  document.getElementById("current-time").textContent = timeStr
}

updateDateTime()
setInterval(updateDateTime, 1000)

// Update Visitor Count
function updateVisitors() {
  const count = Math.floor(Math.random() * (500 - 200 + 1)) + 200
  document.getElementById("visitor-count").textContent = count
}

setInterval(updateVisitors, 5000)

// Offers Data
const offers = [
  {
    id: 1,
    title: "NordVPN",
    description: "Fast, secure, and risk-free VPN for online privacy.",
    category: "VPN Services",
    icon: "fas fa-shield-alt",
    rating: 4.5,
    tags: ["Best Value"],
  },
  {
    id: 2,
    title: "ChatGPT Plus",
    description: "Advanced AI assistant for productivity and creativity.",
    category: "AI Tools",
    icon: "fas fa-brain",
    rating: 4.8,
    tags: ["Popular"],
  },
  {
    id: 3,
    title: "Hostinger",
    description: "Affordable and reliable web hosting solutions.",
    category: "Hosting",
    icon: "fas fa-server",
    rating: 4.6,
    tags: ["Best Value"],
  },
  {
    id: 4,
    title: "Canva Pro",
    description: "Design beautiful graphics without any experience.",
    category: "Design",
    icon: "fas fa-palette",
    rating: 4.7,
    tags: ["Trending"],
  },
  {
    id: 5,
    title: "Grammarly",
    description: "AI-powered writing assistant for perfect content.",
    category: "Productivity",
    icon: "fas fa-pen-fancy",
    rating: 4.5,
    tags: ["Popular"],
  },
  {
    id: 6,
    title: "Stripe",
    description: "Payment processing for online businesses.",
    category: "Business",
    icon: "fas fa-credit-card",
    rating: 4.9,
    tags: ["Best Value"],
  },
  {
    id: 7,
    title: "Figma",
    description: "Collaborative design tool for teams.",
    category: "Design",
    icon: "fas fa-bezier-curve",
    rating: 4.8,
    tags: ["Professional"],
  },
  {
    id: 8,
    title: "Notion",
    description: "All-in-one workspace for notes and projects.",
    category: "Productivity",
    icon: "fas fa-sticky-note",
    rating: 4.6,
    tags: ["Popular"],
  },
  {
    id: 9,
    title: "Google Analytics",
    description: "Track and analyze website performance.",
    category: "Analytics",
    icon: "fas fa-chart-line",
    rating: 4.7,
    tags: ["Essential"],
  },
  {
    id: 10,
    title: "Mailchimp",
    description: "Email marketing platform for businesses.",
    category: "Marketing",
    icon: "fas fa-envelope",
    rating: 4.5,
    tags: ["Popular"],
  },
  {
    id: 11,
    title: "Slack",
    description: "Team communication and collaboration platform.",
    category: "Business",
    icon: "fas fa-comments",
    rating: 4.8,
    tags: ["Professional"],
  },
  {
    id: 12,
    title: "Adobe Creative Cloud",
    description: "Professional design and video editing suite.",
    category: "Design",
    icon: "fas fa-film",
    rating: 4.9,
    tags: ["Professional"],
  },
]

const categories = [
  "All",
  "Security",
  "Storage",
  "Hosting",
  "Marketing",
  "Design",
  "Productivity",
  "Analytics",
  "Business",
  "AI Tools",
  "VPN Services",
]
let currentPage = 1
const itemsPerPage = 6
let filteredOffers = [...offers]
let selectedCategory = "All"

function initCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter")
  categories.forEach((cat) => {
    const btn = document.createElement("button")
    btn.className = "category-btn" + (cat === "All" ? " active" : "")
    btn.textContent = cat
    btn.onclick = () => filterByCategory(cat)
    categoryFilter.appendChild(btn)
  })
}

function filterByCategory(category) {
  selectedCategory = category
  currentPage = 1

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  if (category === "All") {
    filteredOffers = [...offers]
  } else {
    filteredOffers = offers.filter((offer) => offer.category === category)
  }

  displayOffers()
  displayPagination()
}

function searchOffers() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  currentPage = 1

  if (searchTerm === "") {
    filteredOffers = selectedCategory === "All" ? [...offers] : offers.filter((o) => o.category === selectedCategory)
  } else {
    filteredOffers = offers.filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchTerm) ||
        offer.description.toLowerCase().includes(searchTerm) ||
        offer.category.toLowerCase().includes(searchTerm),
    )
  }

  displayOffers()
  displayPagination()
}

function displayOffers() {
  const offersGrid = document.getElementById("offersGrid")
  offersGrid.innerHTML = ""

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOffers = filteredOffers.slice(startIndex, endIndex)

  paginatedOffers.forEach((offer, index) => {
    const card = document.createElement("div")
    card.className = "offer-card"
    card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`
    card.innerHTML = `
            <div class="offer-icon"><i class="${offer.icon}"></i></div>
            <h3>${offer.title}</h3>
            <p>${offer.description}</p>
            <span class="offer-category">${offer.category}</span>
            <button class="offer-button" onclick="openModal(${offer.id})">Get This Deal</button>
        `
    offersGrid.appendChild(card)
  })
}

function displayPagination() {
  const pagination = document.getElementById("pagination")
  pagination.innerHTML = ""

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage)

  const prevBtn = document.createElement("button")
  prevBtn.textContent = "Previous"
  prevBtn.disabled = currentPage === 1
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--
      displayOffers()
      displayPagination()
    }
  }
  pagination.appendChild(prevBtn)

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button")
    pageBtn.textContent = i
    pageBtn.className = i === currentPage ? "active" : ""
    pageBtn.onclick = () => {
      currentPage = i
      displayOffers()
      displayPagination()
    }
    pagination.appendChild(pageBtn)
  }

  const nextBtn = document.createElement("button")
  nextBtn.textContent = "Next"
  nextBtn.disabled = currentPage === totalPages
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++
      displayOffers()
      displayPagination()
    }
  }
  pagination.appendChild(nextBtn)
}

function openModal(offerId) {
  const offer = offers.find((o) => o.id === offerId)
  if (!offer) return

  document.getElementById("modalIcon").innerHTML = `<i class="${offer.icon}"></i>`
  document.getElementById("modalTitle").textContent = offer.title
  document.getElementById("modalDescription").textContent = offer.description
  document.getElementById("modalCategory").textContent = offer.category
  document.getElementById("modalRating").textContent = offer.rating + " ⭐"

  const aboutTitle = document.getElementById("aboutTitle")
  aboutTitle.textContent = `About ${offer.title}`

  document.getElementById("aboutContent").textContent =
    `${offer.title} is a leading solution in the ${offer.category} space. It provides comprehensive features and benefits for users looking to enhance their digital experience. With a focus on quality, security, and user satisfaction, ${offer.title} has become a trusted choice for millions worldwide.`

  const whyList = document.getElementById("whyList")
  whyList.innerHTML = `
        <li>Industry-leading features and functionality</li>
        <li>Trusted by millions of users globally</li>
        <li>Continuous updates and improvements</li>
        <li>Excellent customer support</li>
        <li>Competitive pricing and value</li>
        <li>Secure and reliable service</li>
    `

  document.getElementById("whoContent").textContent =
    `${offer.title} is perfect for anyone who wants to improve their digital workflow and experience:`

  const whoList = document.getElementById("whoList")
  whoList.innerHTML = `
        <li>Professionals seeking advanced tools</li>
        <li>Businesses looking to scale operations</li>
        <li>Individuals wanting better productivity</li>
        <li>Teams requiring collaboration features</li>
        <li>Anyone concerned about security and privacy</li>
    `

  document.getElementById("whyBestContent").textContent =
    `${offer.title} combines speed, reliability, and top-level security. It's trusted by millions worldwide and offers an easy-to-use interface for beginners while providing advanced features for experienced users.`

  document.getElementById("specialOfferText").textContent = `Start using ${offer.title} today and enjoy:`

  const specialOfferList = document.getElementById("specialOfferList")
  specialOfferList.innerHTML = `
        <li>Fast, secure, and private experience</li>
        <li>Access to premium features</li>
        <li>30-day money-back guarantee</li>
        <li>24/7 expert support</li>
    `

  const modalTags = document.getElementById("modalTags")
  modalTags.innerHTML = ""
  offer.tags.forEach((tag) => {
    const tagEl = document.createElement("span")
    tagEl.className = "tag"
    tagEl.textContent = tag
    modalTags.appendChild(tagEl)
  })

  document.getElementById("productModal").classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  document.getElementById("productModal").classList.remove("show")
  document.body.style.overflow = "auto"
}

function visitWebsite() {
  alert("Redirecting to partner website...")
}

document.getElementById("productModal").addEventListener("click", (e) => {
  if (e.target.id === "productModal") {
    closeModal()
  }
})

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

// Carousel functionality
function initCarousel() {
  const prevBtn = document.getElementById("carouselPrev")
  const nextBtn = document.getElementById("carouselNext")

  prevBtn.addEventListener("click", () => {
    console.log("Previous clicked")
  })

  nextBtn.addEventListener("click", () => {
    console.log("Next clicked")
  })
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show")
  } else {
    scrollToTopBtn.classList.remove("show")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// Snow Effect
function createSnowflake() {
  const snowflake = document.createElement("div")
  snowflake.classList.add("snowflake")
  snowflake.textContent = "❄"
  snowflake.style.left = Math.random() * window.innerWidth + "px"
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px"
  snowflake.style.opacity = Math.random() * 0.5 + 0.5
  snowflake.style.animationDuration = Math.random() * 10 + 10 + "s"
  snowflake.style.animationDelay = Math.random() * 2 + "s"
  document.body.appendChild(snowflake)

  setTimeout(() => snowflake.remove(), 20000)
}

setInterval(createSnowflake, 300)

// Initialize
initCategoryFilter()
displayOffers()
displayPagination()
initCarousel()
