window.addEventListener("load", ()=>{
    let long;
    let lat;
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDegree =document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description"); 
    let temperature = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api =`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
            .then(Response =>{
                return Response.json();
            })
            .then(data =>{
                const {temperature ,summary,icon} = data.currently;

                //set DOM elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent =data.timezone;

                //set icon
                setIcon(icon,document.querySelector(".icon"));

                //change temperature to celsius/Farenheit
                temperature.addEventListener("click", () =>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                    } else {
                        temperatureSpan.textContent ='F';
                    }
                } )
            });
        });
    }
    function setIcon(icon , iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});