window.addEventListener("load", ()=>{
    let lonGitude;
    let laTitude;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureRealfeel = document.querySelector(".temperature-realfeel");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
        lonGitude = position.coords.longitude;
        console.log(lonGitude)
        laTitude = position.coords.latitude; 
        console.log(laTitude);

        const api = `http://api.openweathermap.org/data/2.5/weather?lat=${laTitude}&lon=${lonGitude}&units=metric&appid=490077db0bef2170bd3069fd153c2b7a`;
    
         fetch(api) 
        .then(response =>{
        return response.json();
    })
        .then(data =>{ 
         const {temp,feels_like} = data.main;
         const {icon, description} = data.weather[0];
        //set DOM Elements from the API
        console.log(data)
        
        temperatureDegree.textContent = temp;
       
        temperatureDescription.textContent = description; 
        temperatureRealfeel.textContent = `RealFeel@ ${feels_like}`;
        locationTimezone.textContent = data.name;
        //Formula For celsius
        let Fahrenheit = (temp * 9/5) +32; 

        //Set Icon
        let locationIcon = document.querySelector(".weather-icon");
        locationIcon.innerHTML = `${icon}<img src="10d.png">`;

        temperatureSection.addEventListener("click", ()=>{
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(Fahrenheit);
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp;
            }
        });
        })

        .catch(error =>{
        console.log(error)
     })
    
    //else{
    //     h1.textContent="hey, this is not working because the browser isn't supported"
    // }
    })
}
    
   
})