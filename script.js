let appId = 'b4f8399cb8eeb31e0a395d99e6478e6f';
//Metric for celcius , imperial for Fahrenheit
let units = 'metric';
let searchMethod;
let isCelcius = true;

/* INFORMATION : 
    q to search with city name
    id to search with city id
    lat and lon to search with geographic coordinates (Lattitude and longitude)
    zip to search with zipcode
*/
function getSearchMethod(searchterm) {
    if (searchterm.length === 5 && Number.parseInt(searchterm).toString === searchterm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

//connect to API with URL + API_KEY and get response from API Weather in json 
function searchWeather(searchterm) {
    getSearchMethod(searchterm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchterm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    //Print out the json response to console
    console.log(resultFromServer);
    //Change image background based on the condition in JSON response
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rainy.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        default:
            break;
    }

    //Grab all the preferred elements on HTML to be saved on JS variables
    let weatherDescriptionHeader = document.getElementById('weather-description-header');
    let windspeedElement = document.getElementById('wind-speed');
    let humidityElement = document.getElementById('humidity');
    let temperatureElement = document.getElementById('temperature');
    let cityElement = document.getElementById('city-header');
    let weatherIcon = document.getElementById('document-icon-img');
    // let alphabet = document.getElementsByClassName('units');


    //Get icon from 
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    //Description of the weather inside of JSON format received from API
    let resultDescription = resultFromServer.weather[0].description;

    //Capitalize the first character of description and append it with the rest alphabets / words
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp);
    windspeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s";
    cityElement.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + " %";


    //Change the temperature units from C to F, vice versa 
    temperatureElement.addEventListener("click", () => {
        if (isCelcius) {
            var F_temp = (Number(temperatureElement.innerText) * 9 / 5) + 32;
            // alphabet.innerHTML = "F";
            temperatureElement.innerHTML = F_temp;
            isCelcius = false;
        } else {
            var C_temp = (Number(temperatureElement.innerText) - 32) * 5 / 9;
            temperatureElement.innerHTML = C_temp;
            // alphabet.innerHTML = "C";
            isCelcius = true;
        }
    })

    setPositionForWeatherInfo();

    // let weatherContainer = document.getElementById("weather-container");
    // weatherContainer.style.visibility = 'visible';
}


function setPositionForWeatherInfo() {
    let greetings = document.getElementById("greetings");
    let weatherContainer = document.getElementById("weather-container");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
    greetings.style.visibility = 'hidden';
}

//do these processes after user input and clicked button
document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm)
        searchWeather(searchTerm);
})