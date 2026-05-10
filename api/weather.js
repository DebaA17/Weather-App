const https = require('https');

function sendJson(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(body)
  };
}

function transformWeatherData(apiData) {
  return {
    name: String(apiData.location.name).substring(0, 100),
    sys: { country: String(apiData.location.country).substring(0, 50) },
    main: {
      temp: Number(apiData.current.temp_c) || 0,
      feels_like: Number(apiData.current.feelslike_c) || 0,
      humidity: Number(apiData.current.humidity) || 0,
      pressure: Number(apiData.current.pressure_mb) || 0
    },
    weather: [{
      description: String(apiData.current.condition.text).substring(0, 100),
      icon: String(apiData.current.condition.icon).substring(0, 200)
    }],
    wind: {
      speed: Number(apiData.current.wind_kph) / 3.6 || 0
    }
  };
}

module.exports = async function(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const API_KEY = process.env.WEATHER_API_KEY;
  const city = req.query && req.query.city;

  if (!city) {
    res.status(400).json({ error: 'City is required.' });
    return;
  }

  if (!API_KEY) {
    res.status(500).json({ error: 'API key not configured.' });
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

  try {
    const apiData = await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });

    if (apiData.error) {
      res.status(400).json({ error: apiData.error.message });
      return;
    }

    res.status(200).json(transformWeatherData(apiData));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
};