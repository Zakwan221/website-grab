// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

function toggleTheme() {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Service Tabs (Food/Ride)
const serviceTabs = document.querySelectorAll('.service-tab');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const foodHero = document.getElementById('foodHero');
const rideHero = document.getElementById('rideHero');
const searchFood = document.getElementById('searchFood');
const searchRide = document.getElementById('searchRide');

const heroContent = {
    food: {
        title: "Delicious food, delivered to you",
        subtitle: "Order from your favourite restaurants and get it delivered fast."
    },
    ride: {
        title: "Get a ride in minutes",
        subtitle: "Affordable rides at your fingertips. Go anywhere, anytime."
    }
};

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const service = tab.dataset.service;
        
        // Update active tab
        serviceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update hero content
        if (heroTitle && heroSubtitle) {
            heroTitle.textContent = heroContent[service].title;
            heroSubtitle.textContent = heroContent[service].subtitle;
        }
        
        // Update hero images
        if (service === 'food') {
            if (foodHero) foodHero.classList.add('active');
            if (rideHero) rideHero.classList.remove('active');
            if (searchFood) searchFood.style.display = 'flex';
            if (searchRide) searchRide.style.display = 'none';
        } else {
            if (foodHero) foodHero.classList.remove('active');
            if (rideHero) rideHero.classList.add('active');
            if (searchFood) searchFood.style.display = 'none';
            if (searchRide) searchRide.style.display = 'flex';
        }
    });
});

// Restaurant Data
const restaurants = [
    { 
        name: "Burger Barn", 
        cuisine: "American, Burgers", 
        rating: 4.8, 
        time: "20-30 min", 
        promo: "30% OFF", 
        image: "../src/assets/food-burger.jpg", 
        distance: "1.2 km" 
    },
    { 
        name: "Noodle House", 
        cuisine: "Japanese, Ramen", 
        rating: 4.6, 
        time: "25-35 min", 
        promo: null, 
        image: "../src/assets/food-noodles.jpg", 
        distance: "2.1 km" 
    },
    { 
        name: "Pizza Paradise", 
        cuisine: "Italian, Pizza", 
        rating: 4.9, 
        time: "30-40 min", 
        promo: "Free Delivery", 
        image: "../src/assets/food-pizza.jpg", 
        distance: "0.8 km" 
    },
    { 
        name: "Rice Bowl Express", 
        cuisine: "Asian, Rice", 
        rating: 4.5, 
        time: "15-25 min", 
        promo: "20% OFF", 
        image: "../src/assets/food-rice.jpg", 
        distance: "1.5 km" 
    },
    { 
        name: "Green Kitchen", 
        cuisine: "Healthy, Salads", 
        rating: 4.7, 
        time: "20-30 min", 
        promo: null, 
        image: "../src/assets/food-healthy.jpg", 
        distance: "3.0 km" 
    },
    { 
        name: "Boba Station", 
        cuisine: "Drinks, Dessert", 
        rating: 4.4, 
        time: "10-20 min", 
        promo: "Buy 1 Free 1", 
        image: "../src/assets/food-drinks.jpg", 
        distance: "0.5 km" 
    }
];

// Generate Restaurant Cards
function generateRestaurantCards() {
    const restaurantsGrid = document.getElementById('restaurantsGrid');
    if (!restaurantsGrid) return;
    
    restaurantsGrid.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card" onclick="handleRestaurantClick('${restaurant.name}')">
            <div class="restaurant-image">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                ${restaurant.promo ? `
                    <div class="restaurant-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        ${restaurant.promo}
                    </div>
                ` : ''}
            </div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-meta">
                    <span class="restaurant-rating">
                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ${restaurant.rating}
                    </span>
                    <span class="restaurant-time">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${restaurant.time}
                    </span>
                    <span class="restaurant-distance">${restaurant.distance}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function handleRestaurantClick(name) {
    openFoodOrder(name);
}

// Promo Data
const promos = [
    { 
        title: "50% OFF First Order", 
        code: "GRABFIRST", 
        desc: "Valid for new users. Min. order $10.", 
        type: "food", 
        discount: "50%",
        icon: "tag"
    },
    { 
        title: "Free Delivery x3", 
        code: "FREEDEL3", 
        desc: "No minimum order. This week only!", 
        type: "food", 
        discount: "FREE",
        icon: "ticket"
    },
    { 
        title: "$5 OFF GrabCar", 
        code: "RIDE5OFF", 
        desc: "Valid for rides above $15. Limited time.", 
        type: "ride", 
        discount: "$5",
        icon: "gift"
    }
];

// Generate Promo Cards
function generatePromoCards() {
    const promosGrid = document.getElementById('promosGrid');
    if (!promosGrid) return;
    
    const iconSVGs = {
        tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>`,
        ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
            <line x1="15" y1="12" x2="15.01" y2="12"></line>
        </svg>`,
        gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
        </svg>`
    };
    
    promosGrid.innerHTML = promos.map(promo => `
        <div class="promo-card">
            <div class="promo-header">
                <div class="promo-header-content">
                    <div class="promo-icon-wrapper">
                        <div class="promo-icon-box">
                            ${iconSVGs[promo.icon]}
                        </div>
                        <p class="promo-type">${promo.type === 'food' ? 'GrabFood' : 'GrabCar'}</p>
                    </div>
                    <span class="promo-discount">${promo.discount}</span>
                </div>
            </div>
            <div class="promo-divider">
                <div class="promo-divider-line"></div>
            </div>
            <div class="promo-body">
                <h3 class="promo-title">${promo.title}</h3>
                <p class="promo-desc">${promo.desc}</p>
                <div class="promo-actions">
                    <button class="promo-code" onclick="copyPromoCode('${promo.code}', this)">
                        ${promo.code}
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                    <button class="promo-apply">Apply</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Copy Promo Code
function copyPromoCode(code, button) {
    navigator.clipboard.writeText(code).then(() => {
        const svg = button.querySelector('svg');
        const originalHTML = svg.innerHTML;
        svg.innerHTML = `<path d="M20 6L9 17l-5-5"></path>`;
        svg.style.color = 'var(--primary)';
        setTimeout(() => {
            svg.innerHTML = originalHTML;
            svg.style.color = '';
        }, 2000);
    });
}

// Rewards Data
const rewards = [
    { points: 150, label: "GrabFood $3 Voucher" },
    { points: 300, label: "GrabCar $5 Voucher" },
    { points: 500, label: "Free Delivery (30 days)" },
    { points: 1000, label: "GrabFood $15 Voucher" }
];

// Generate Rewards Grid
function generateRewardsGrid() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    if (!rewardsGrid) return;
    
    rewardsGrid.innerHTML = rewards.map(reward => `
        <div class="reward-item">
            <p class="reward-points">${reward.points}</p>
            <p class="reward-label">points</p>
            <p class="reward-label">${reward.label}</p>
        </div>
    `).join('');
}

// Ride Features Data
const rideFeatures = [
    {
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>`,
        title: "Safety First",
        desc: "All rides are GPS tracked with emergency support"
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`,
        title: "Quick Pickup",
        desc: "Average pickup time of 3-5 minutes"
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>`,
        title: "Cashless Payment",
        desc: "Pay with GrabPay, cards, or cash"
    }
];

// Generate Ride Features
function generateRideFeatures() {
    const rideFeaturesContainer = document.getElementById('rideFeatures');
    if (!rideFeaturesContainer) return;
    
    rideFeaturesContainer.innerHTML = rideFeatures.map(feature => `
        <div class="ride-feature">
            <div class="ride-feature-icon">
                ${feature.icon}
            </div>
            <div class="ride-feature-content">
                <h3>${feature.title}</h3>
                <p>${feature.desc}</p>
            </div>
        </div>
    `).join('');
}

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartBadge = document.getElementById('cartBadge');
const cartBtn = document.getElementById('cartBtn');

function updateCartBadge() {
    if (cartBadge) {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = itemCount;
        if (itemCount === 0) {
            cartBadge.style.display = 'none';
        } else {
            cartBadge.style.display = 'flex';
        }
    }
}

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        alert('Cart functionality - Add items to see them here!');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateRestaurantCards();
    generatePromoCards();
    generateRewardsGrid();
    generateRideFeatures();
    updateCartBadge();
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Ride Booking Functions
let map = null;
let pickupMarker = null;
let destinationMarker = null;
let pickupLocation = null;
let destinationLocation = null;
let currentLocationType = null;
let selectedSuggestionIndex = -1;

// Malaysian Address Database
const malaysianAddresses = [
    { name: 'KLCC (Petronas Twin Towers)', address: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur', lat: 3.1579, lng: 101.7117 },
    { name: 'Pavilion Kuala Lumpur', address: '168, Jalan Bukit Bintang, 55100 Kuala Lumpur', lat: 3.1490, lng: 101.7129 },
    { name: 'Suria KLCC', address: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur', lat: 3.1579, lng: 101.7117 },
    { name: 'Mid Valley Megamall', address: 'Mid Valley City, 59200 Kuala Lumpur', lat: 3.1180, lng: 101.6769 },
    { name: 'Sunway Pyramid', address: '3, Jalan PJS 11/15, Bandar Sunway, 47500 Petaling Jaya', lat: 3.0731, lng: 101.6068 },
    { name: 'One Utama Shopping Centre', address: '1, Lebuh Bandar Utama, Bandar Utama, 47800 Petaling Jaya', lat: 3.1494, lng: 101.6167 },
    { name: 'KL Sentral', address: 'Kuala Lumpur Sentral, 50470 Kuala Lumpur', lat: 3.1340, lng: 101.6869 },
    { name: 'KLIA Airport', address: '64000 Sepang, Selangor', lat: 2.7433, lng: 101.6983 },
    { name: 'KLIA2 Airport', address: '64000 Sepang, Selangor', lat: 2.7600, lng: 101.7100 },
    { name: 'Batu Caves', address: '68100 Batu Caves, Selangor', lat: 3.2380, lng: 101.6839 },
    { name: 'Central Market', address: 'Jalan Hang Kasturi, 50050 Kuala Lumpur', lat: 3.1478, lng: 101.6956 },
    { name: 'Merdeka Square', address: 'Jalan Raja, 50050 Kuala Lumpur', lat: 3.1478, lng: 101.6942 },
    { name: 'Bukit Bintang', address: 'Bukit Bintang, 55100 Kuala Lumpur', lat: 3.1490, lng: 101.7129 },
    { name: 'Chinatown (Petaling Street)', address: 'Jalan Petaling, 50000 Kuala Lumpur', lat: 3.1439, lng: 101.6974 },
    { name: 'KL Tower', address: 'Jalan Puncak, 50250 Kuala Lumpur', lat: 3.1528, lng: 101.7033 },
    { name: 'Aquaria KLCC', address: 'Kuala Lumpur Convention Centre, 50088 Kuala Lumpur', lat: 3.1556, lng: 101.7122 },
    { name: 'National Museum', address: 'Jalan Damansara, 50566 Kuala Lumpur', lat: 3.1380, lng: 101.6869 },
    { name: 'Thean Hou Temple', address: '65, Persiaran Endah, 50460 Kuala Lumpur', lat: 3.1200, lng: 101.6900 },
    { name: 'Perdana Botanical Gardens', address: 'Jalan Kebun Bunga, 55100 Kuala Lumpur', lat: 3.1478, lng: 101.6869 },
    { name: 'Islamic Arts Museum', address: 'Jalan Lembah Perdana, 50480 Kuala Lumpur', lat: 3.1419, lng: 101.6889 },
    { name: 'Times Square KL', address: '1, Jalan Imbi, 55100 Kuala Lumpur', lat: 3.1439, lng: 101.7100 },
    { name: 'Lot 10', address: '50, Jalan Sultan Ismail, 50250 Kuala Lumpur', lat: 3.1490, lng: 101.7100 },
    { name: 'Fahrenheit 88', address: '179, Jalan Bukit Bintang, 55100 Kuala Lumpur', lat: 3.1490, lng: 101.7129 },
    { name: 'Berjaya Times Square', address: '1, Jalan Imbi, 55100 Kuala Lumpur', lat: 3.1439, lng: 101.7100 },
    { name: 'Ampang Park', address: 'Jalan Ampang, 50450 Kuala Lumpur', lat: 3.1600, lng: 101.7200 },
    { name: 'Bangsar Shopping Centre', address: '285, Jalan Maarof, 59000 Kuala Lumpur', lat: 3.1600, lng: 101.6700 },
    { name: 'The Gardens Mall', address: 'Mid Valley City, 59200 Kuala Lumpur', lat: 3.1180, lng: 101.6769 },
    { name: 'IOI City Mall', address: 'IOI Resort City, 62502 Putrajaya', lat: 2.9300, lng: 101.6800 },
    { name: 'Aeon Mall Taman Maluri', address: 'Jalan Jejaka, Taman Maluri, 55100 Kuala Lumpur', lat: 3.1300, lng: 101.7200 }
];

function initializeMap() {
    const mapContainer = document.getElementById('interactiveMap');
    if (!mapContainer || map) return;
    
    try {
        map = L.map('interactiveMap').setView([3.1390, 101.6869], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Make map clickable
        map.on('click', function(e) {
            if (currentLocationType) {
                setLocationOnMap(e.latlng.lat, e.latlng.lng, currentLocationType);
            }
        });
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function openRideBooking() {
    const modal = document.getElementById('rideBookingModal');
    if (modal) {
        modal.classList.add('active');
        pickupLocation = null;
        destinationLocation = null;
        pickupMarker = null;
        destinationMarker = null;
        currentLocationType = null;
        
        // Initialize map after modal is shown
        setTimeout(() => {
            initializeMap();
            updateRideButton();
        }, 100);
    }
}

function closeRideBooking() {
    const modal = document.getElementById('rideBookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
    // Clear suggestions
    hideSuggestions('pickup');
    hideSuggestions('destination');
}

function pickLocationOnMap(type) {
    currentLocationType = type;
    const input = type === 'pickup' 
        ? document.getElementById('pickupLocation')
        : document.getElementById('destinationLocation');
    
    if (input) {
        input.placeholder = `Click on the map to select ${type === 'pickup' ? 'pickup' : 'destination'} location`;
    }
    
    if (map) {
        map.getContainer().style.cursor = 'crosshair';
    }
}

function setLocationOnMap(lat, lng, type) {
    if (!map) return;
    
    const markerIcon = L.divIcon({
        className: 'custom-marker ' + (type === 'pickup' ? 'pickup-marker' : 'destination-marker'),
        html: type === 'pickup' ? '📍' : '🎯',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
    
    if (type === 'pickup') {
        if (pickupMarker) {
            map.removeLayer(pickupMarker);
        }
        pickupMarker = L.marker([lat, lng], { 
            icon: markerIcon,
            draggable: true
        }).addTo(map);
        
        pickupMarker.on('dragend', function(e) {
            const pos = e.target.getLatLng();
            pickupLocation = { lat: pos.lat, lng: pos.lng };
            const input = document.getElementById('pickupLocation');
            if (input) {
                input.value = `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`;
            }
            updateRideButton();
        });
        
        pickupLocation = { lat, lng };
        
        const input = document.getElementById('pickupLocation');
        if (input && !input.value) {
            input.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    } else {
        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }
        destinationMarker = L.marker([lat, lng], { 
            icon: markerIcon,
            draggable: true
        }).addTo(map);
        
        destinationMarker.on('dragend', function(e) {
            const pos = e.target.getLatLng();
            destinationLocation = { lat: pos.lat, lng: pos.lng };
            const input = document.getElementById('destinationLocation');
            if (input) {
                input.value = `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`;
            }
            updateRideButton();
        });
        
        destinationLocation = { lat, lng };
        
        const input = document.getElementById('destinationLocation');
        if (input && !input.value) {
            input.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    }
    
    currentLocationType = null;
    if (map) {
        map.getContainer().style.cursor = '';
    }
    
    // Fit map to show both markers
    if (pickupLocation && destinationLocation && pickupMarker && destinationMarker) {
        const group = new L.featureGroup([pickupMarker, destinationMarker]);
        map.fitBounds(group.getBounds().pad(0.1));
    } else {
        map.setView([lat, lng], 15);
    }
    
    updateRideButton();
}

// Address Autocomplete Functions
function showSuggestions(inputId, query) {
    if (!query || query.length < 2) {
        hideSuggestions(inputId === 'pickupLocation' ? 'pickup' : 'destination');
        return;
    }
    
    const suggestions = malaysianAddresses.filter(addr => 
        addr.name.toLowerCase().includes(query.toLowerCase()) ||
        addr.address.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    const suggestionsEl = inputId === 'pickupLocation' 
        ? document.getElementById('pickupSuggestions')
        : document.getElementById('destinationSuggestions');
    
    if (suggestionsEl) {
        if (suggestions.length > 0) {
            suggestionsEl.innerHTML = suggestions.map((addr, index) => `
                <div class="autocomplete-item" data-index="${index}" onclick="selectAddress('${inputId}', ${addr.lat}, ${addr.lng}, '${addr.name}', '${addr.address.replace(/'/g, "\\'")}')">
                    <div class="autocomplete-item-name">${addr.name}</div>
                    <div class="autocomplete-item-address">${addr.address}</div>
                </div>
            `).join('');
            suggestionsEl.classList.add('active');
        } else {
            suggestionsEl.innerHTML = '<div class="autocomplete-item"><div class="autocomplete-item-name">No results found</div></div>';
            suggestionsEl.classList.add('active');
        }
    }
}

function hideSuggestions(type) {
    const suggestionsEl = type === 'pickup' 
        ? document.getElementById('pickupSuggestions')
        : document.getElementById('destinationSuggestions');
    
    if (suggestionsEl) {
        suggestionsEl.classList.remove('active');
    }
}

function selectAddress(inputId, lat, lng, name, address) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = name;
    }
    
    const type = inputId === 'pickupLocation' ? 'pickup' : 'destination';
    hideSuggestions(type);
    
    // Set location on map
    setLocationOnMap(lat, lng, type);
    
    // Update input with the selected name
    if (input) {
        input.value = name;
    }
    
    updateRideButton();
}

// Setup autocomplete listeners
document.addEventListener('DOMContentLoaded', () => {
    const pickupInput = document.getElementById('pickupLocation');
    const destInput = document.getElementById('destinationLocation');
    
    if (pickupInput) {
        pickupInput.addEventListener('input', (e) => {
            showSuggestions('pickupLocation', e.target.value);
            updateRideButton();
        });
        
        pickupInput.addEventListener('blur', () => {
            setTimeout(() => hideSuggestions('pickup'), 200);
        });
        
        pickupInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const suggestions = document.getElementById('pickupSuggestions');
                const firstItem = suggestions?.querySelector('.autocomplete-item');
                if (firstItem) {
                    firstItem.click();
                }
            }
        });
    }
    
    if (destInput) {
        destInput.addEventListener('input', (e) => {
            showSuggestions('destinationLocation', e.target.value);
            updateRideButton();
        });
        
        destInput.addEventListener('blur', () => {
            setTimeout(() => hideSuggestions('destination'), 200);
        });
        
        destInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const suggestions = document.getElementById('destinationSuggestions');
                const firstItem = suggestions?.querySelector('.autocomplete-item');
                if (firstItem) {
                    firstItem.click();
                }
            }
        });
    }
});

function updateRideButton() {
    const btn = document.getElementById('confirmRideBtn');
    const pickupInput = document.getElementById('pickupLocation');
    const destInput = document.getElementById('destinationLocation');
    
    if (btn && pickupInput && destInput) {
        const hasPickup = pickupInput.value.trim().length > 0;
        const hasDestination = destInput.value.trim().length > 0;
        btn.disabled = !(hasPickup && hasDestination);
    }
}

function confirmRide() {
    const pickupInput = document.getElementById('pickupLocation');
    const destInput = document.getElementById('destinationLocation');
    
    if (pickupInput && destInput && pickupInput.value && destInput.value) {
        closeRideBooking();
        openDriverMatching();
    } else {
        alert('Please select both pickup and destination locations');
    }
}

// Driver Matching Functions
function openDriverMatching() {
    const modal = document.getElementById('driverMatchingModal');
    if (modal) {
        modal.classList.add('active');
        startDriverMatching();
    }
}

function closeDriverMatching() {
    const modal = document.getElementById('driverMatchingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function startDriverMatching() {
    const matchingText = document.getElementById('matchingText');
    const driverInfo = document.getElementById('driverInfo');
    
    if (driverInfo) driverInfo.style.display = 'none';
    
    const messages = [
        'Searching nearby drivers...',
        'Finding the best match...',
        'Connecting to driver...',
        'Driver found!'
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
        if (matchingText && messageIndex < messages.length - 1) {
            matchingText.textContent = messages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(interval);
            if (matchingText) matchingText.textContent = messages[messages.length - 1];
            
            setTimeout(() => {
                if (driverInfo) {
                    driverInfo.style.display = 'block';
                    const drivers = [
                        { name: 'Ahmad Rahman', car: 'Toyota Vios • ABC 1234', eta: '3 minutes', rating: 4.9 },
                        { name: 'Lim Wei Ming', car: 'Honda City • XYZ 5678', eta: '5 minutes', rating: 4.8 },
                        { name: 'Siti Nurhaliza', car: 'Perodua Myvi • DEF 9012', eta: '4 minutes', rating: 4.9 }
                    ];
                    const driver = drivers[Math.floor(Math.random() * drivers.length)];
                    
                    document.getElementById('driverName').textContent = driver.name;
                    document.getElementById('driverCar').textContent = driver.car;
                    document.getElementById('driverETA').textContent = driver.eta;
                }
            }, 2000);
        }
    }, 1500);
}

// Food Ordering Functions
let currentRestaurant = null;
let cart = [];

const menuItems = {
    'Burger Barn': [
        { name: 'Classic Burger', desc: 'Beef patty, lettuce, tomato, cheese', price: 15.90, image: '../src/assets/food-burger.jpg' },
        { name: 'Cheese Burger', desc: 'Double cheese, special sauce', price: 18.90, image: '../src/assets/food-burger.jpg' },
        { name: 'Chicken Burger', desc: 'Crispy chicken, mayo, pickles', price: 16.90, image: '../src/assets/food-burger.jpg' }
    ],
    'Noodle House': [
        { name: 'Ramen Bowl', desc: 'Pork broth, chashu, egg', price: 22.90, image: '../src/assets/food-noodles.jpg' },
        { name: 'Udon Soup', desc: 'Hot udon noodles in broth', price: 18.90, image: '../src/assets/food-noodles.jpg' },
        { name: 'Stir Fry Noodles', desc: 'Wok-fried with vegetables', price: 16.90, image: '../src/assets/food-noodles.jpg' }
    ],
    'Pizza Paradise': [
        { name: 'Margherita', desc: 'Tomato, mozzarella, basil', price: 24.90, image: '../src/assets/food-pizza.jpg' },
        { name: 'Pepperoni', desc: 'Pepperoni, cheese, tomato sauce', price: 28.90, image: '../src/assets/food-pizza.jpg' },
        { name: 'Hawaiian', desc: 'Ham, pineapple, cheese', price: 26.90, image: '../src/assets/food-pizza.jpg' }
    ],
    'Rice Bowl Express': [
        { name: 'Chicken Rice Bowl', desc: 'Grilled chicken, rice, vegetables', price: 14.90, image: '../src/assets/food-rice.jpg' },
        { name: 'Beef Rice Bowl', desc: 'Tender beef, rice, sauce', price: 18.90, image: '../src/assets/food-rice.jpg' },
        { name: 'Vegetable Rice Bowl', desc: 'Mixed vegetables, rice', price: 12.90, image: '../src/assets/food-rice.jpg' }
    ],
    'Green Kitchen': [
        { name: 'Caesar Salad', desc: 'Fresh greens, croutons, dressing', price: 16.90, image: '../src/assets/food-healthy.jpg' },
        { name: 'Quinoa Bowl', desc: 'Quinoa, vegetables, tahini', price: 18.90, image: '../src/assets/food-healthy.jpg' },
        { name: 'Smoothie Bowl', desc: 'Acai, fruits, granola', price: 15.90, image: '../src/assets/food-healthy.jpg' }
    ],
    'Boba Station': [
        { name: 'Classic Milk Tea', desc: 'Black tea, milk, pearls', price: 8.90, image: '../src/assets/food-drinks.jpg' },
        { name: 'Taro Milk Tea', desc: 'Taro flavor, milk, pearls', price: 9.90, image: '../src/assets/food-drinks.jpg' },
        { name: 'Fruit Tea', desc: 'Fresh fruits, tea base', price: 10.90, image: '../src/assets/food-drinks.jpg' }
    ]
};

function openFoodOrder(restaurantName) {
    currentRestaurant = restaurantName;
    cart = [];
    const modal = document.getElementById('foodOrderModal');
    const restaurantNameEl = document.getElementById('restaurantName');
    const menuItemsEl = document.getElementById('menuItems');
    
    if (modal) {
        modal.classList.add('active');
        if (restaurantNameEl) restaurantNameEl.textContent = restaurantName;
        
        if (menuItemsEl && menuItems[restaurantName]) {
            menuItemsEl.innerHTML = menuItems[restaurantName].map((item, index) => `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                    <div class="menu-item-info">
                        <h4 class="menu-item-name">${item.name}</h4>
                        <p class="menu-item-desc">${item.desc}</p>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">RM ${item.price.toFixed(2)}</span>
                            <div class="menu-item-actions">
                                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                                <span class="quantity-display" id="qty-${index}">0</span>
                                <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        updateCart();
    }
}

function closeFoodOrder() {
    const modal = document.getElementById('foodOrderModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function increaseQuantity(index) {
    if (!currentRestaurant || !menuItems[currentRestaurant]) return;
    const item = menuItems[currentRestaurant][index];
    const existingItem = cart.find(c => c.name === item.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateQuantityDisplay(index);
    updateCart();
}

function decreaseQuantity(index) {
    if (!currentRestaurant || !menuItems[currentRestaurant]) return;
    const item = menuItems[currentRestaurant][index];
    const existingItem = cart.find(c => c.name === item.name);
    
    if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
            cart = cart.filter(c => c.name !== item.name);
        }
    }
    
    updateQuantityDisplay(index);
    updateCart();
}

function updateQuantityDisplay(index) {
    if (!currentRestaurant || !menuItems[currentRestaurant]) return;
    const item = menuItems[currentRestaurant][index];
    const existingItem = cart.find(c => c.name === item.name);
    const qtyEl = document.getElementById(`qty-${index}`);
    if (qtyEl) {
        qtyEl.textContent = existingItem ? existingItem.quantity : 0;
    }
}

function updateCart() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartItemsList) {
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItemsList.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-details">Qty: ${item.quantity} × RM ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-price">RM ${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `).join('');
        }
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 3.00;
    const total = subtotal + deliveryFee;
    
    if (cartSubtotal) cartSubtotal.textContent = `RM ${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `RM ${total.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) return;
    
    const modal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (modal) {
        closeFoodOrder();
        modal.classList.add('active');
        
        if (checkoutItems) {
            checkoutItems.innerHTML = cart.map(item => `
                <div class="order-item">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + 3.00;
        
        if (checkoutSubtotal) checkoutSubtotal.textContent = `RM ${subtotal.toFixed(2)}`;
        if (checkoutTotal) checkoutTotal.textContent = `RM ${total.toFixed(2)}`;
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function placeOrder() {
    const address = document.getElementById('deliveryAddress');
    if (!address || !address.value.trim()) {
        alert('Please enter a delivery address');
        return;
    }
    
    closeCheckout();
    openOrderConfirm();
}

// Order Confirmation
function openOrderConfirm() {
    const modal = document.getElementById('orderConfirmModal');
    const orderId = document.getElementById('orderId');
    
    if (modal) {
        modal.classList.add('active');
        if (orderId) {
            orderId.textContent = 'GRAB-' + Math.floor(Math.random() * 1000000);
        }
        cart = [];
    }
}

function closeOrderConfirm() {
    const modal = document.getElementById('orderConfirmModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Make functions available globally
window.handleRestaurantClick = handleRestaurantClick;
window.copyPromoCode = copyPromoCode;
window.openRideBooking = openRideBooking;
window.closeRideBooking = closeRideBooking;
window.pickLocationOnMap = pickLocationOnMap;
window.confirmRide = confirmRide;
window.selectAddress = selectAddress;
window.closeDriverMatching = closeDriverMatching;
window.openFoodOrder = openFoodOrder;
window.closeFoodOrder = closeFoodOrder;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.placeOrder = placeOrder;
window.closeOrderConfirm = closeOrderConfirm;

