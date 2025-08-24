const https = require('https');

exports.handler = async function(event) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const city = event.queryStringParameters.city;

  if (!city) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'City is required.' })
    };
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const apiData = JSON.parse(data);

          if (apiData.error) {
            resolve({
              statusCode: 400,
              headers: { 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify({ error: apiData.error.message })
            });
            return;
          }

          // Transform response to match frontend expectations
          const transformedData = {
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

          resolve({
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(transformedData)
          });
        } catch (error) {
          resolve({
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to parse weather data.' })
          });
        }
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Failed to fetch weather data.' })
      });
    });
  });
};
