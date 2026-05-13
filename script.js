const apiKey = "8ff02e43e03724f30725e78dc1692cc6";

const searchBtn = document.getElementById("search-btn");

const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const weatherIcon = document.getElementById("weather-icon");

const weatherCard = document.querySelector(".weather-card");

const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  errorMessage.textContent = "";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    cityName.textContent = data.name;

    temperature.textContent = `Temperature: ${data.main.temp}°C`;

    description.textContent = `Weather: ${data.weather[0].description}`;

    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.style.display = "flex";
  } catch (error) {
    errorMessage.textContent = error.message;

    weatherCard.style.display = "none";
  }
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
