# Weather App

A modern, responsive weather application built with Node.js and Express. Features a beautiful UI with glassmorphism effects, animations, and secure API key handling.

## Features

- 🌤️ Real-time weather data from WeatherAPI.com
- 🎨 Modern glassmorphism UI with gradient backgrounds
- 📱 Fully responsive design for desktop and mobile
- ✨ Smooth animations and hover effects
- 🔒 Secure API key handling with environment variables
- 🚀 Loading states and error handling
- ⌨️ Keyboard support (Enter key to search)

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: WeatherAPI.com
- **Security**: Environment variables with dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your API key from [WeatherAPI.com](https://www.weatherapi.com/)

4. Create a `.env` file in the root directory:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## API Key Security

The weather API key is stored securely using environment variables:
- The `.env` file contains the API key
- The file is listed in `.gitignore` to prevent it from being committed
- The server acts as a proxy, keeping the API key hidden from the frontend

## Project Structure

```
weather-app/
├── .env                 # Environment variables (not committed)
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── server.js           # Express server
├── README.md           # This file
└── public/
    ├── index.html      # Main HTML file
    ├── styles.css      # CSS with modern animations
    └── script.js       # Frontend JavaScript
```

## Features in Detail

### Modern UI Design
- Glassmorphism effects with backdrop-filter
- Gradient backgrounds with animated elements
- Responsive design that works on all devices
- Smooth transitions and hover effects

### Security
- API key stored in environment variables
- Server-side proxy to hide API key from frontend
- Input validation and error handling

### User Experience
- Loading animations during API calls
- Keyboard shortcuts (Enter to search)
- Clear error messages
- Smooth result animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
