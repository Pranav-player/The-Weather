const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b99a1967eamsh7f1fa37a4f37c5fp176954jsn6ae7ef90914e',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
};

// DOM elements
const temp2 = document.getElementById('temp2')
const humidity2 = document.getElementById('humidity2')
const windspeed_2 = document.getElementById('windspeed_2')
const cityInput = document.getElementById('city_name');
const temp = document.getElementById('temp');
const min_temp = document.getElementById('min_temp');
const max_temp = document.getElementById('max_temp');
const cloud_pct = document.getElementById('cloud_pct');
const feels_like = document.getElementById('feels_like');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind_speed');
const wind_degrees = document.getElementById('wind_degrees');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const submit = document.getElementById('submit');


const getWeather = (city) => {
    document.querySelector("h1 span").innerText = city;

    fetch(`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            
            temp.innerText = (response.main.temp - 273.15).toFixed(2) + ' °C';
            temp2.innerText = (response.main.temp - 273.15).toFixed(2);
            feels_like.innerText = (response.main.feels_like - 273.15).toFixed(2) + ' °C';
            humidity.innerText = response.main.humidity;
            humidity2.innerText = response.main.humidity;

            min_temp.innerText = (response.main.temp_min - 273.15).toFixed(2) + ' °C';
            max_temp.innerText = (response.main.temp_max - 273.15).toFixed(2) + ' °C';
            
            windspeed_2.innerText = response.wind.speed;
            wind_speed.innerText = response.wind.speed;
            wind_degrees.innerText = response.wind.deg;
            sunrise.innerText = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
            sunset.innerText = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        })
        .catch(err => {
            console.error("Error fetching weather:", err);
            alert("City not found or API error.");
        });
};

submit.addEventListener('click', (e) => {
    e.preventDefault(); 
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

getWeather('New Delhi'); 

const cities = ["Shanghai", "Cupertino", "New York", "Mumbai", "Tokyo", "Paris"];

function updateSimilarPlacesWeather() {
    cities.forEach(city => {
        fetch(`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`, options)
            .then(response => response.json())
            .then(data => {
                const temp = (data.main.temp - 273.15).toFixed(1);
                const feels = (data.main.feels_like - 273.15).toFixed(1);
                const hum = data.main.humidity;

                // Convert to lowercase id-compatible keys
                const idCity = city.toLowerCase().replace(/\s+/g, '-');

                document.getElementById(`temp-${idCity}`).innerText = temp;
                document.getElementById(`feels-${idCity}`).innerText = feels;
                document.getElementById(`hum-${idCity}`).innerText = hum;
            })
            .catch(err => console.error(`Error fetching weather for ${city}:`, err));
    });
}
updateSimilarPlacesWeather(); 

