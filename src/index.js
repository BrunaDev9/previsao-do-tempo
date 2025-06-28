document.querySelector('#search').addEventListener('submit', (event) => {
  event.preventDefault();

  const cityName = document.querySelector('#city_name').value.trim();

  if (!cityName) {
    alert("Você precisa digitar o nome de uma cidade...");
    return;
  }

  const apiKey = 'cf7cb34ad03ca65b961bad810fef004e';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      return response.json();
    })
    .then(data => {
      // Atualiza textos
      document.querySelector('#title').textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector('#temp_value').innerHTML = `${Math.round(data.main.temp)} <sup>C°</sup>`;
      document.querySelector('#temp_description').textContent = data.weather[0].description;
      document.querySelector('#temp_max').innerHTML = `${Math.round(data.main.temp_max)} <sup>C°</sup>`;
      document.querySelector('#temp_min').innerHTML = `${Math.round(data.main.temp_min)} <sup>C°</sup>`;
      document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
      document.querySelector('#wind').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

      // Weather Icons
      const iconCode = data.weather[0].icon;
      const iconElement = document.querySelector('#weather_icon');

      const iconMap = {
        "01d": "wi-day-sunny",
        "01n": "wi-night-clear",
        "02d": "wi-day-cloudy",
        "02n": "wi-night-alt-cloudy",
        "03d": "wi-cloud",
        "03n": "wi-cloud",
        "04d": "wi-cloudy",
        "04n": "wi-cloudy",
        "09d": "wi-showers",
        "09n": "wi-showers",
        "10d": "wi-day-rain",
        "10n": "wi-night-alt-rain",
        "11d": "wi-thunderstorm",
        "11n": "wi-thunderstorm",
        "13d": "wi-snow",
        "13n": "wi-snow",
        "50d": "wi-fog",
        "50n": "wi-fog"
      };

      const iconClass = iconMap[iconCode] || "wi-na";
      iconElement.className = `wi ${iconClass}`;
      iconElement.style.fontSize = "60px";
    })
    .catch(error => {
      alert("Erro: " + error.message);
    });
});
