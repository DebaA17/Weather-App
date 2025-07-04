require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('http');
const url = require('url');

const app = express();
const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'api.weatherapi.com';

// Add CORS and security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Trust proxy for correct IP detection
app.set('trust proxy', true);

app.use(express.static('public'));

function makeRequest(requestUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(requestUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    client.get(requestUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  // Input validation and sanitization
  if (typeof city !== 'string' || city.length > 50 || !/^[a-zA-Z\s\-',\.]+$/.test(city)) {
    return res.status(400).json({ error: 'Invalid city name format' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = `https://${BASE_URL}/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city.trim())}&aqi=no`;
    const data = await makeRequest(url);

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    // Sanitize response data to prevent XSS
    const transformedData = {
      name: String(data.location.name).substring(0, 100),
      sys: { country: String(data.location.country).substring(0, 50) },
      main: {
        temp: Number(data.current.temp_c) || 0,
        feels_like: Number(data.current.feelslike_c) || 0,
        humidity: Number(data.current.humidity) || 0,
        pressure: Number(data.current.pressure_mb) || 0
      },
      weather: [{
        description: String(data.current.condition.text).substring(0, 100),
        icon: String(data.current.condition.icon).substring(0, 200)
      }],
      wind: {
        speed: Number(data.current.wind_kph) / 3.6 || 0
      }
    };

    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${API_KEY ? 'Yes' : 'No'}`);
});
