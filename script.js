const apiKey = "c929e81d62927ab6588df094008b4715";

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    //catch user input
    const cityName = document.querySelector("#search-input").value;
    //current weather 
    currentWeather(cityName);
    //showforecast
    forecast(cityName);
    //city button - history
    createBtn(cityName);
});

const currentWeather = function(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log("current data", data);

        const template = `
            <div class="card">
                <h2>${data.name} (${new Date().toLocaleDateString()}) <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/></h2>
                <p>Temp: ${data.main.temp} F</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>
            </div>
        `;

        document.querySelector("#today").innerHTML = template;
    });
}

const forecast = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log("forecast data", data);

        const cleanData = data.list.filter((datum) => datum.dt_txt.indexOf("12:00:00") > -1);

        console.log("clean", cleanData);

        let template = "";
        
        cleanData.forEach((data) => {
            template +=`
            <div class="card">
                <h2>${new Date().toLocaleDateString()}) <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/></h2>
                <p>Temp: ${data.main.temp} F</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>
            </div>
            `;
        });
        document.querySelector("#forecast").innerHTML = template;
    });
}