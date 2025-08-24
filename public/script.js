function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.getElementById('getWeather').addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  const weatherResult = document.getElementById('weatherResult');
  const button = document.getElementById('getWeather');

  if (!city) {
    weatherResult.innerHTML = '<p style="color: #ff6b6b;">Please enter a city name.</p>';
    weatherResult.classList.add('show');
    return;
  }

  // Validate city input to prevent injection
  if (city.length > 50 || !/^[a-zA-Z\s\-',\.]+$/.test(city)) {
    weatherResult.innerHTML = '<p style="color: #ff6b6b;">Please enter a valid city name.</p>';
    weatherResult.classList.add('show');
    return;
  }

  button.innerHTML = '<span class="loading"></span> Loading...';
  button.disabled = true;
  weatherResult.classList.remove('show');

  try {
  const response = await fetch(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) {
      weatherResult.innerHTML = `<p style="color: #ff6b6b;">Error: ${escapeHtml(data.error)}</p>`;
    } else {
      weatherResult.innerHTML = `
        <div class="weather-card">
          <h2>${escapeHtml(data.name)}, ${escapeHtml(data.sys.country)}</h2>
          <div class="temperature">${Math.round(data.main.temp)}°C</div>
          <p style="text-transform: capitalize; font-weight: 600; color: #667eea;">${escapeHtml(data.weather[0].description)}</p>
          <p><strong>Feels like:</strong> ${Math.round(data.main.feels_like)}°C</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${Math.round(data.wind.speed * 100) / 100} m/s</p>
          <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        </div>
      `;
    }
    
    setTimeout(() => {
      weatherResult.classList.add('show');
    }, 100);
    
  } catch (error) {
    weatherResult.innerHTML = '<p style="color: #ff6b6b;">Failed to fetch weather data. Please try again later.</p>';
    weatherResult.classList.add('show');
  } finally {
    button.innerHTML = 'Get Weather';
    button.disabled = false;
  }
});

document.getElementById('city').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('getWeather').click();
  }
});
