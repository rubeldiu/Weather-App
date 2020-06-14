// api key : f69a64740931586aadab64a350be8ff5
const iconElement =document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p"); 
const notifiElement = document.querySelector(".notification"); 
const cityElement = document.querySelector(".city-input");


//App Data
const weather = {};


const KELVIN = 273;
const API_KEY = 'f69a64740931586aadab64a350be8ff5';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const DEFAULT_CITY ='copenhagen,dk';

//User Permission for the window
window.onload = function(){
    navigator.geolocation.getCurrentPosition( success => {
        getWeatherData(null,success.coords);
    }, e =>{
      getWeatherData(DEFAULT_CITY);
    })

    //City name as Input
    cityElement.addEventListener('keypress', function (e){
        if(e.key === 'Enter'){
            if(e.target.value){
                getWeatherData(e.target.value);
                e.target.value='';
            }
            else {
                alert('Please enter a valid city name');
            }
        }

    })
}

//GetWeatherData Function
function getWeatherData(city = DEFAULT_CITY,coords){
     let url = BASE_URL;
    city === null? //if city name is null then
    url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
    url = `${url}&q=${city}`
    
    axios.get(url)
          .then(({data}) =>{
            let weather = {
                 temp: Math.floor(data.main.temp - KELVIN),
                 desc: data.weather[0].description,
                 icon: data.weather[0].icon,
                 city :data.name,
                 country:data.sys.country
                }
                displayWeather(weather);
          }).catch(e =>{
              console.log(e.message);
          })

}


//Display Weather 
function displayWeather(weather){
   iconElement.innerHTML = `<img src="icons/${weather.icon}.png"/>`;
   tempElement.innerHTML =`${weather.temp}°<span>C</span>`;
   descElement.innerHTML = `${weather.desc}`;
   locationElement.innerHTML =`${weather.city} - ${weather.country}`;
}


