let form = document.getElementById("form")
let cityInput = document.getElementById("cityInput")
let APIKEY = `5451fdda2953b14d3035c37755998aef`
let weatherResultContainer = document.getElementById("weather-result-container")
form.addEventListener("submit", function(event){
    event.preventDefault()
    let city = cityInput.value
    let weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    fetch(weatherData).then((wdata)=>{
        return wdata.json()
    }).then((collectedData)=>{
        printOnUI(collectedData, city)
    })
    form.reset()
})

function printOnUI(collectedData, city){
    console.log(collectedData)
    weatherResultContainer.innerHTML = ``
    let currentTemp = collectedData.main.temp.toFixed() + `°C`
    let humidity = collectedData.main.humidity
    let nameOfCityContainer = document.createElement("div")
    nameOfCityContainer.classList.add("name-of-city-container")
    let heading1 = document.createElement("h1")
    heading1.textContent = city
    let currentTemperatureContainer = document.createElement("div")
    currentTemperatureContainer.classList.add("current-temperature-container")
    let paragraph = document.createElement("p")
    paragraph.textContent = `Current Temperature`
    let heading5 = document.createElement("h5")
    heading5.textContent = currentTemp
    let humidityContainer = document.createElement("div")
    humidityContainer.classList.add("humidity-container")
    let paragraph2 = document.createElement("p")
    paragraph2.textContent = `Humidity`
    let humidity5 = document.createElement("h5")
    humidity5.textContent = humidity
    nameOfCityContainer.append(heading1)
    currentTemperatureContainer.append(paragraph,heading5)
    humidityContainer.append(paragraph2, humidity5)
    weatherResultContainer.append(nameOfCityContainer, currentTemperatureContainer, humidityContainer)
}