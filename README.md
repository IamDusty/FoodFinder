# 🍽️ FoodFinder

**Discover Your Next Meal** - A modern, responsive web application that helps indecisive food lovers find great restaurants nearby.

## ✨ Features

- **Smart Restaurant Discovery**: Get 3 curated restaurant recommendations based on your location
- **Dynamic Filtering**: Remove restaurants you don't like and get instant new suggestions
- **Favorites System**: Save restaurants you love for quick access later
- **Geolocation Support**: Use your current location or manually set your preferred area
- **Responsive Design**: Beautiful, modern interface that works on all devices
- **Progressive Web App**: Install on your device for a native app experience
- **Offline Ready**: Basic functionality works even without internet connection

## 🚀 Live Demo

Visit the live application: [https://yourusername.github.io/FoodFinder](https://yourusername.github.io/FoodFinder)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and accessibility features
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - ES6+ features, async/await, and local storage
- **Service Worker** - PWA capabilities and offline functionality
- **Font Awesome** - Beautiful icons throughout the interface
- **Google Fonts** - Inter font family for modern typography

## 📱 Mobile-First Design

FoodFinder is built with a mobile-first approach, ensuring a great experience on:
- 📱 Mobile phones (320px and up)
- 📟 Tablets (768px and up)  
- 💻 Desktop computers (1024px and up)
- 🖥️ Large screens (1200px and up)

## 🎯 How It Works

1. **Set Your Location**: Allow geolocation access or manually enter your location
2. **Discover Restaurants**: Get 3 personalized restaurant recommendations
3. **Customize Your Feed**: Remove restaurants you don't like to get new suggestions
4. **Save Favorites**: Add restaurants to your favorites list for future reference
5. **Refresh Anytime**: Get completely new recommendations with one click

## 🔧 Installation & Setup

### For GitHub Pages Deployment:

1. **Fork or Clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Set source** to deploy from main branch
4. **Update the live demo link** in this README with your GitHub Pages URL

### For Local Development:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/FoodFinder.git
   cd FoodFinder
   ```

2. **Serve locally** (you can use any static server):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**: Navigate to `http://localhost:8000`

## 🎨 Customization

### Colors & Branding
Update the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #ff6b6b;    /* Main brand color */
    --secondary-color: #4ecdc4;  /* Secondary accent */
    --accent-color: #ffe66d;     /* Highlight color */
    /* ... other variables */
}
```

### Restaurant Data
Currently uses mock data. To integrate with real restaurant APIs:
1. Update the `generateMockRestaurants()` method in `script.js`
2. Integrate with services like:
   - Google Places API
   - Yelp Fusion API
   - Foursquare Places API
   - Zomato API

## 🌟 Future Enhancements

- [ ] **Real API Integration** - Connect to actual restaurant databases
- [ ] **Advanced Filtering** - Cuisine type, price range, dietary restrictions
- [ ] **Social Features** - Share favorites with friends
- [ ] **Reviews Integration** - Display user reviews and photos
- [ ] **Booking Integration** - Direct reservation links
- [ ] **Map View** - Interactive map showing restaurant locations
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Voice Search** - "Find me Italian food nearby"

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines:
- Follow existing code style and conventions
- Test on multiple devices and browsers
- Update documentation for new features
- Ensure accessibility standards are maintained

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icon set
- **Google Fonts** for the Inter font family
- **Unsplash** for inspiration on modern web design
- **The JavaScript community** for best practices and patterns

## 📞 Support

If you encounter any issues or have questions:
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/FoodFinder/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/FoodFinder/discussions)
- 📧 **Direct Contact**: [your-email@example.com]

---

**Made with ❤️ for food lovers who can't decide what to eat!**