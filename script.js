
function weatherDtl() {
  const city=document.querySelector('.search-bar').value
 console.log(city);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
    .then((response) => response.json())
    .then((data) => {




console.log(data);
const city = data.name;
const temperature = Math.round(data.main.temp - 273.15);
const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
const description = data.weather[0].description;
const tempMax = Math.round(data.main.temp_max - 273.15);
const tempMin = Math.round(data.main.temp_min - 273.15);
const humidity = data.main.humidity;
const windSpeed = data.wind.speed;

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const iconElement = document.querySelector(".icon");
const descriptionElement = document.querySelector(".description");
const tempMaxElement = document.querySelector(".tmax");
const tempMinElement = document.querySelector(".tmin");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

cityElement.textContent = `Weather in ${city}`;
            tempElement.textContent = `${temperature}°C`;
            iconElement.src = iconUrl;
            descriptionElement.textContent = description;
            tempMaxElement.textContent = `Temp-Max: ${tempMax}°C`;
            tempMinElement.textContent = `Temp-Min: ${tempMin}°C`;
            humidityElement.textContent = `Humidity: ${humidity}%`;
            windElement.textContent = `Wind speed: ${windSpeed} km/h`;
            
          
          })
          .catch((error) => {
            console.log("Error:", error);
})
}

  // function getCurrentLocation(position){
  //     result.innerText = "Current Location...";
  //     let {lon, lat} = position.coord;
  //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${lon}+${lat}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
  //     .then(response => response.json()).then(response =>{
  //         let allDetails = response.results[0].components;
  //         console.table(allDetails);
  //         let {county, postcode, country} = allDetails;
  //       result.innerText = `${county} ${postcode}, ${country}`;
  //     }).catch(()=>{
  //        result.innerText = "Something went wrong";
  //     });
  // }

  function getCurrentLocation() {
    const resultElement = document.getElementById("result");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
        
          resultElement.innerText = "Getting current location...";
          
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
            .then((response) => response.json())
            .then((data) => {
              const { name, sys } = data;
              const { country } = sys;
  
              resultElement.innerText = `${name}, ${country}`;
            })
            .catch(() => {
              resultElement.innerText = "Something went wrong";
            });
        },
        (error) => {
          console.log("Error:", error);
          resultElement.innerText = "Something went wrong";
        }
      );
    } else {
      resultElement.innerText = "Geolocation is not supported by this browser.";
    }
  }