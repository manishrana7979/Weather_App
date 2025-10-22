const apiKey = "792c9786015f157baef0cee59baa3579";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

async function checkWeather(city) {
    if (!city) return;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/h";
        weatherIcon.src = "img/clear.png";
        card.style.background = "linear-gradient(135deg, #ccc, #888)";
        document.body.style.background = "linear-gradient(135deg, #e0e0e0, #999)";
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clouds") {
        weatherIcon.src = "img/cloudy.png";
        card.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
        document.body.style.background = "linear-gradient(135deg, #e0eafc, #cfdef3)";
    } 
    else if (weatherMain === "Clear") {
        weatherIcon.src = "img/clear.png";
        card.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
        document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
    } 
    else if (weatherMain === "Rain") {
        weatherIcon.src = "img/rain.png";
        card.style.background = "linear-gradient(135deg, #3a6073, #16222a)";
        document.body.style.background = "linear-gradient(135deg, #2c3e50, #4ca1af)";
    } 
    else if (weatherMain === "Snow") {
        weatherIcon.src = "img/snow.png";
        card.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
        document.body.style.background = "linear-gradient(135deg, #e6f0f3, #b6fbff)";
    } 
    else if (weatherMain === "Thunderstorm") {
        weatherIcon.src = "img/thunder.png"; // Add thunder icon if you have it
        card.style.background = "linear-gradient(135deg, #141E30, #243B55)";
        document.body.style.background = "linear-gradient(135deg, #232526, #414345)";
    } 
    else {
        weatherIcon.src = "img/clear.png";
        card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
        document.body.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
    }
}

// Click button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Press Enter
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});

// Default city on load
checkWeather("Delhi");
