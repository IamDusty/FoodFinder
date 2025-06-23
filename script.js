class FoodFinder {
    constructor() {
        this.userLocation = null;
        this.favorites = JSON.parse(localStorage.getItem('foodfinder-favorites') || '[]');
        this.currentRestaurants = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFavoritesCount();
        this.loadSavedLocation();
    }

    bindEvents() {
        // Main buttons
        document.getElementById('findRestaurantsBtn').addEventListener('click', () => this.findRestaurants());
        document.getElementById('refreshAllBtn').addEventListener('click', () => this.refreshAllRestaurants());
        
        // Header buttons
        document.getElementById('favoritesBtn').addEventListener('click', () => this.showFavorites());
        document.getElementById('locationBtn').addEventListener('click', () => this.showLocationModal());
        
        // Modal events
        document.getElementById('closeFavoritesModal').addEventListener('click', () => this.closeFavoritesModal());
        document.getElementById('closeLocationModal').addEventListener('click', () => this.closeLocationModal());
        
        // Location events
        document.getElementById('useCurrentLocation').addEventListener('click', () => this.getCurrentLocation());
        document.getElementById('setManualLocation').addEventListener('click', () => this.setManualLocation());
        document.getElementById('manualLocation').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.setManualLocation();
        });
        
        // Modal backdrop clicks
        document.getElementById('favoritesModal').addEventListener('click', (e) => {
            if (e.target.id === 'favoritesModal') this.closeFavoritesModal();
        });
        document.getElementById('locationModal').addEventListener('click', (e) => {
            if (e.target.id === 'locationModal') this.closeLocationModal();
        });
    }

    loadSavedLocation() {
        const savedLocation = localStorage.getItem('foodfinder-location');
        if (savedLocation) {
            this.userLocation = JSON.parse(savedLocation);
            this.updateLocationDisplay();
        }
    }

    async getCurrentLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                });
            });

            this.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                name: 'Current Location'
            };

            localStorage.setItem('foodfinder-location', JSON.stringify(this.userLocation));
            this.updateLocationDisplay();
            this.closeLocationModal();
            this.showNotification('Location updated successfully!', 'success');
        } catch (error) {
            console.error('Error getting location:', error);
            this.showNotification('Unable to get your location. Please enter it manually.', 'error');
        }
    }

    setManualLocation() {
        const locationInput = document.getElementById('manualLocation');
        const location = locationInput.value.trim();
        
        if (!location) {
            this.showNotification('Please enter a location', 'error');
            return;
        }

        // For demo purposes, we'll use a mock geocoding
        this.userLocation = {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1, // Simulate NYC area
            lng: -74.0060 + (Math.random() - 0.5) * 0.1,
            name: location
        };

        localStorage.setItem('foodfinder-location', JSON.stringify(this.userLocation));
        this.updateLocationDisplay();
        this.closeLocationModal();
        locationInput.value = '';
        this.showNotification('Location updated successfully!', 'success');
    }

    updateLocationDisplay() {
        const display = document.getElementById('currentLocationDisplay');
        if (this.userLocation) {
            display.innerHTML = `
                <i class="fas fa-map-marker-alt"></i>
                <span>${this.userLocation.name}</span>
            `;
        }
    }

    async findRestaurants() {
        if (!this.userLocation) {
            this.showLocationModal();
            return;
        }

        this.showSection('loadingSection');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.currentRestaurants = this.generateMockRestaurants(3);
        this.displayRestaurants();
        this.showSection('restaurantsSection');
    }

    async refreshAllRestaurants() {
        const refreshBtn = document.getElementById('refreshAllBtn');
        const originalText = refreshBtn.innerHTML;
        
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        refreshBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.currentRestaurants = this.generateMockRestaurants(3);
        this.displayRestaurants();
        
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        this.showNotification('New restaurants loaded!', 'success');
    }

    generateMockRestaurants(count) {
        const restaurantData = [
            {
                name: 'Osteria Francescana',
                cuisine: 'Italian',
                city: 'Modena, Italy',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop&auto=format',
                placeName: 'Osteria Francescana Modena Italy'
            },
            {
                name: 'Eleven Madison Park',
                cuisine: 'American',
                city: 'New York, NY',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
                placeName: 'Eleven Madison Park New York'
            },
            {
                name: 'Sukiyabashi Jiro',
                cuisine: 'Japanese',
                city: 'Tokyo, Japan',
                image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop&auto=format',
                placeName: 'Sukiyabashi Jiro Tokyo Japan'
            },
            {
                name: 'El Celler de Can Roca',
                cuisine: 'Spanish',
                city: 'Girona, Spain',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=250&fit=crop&auto=format',
                placeName: 'El Celler de Can Roca Girona Spain'
            },
            {
                name: 'Gaggan',
                cuisine: 'Indian',
                city: 'Bangkok, Thailand',
                image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=250&fit=crop&auto=format',
                placeName: 'Gaggan Bangkok Thailand'
            },
            {
                name: 'Central',
                cuisine: 'Peruvian',
                city: 'Lima, Peru',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop&auto=format',
                placeName: 'Central Restaurant Lima Peru'
            },
            {
                name: 'Noma',
                cuisine: 'Nordic',
                city: 'Copenhagen, Denmark',
                image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop&auto=format',
                placeName: 'Noma Copenhagen Denmark'
            },
            {
                name: 'Le Bernardin',
                cuisine: 'French',
                city: 'New York, NY',
                image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop&auto=format',
                placeName: 'Le Bernardin New York'
            },
            {
                name: 'Pujol',
                cuisine: 'Mexican',
                city: 'Mexico City, Mexico',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format',
                placeName: 'Pujol Mexico City Mexico'
            },
            {
                name: 'White Rabbit',
                cuisine: 'Russian',
                city: 'Moscow, Russia',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=250&fit=crop&auto=format',
                placeName: 'White Rabbit Moscow Russia'
            },
            {
                name: 'Maido',
                cuisine: 'Japanese-Peruvian',
                city: 'Lima, Peru',
                image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop&auto=format',
                placeName: 'Maido Lima Peru'
            },
            {
                name: 'Attica',
                cuisine: 'Australian',
                city: 'Melbourne, Australia',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
                placeName: 'Attica Melbourne Australia'
            },
            {
                name: 'Blue Hill at Stone Barns',
                cuisine: 'Farm-to-Table',
                city: 'Pocantico Hills, NY',
                image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop&auto=format',
                placeName: 'Blue Hill Stone Barns Pocantico Hills'
            },
            {
                name: 'Arpège',
                cuisine: 'French',
                city: 'Paris, France',
                image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop&auto=format',
                placeName: 'Arpège Paris France'
            },
            {
                name: 'Quintonil',
                cuisine: 'Mexican',
                city: 'Mexico City, Mexico',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format',
                placeName: 'Quintonil Mexico City Mexico'
            },
            {
                name: 'The French Laundry',
                cuisine: 'American',
                city: 'Yountville, CA',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
                placeName: 'French Laundry Yountville California'
            },
            {
                name: 'Disfrutar',
                cuisine: 'Spanish',
                city: 'Barcelona, Spain',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=250&fit=crop&auto=format',
                placeName: 'Disfrutar Barcelona Spain'
            },
            {
                name: 'Alain Ducasse au Plaza Athénée',
                cuisine: 'French',
                city: 'Paris, France',
                image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop&auto=format',
                placeName: 'Alain Ducasse Plaza Athénée Paris'
            },
            {
                name: 'Don Julio',
                cuisine: 'Argentinian',
                city: 'Buenos Aires, Argentina',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop&auto=format',
                placeName: 'Don Julio Buenos Aires Argentina'
            },
            {
                name: 'Lyle\'s',
                cuisine: 'British',
                city: 'London, UK',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
                placeName: 'Lyles London UK'
            }
        ];
        
        // Shuffle the array and take the requested count
        const shuffled = restaurantData.sort(() => 0.5 - Math.random());
        const selectedRestaurants = shuffled.slice(0, count);
        
        const restaurants = selectedRestaurants.map((data, i) => {
            const rating = (3.5 + Math.random() * 1.5).toFixed(1);
            const price = '

    getCuisineIcon(cuisine) {
        const icons = {
            'Italian': '🍝',
            'Mexican': '🌮',
            'Chinese': '🥡',
            'Japanese': '🍣',
            'American': '🍔',
            'Thai': '🍜',
            'Indian': '🍛',
            'Mediterranean': '🥙',
            'French': '🥐',
            'Korean': '🍲',
            'Spanish': '🥘',
            'Peruvian': '🌶️',
            'Nordic': '🐟',
            'Russian': '🥟',
            'Japanese-Peruvian': '🍱',
            'Australian': '🦘',
            'Farm-to-Table': '🌱',
            'Argentinian': '🥩',
            'British': '☕'
        };
        return icons[cuisine] || '🍽️';
    }

    generateGoogleMapsUrl(placeName, city) {
        const query = encodeURIComponent(`${placeName} ${city}`);
        return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }

    displayRestaurants() {
        const grid = document.getElementById('restaurantGrid');
        grid.innerHTML = '';
        
        this.currentRestaurants.forEach((restaurant, index) => {
            const card = this.createRestaurantCard(restaurant, index);
            grid.appendChild(card);
        });
    }

    createRestaurantCard(restaurant, index) {
        const isFavorite = this.favorites.some(fav => fav.id === restaurant.id);
        
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="restaurant-image" style="background-image: url('${restaurant.image}')">
                <div class="restaurant-overlay">
                    <span class="restaurant-icon">${restaurant.icon}</span>
                </div>
            </div>
            <div class="restaurant-content">
                <div class="restaurant-header">
                    <div>
                        <h3 class="restaurant-name">
                            <a href="${restaurant.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="restaurant-link">
                                ${restaurant.name}
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </h3>
                        <p class="restaurant-cuisine">${restaurant.cuisine} • ${restaurant.city}</p>
                    </div>
                    <div class="restaurant-actions">
                        <button class="btn-icon btn-favorite ${isFavorite ? 'active' : ''}" 
                                onclick="foodFinder.toggleFavorite(${restaurant.id})"
                                title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn-icon btn-remove" 
                                onclick="foodFinder.removeRestaurant(${restaurant.id})"
                                title="Remove this restaurant">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="restaurant-details">
                    <div class="detail-item">
                        <i class="fas fa-star"></i>
                        <div class="restaurant-rating">
                            <div class="stars">${this.generateStars(restaurant.rating)}</div>
                            <span class="rating-text">(${restaurant.rating})</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${restaurant.price}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-location-dot"></i>
                        <span>${restaurant.distance}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${restaurant.time}</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star"></i>';
        }
        
        return stars;
    }

    toggleFavorite(restaurantId) {
        const restaurant = this.currentRestaurants.find(r => r.id === restaurantId);
        if (!restaurant) return;
        
        const existingIndex = this.favorites.findIndex(fav => fav.id === restaurantId);
        
        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
            this.showNotification('Removed from favorites', 'info');
        } else {
            this.favorites.push(restaurant);
            this.showNotification('Added to favorites!', 'success');
        }
        
        localStorage.setItem('foodfinder-favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
        this.displayRestaurants(); // Refresh to update heart icon
        
        // Update favorites modal if it's open
        if (document.getElementById('favoritesModal').classList.contains('active')) {
            this.displayFavorites();
        }
    }

    async removeRestaurant(restaurantId) {
        const card = event.target.closest('.restaurant-card');
        card.style.transform = 'scale(0.9)';
        card.style.opacity = '0.5';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        this.currentRestaurants = this.currentRestaurants.filter(r => r.id !== restaurantId);
        
        // Generate a new restaurant to replace the removed one
        const newRestaurant = this.generateMockRestaurants(1)[0];
        this.currentRestaurants.push(newRestaurant);
        
        this.displayRestaurants();
        this.showNotification('Restaurant removed! Here\'s a new suggestion.', 'info');
    }

    updateFavoritesCount() {
        document.getElementById('favoritesCount').textContent = this.favorites.length;
    }

    showFavorites() {
        this.displayFavorites();
        document.getElementById('favoritesModal').classList.add('active');
    }

    displayFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No favorites yet! Start adding restaurants you love.</p>
                </div>
            `;
            return;
        }
        
        favoritesList.innerHTML = this.favorites.map(restaurant => `
            <div class="favorite-item">
                <div class="favorite-image" style="background-image: url('${restaurant.image}')"></div>
                <div class="favorite-info">
                    <h4>
                        <a href="${restaurant.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="restaurant-link">
                            ${restaurant.icon} ${restaurant.name}
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </h4>
                    <p>${restaurant.cuisine} • ${restaurant.city}</p>
                    <p>${restaurant.rating} ⭐ • ${restaurant.price} • ${restaurant.distance}</p>
                </div>
                <button class="btn btn-danger" onclick="foodFinder.removeFavorite(${restaurant.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    removeFavorite(restaurantId) {
        this.favorites = this.favorites.filter(fav => fav.id !== restaurantId);
        localStorage.setItem('foodfinder-favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
        this.displayFavorites();
        this.displayRestaurants(); // Refresh to update heart icons
        this.showNotification('Removed from favorites', 'info');
    }

    closeFavoritesModal() {
        document.getElementById('favoritesModal').classList.remove('active');
    }

    showLocationModal() {
        document.getElementById('locationModal').classList.add('active');
    }

    closeLocationModal() {
        document.getElementById('locationModal').classList.remove('active');
    }

    showSection(sectionId) {
        // Hide all sections
        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('restaurantsSection').style.display = 'none';
        
        // Show the requested section
        document.getElementById(sectionId).style.display = 'block';
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e17055' : '#74b9ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 0.875rem;
            font-weight: 500;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.foodFinder = new FoodFinder();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}.repeat(Math.floor(Math.random() * 4) + 1);
            const distance = (0.2 + Math.random() * 2.8).toFixed(1);
            const time = Math.floor(5 + Math.random() * 25);
            
            return {
                id: Date.now() + i,
                name: data.name,
                cuisine: data.cuisine,
                city: data.city,
                image: data.image,
                placeName: data.placeName,
                rating: parseFloat(rating),
                price: price,
                distance: `${distance} mi`,
                time: `${time} min`,
                icon: this.getCuisineIcon(data.cuisine),
                googleMapsUrl: this.generateGoogleMapsUrl(data.placeName, data.city)
            };
        });
        
        return restaurants;
    }

    getCuisineIcon(cuisine) {
        const icons = {
            'Italian': '🍝',
            'Mexican': '🌮',
            'Chinese': '🥡',
            'Japanese': '🍣',
            'American': '🍔',
            'Thai': '🍜',
            'Indian': '🍛',
            'Mediterranean': '🥙',
            'French': '🥐',
            'Korean': '🍲'
        };
        return icons[cuisine] || '🍽️';
    }

    displayRestaurants() {
        const grid = document.getElementById('restaurantGrid');
        grid.innerHTML = '';
        
        this.currentRestaurants.forEach((restaurant, index) => {
            const card = this.createRestaurantCard(restaurant, index);
            grid.appendChild(card);
        });
    }

    createRestaurantCard(restaurant, index) {
        const isFavorite = this.favorites.some(fav => fav.id === restaurant.id);
        
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="restaurant-image">
                <span style="font-size: 4rem;">${restaurant.icon}</span>
            </div>
            <div class="restaurant-content">
                <div class="restaurant-header">
                    <div>
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                    </div>
                    <div class="restaurant-actions">
                        <button class="btn-icon btn-favorite ${isFavorite ? 'active' : ''}" 
                                onclick="foodFinder.toggleFavorite(${restaurant.id})"
                                title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn-icon btn-remove" 
                                onclick="foodFinder.removeRestaurant(${restaurant.id})"
                                title="Remove this restaurant">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="restaurant-details">
                    <div class="detail-item">
                        <i class="fas fa-star"></i>
                        <div class="restaurant-rating">
                            <div class="stars">${this.generateStars(restaurant.rating)}</div>
                            <span class="rating-text">(${restaurant.rating})</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${restaurant.price}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-location-dot"></i>
                        <span>${restaurant.distance}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${restaurant.time}</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star"></i>';
        }
        
        return stars;
    }

    toggleFavorite(restaurantId) {
        const restaurant = this.currentRestaurants.find(r => r.id === restaurantId);
        if (!restaurant) return;
        
        const existingIndex = this.favorites.findIndex(fav => fav.id === restaurantId);
        
        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
            this.showNotification('Removed from favorites', 'info');
        } else {
            this.favorites.push(restaurant);
            this.showNotification('Added to favorites!', 'success');
        }
        
        localStorage.setItem('foodfinder-favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
        this.displayRestaurants(); // Refresh to update heart icon
        
        // Update favorites modal if it's open
        if (document.getElementById('favoritesModal').classList.contains('active')) {
            this.displayFavorites();
        }
    }

    async removeRestaurant(restaurantId) {
        const card = event.target.closest('.restaurant-card');
        card.style.transform = 'scale(0.9)';
        card.style.opacity = '0.5';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        this.currentRestaurants = this.currentRestaurants.filter(r => r.id !== restaurantId);
        
        // Generate a new restaurant to replace the removed one
        const newRestaurant = this.generateMockRestaurants(1)[0];
        this.currentRestaurants.push(newRestaurant);
        
        this.displayRestaurants();
        this.showNotification('Restaurant removed! Here\'s a new suggestion.', 'info');
    }

    updateFavoritesCount() {
        document.getElementById('favoritesCount').textContent = this.favorites.length;
    }

    showFavorites() {
        this.displayFavorites();
        document.getElementById('favoritesModal').classList.add('active');
    }

    displayFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No favorites yet! Start adding restaurants you love.</p>
                </div>
            `;
            return;
        }
        
        favoritesList.innerHTML = this.favorites.map(restaurant => `
            <div class="favorite-item">
                <div class="favorite-info">
                    <h4>${restaurant.icon} ${restaurant.name}</h4>
                    <p>${restaurant.cuisine} • ${restaurant.rating} ⭐ • ${restaurant.price} • ${restaurant.distance}</p>
                </div>
                <button class="btn btn-danger" onclick="foodFinder.removeFavorite(${restaurant.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    removeFavorite(restaurantId) {
        this.favorites = this.favorites.filter(fav => fav.id !== restaurantId);
        localStorage.setItem('foodfinder-favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
        this.displayFavorites();
        this.displayRestaurants(); // Refresh to update heart icons
        this.showNotification('Removed from favorites', 'info');
    }

    closeFavoritesModal() {
        document.getElementById('favoritesModal').classList.remove('active');
    }

    showLocationModal() {
        document.getElementById('locationModal').classList.add('active');
    }

    closeLocationModal() {
        document.getElementById('locationModal').classList.remove('active');
    }

    showSection(sectionId) {
        // Hide all sections
        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('restaurantsSection').style.display = 'none';
        
        // Show the requested section
        document.getElementById(sectionId).style.display = 'block';
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e17055' : '#74b9ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 0.875rem;
            font-weight: 500;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.foodFinder = new FoodFinder();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}