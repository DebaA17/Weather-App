
# Weather App

A modern, responsive weather application deployed on Netlify using serverless functions for secure API key handling. Features a beautiful UI with glassmorphism effects, animations, and real-time weather data.

## Features

- 🌤️ Real-time weather data from WeatherAPI.com
- 🎨 Modern glassmorphism UI with gradient backgrounds
- 📱 Fully responsive design for desktop and mobile
- ✨ Smooth animations and hover effects
- 🔒 Secure API key handling via Netlify environment variables
- 🚀 Loading states and error handling
- ⌨️ Keyboard support (Enter key to search)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Netlify Functions (Node.js)
- **API**: WeatherAPI.com
- **Security**: Netlify environment variables

## Deployment (Netlify)

1. Clone the repository:
   ```bash
   git clone https://github.com/DebaA17/Weather-App.git
   cd Weather-App
   ```

2. Push your code to a Git provider (GitHub, GitLab, etc.).

3. Go to [Netlify](https://app.netlify.com/) and create a new site from your repository.

4. Set the **Publish directory** to `public`.

5. Add your API key in Netlify:
   - Go to Site settings > Environment variables
   - Add `WEATHER_API_KEY=your_api_key_here`

6. The weather API logic is in `netlify/functions/weather.js`.
   - The frontend calls `/.netlify/functions/weather?city=YourCity`

7. Netlify will auto-deploy on push. Visit your site and enjoy!

## Project Structure

```
weather-app/
├── netlify/
│   └── functions/
│       └── weather.js      # Netlify serverless function (API proxy)
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

## License

This project is open source and available under the [MIT License](LICENSE).
