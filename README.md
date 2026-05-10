
# Weather App

![Weather App Screenshot](weather.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ace9f86-9a42-4476-aea1-8f1706f2105f/deploy-status)](https://app.netlify.com/projects/debasisweather/deploys)

A modern, responsive weather application with secure API key handling and a glassmorphism UI. The app now supports Vercel deployment with a root `index.html` and a Vercel serverless API route.

## Features

- 🌤️ Real-time weather data from WeatherAPI.com
- 🎨 Modern glassmorphism UI with gradient backgrounds
- 📱 Fully responsive design for desktop and mobile
- ✨ Smooth animations and hover effects
- 🔒 Secure API key handling via  environment variables
- 🚀 Loading states and error handling
- ⌨️ Keyboard support (Enter key to search)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Serverless Functions (Node.js)
- **API**: WeatherAPI.com
- **Security**: environment variables


## Project Structure

```
weather-app/
├── api/
│   └── weather.js          serverless function (API proxy for Vercel)
├── netlify/
│   └── functions/
│       └── weather.js      legacy Netlify function
├── index.html              Vercel entry page
├── 404.html                custom 404 page
├── public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS with modern animations
│   └── script.js          # Frontend JavaScript
├── .env.example           # Example environment file
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
├── README.md              # This file
└── LICENSE                # License
```

## Features in Detail

### Modern UI Design
- Glassmorphism effects with backdrop-filter
- Gradient backgrounds with animated elements
- Responsive design that works on all devices
- Smooth transitions and hover effects

### Security
- API key stored in Netlify environment variables
- Serverless function proxy to hide API key from frontend
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

## Deploying To Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Add `WEATHER_API_KEY` in Vercel project settings.
4. Deploy with no custom build command.

The frontend calls `/api/weather`, so the deployed site must include the root `index.html` and the `api/weather.js` function.

## License

This project is open source and available under the [MIT License](LICENSE).

<a href="https://www.buymeacoffee.com/debasisbiswas" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
