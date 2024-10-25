let form = document.getElementById("form");
let input = document.getElementById("location");
let submit = document.getElementById("submit");
let userKey = "5451fdda2953b14d3035c37755998aef";
let temperatureSection = document.getElementById("temperature-section");
let textCountry = document.getElementById("textCountry");
let tempMaxText = document.getElementById("tempMax-Text");
let detailsContainer = document.getElementById("deatils-container");
let tempMini = document.getElementById("Temp-mini");
let transformDetails = document.getElementById("transform-details")
let bgImageContainer = document.getElementById("background-image")
let mainContainer = document.getElementById("main-container")
let imageArray = [
    'url(./cold1.jpg)',
    'url(./cold2.jpg)',
    'url(./cold3.jpg)',
    'url(./Not-too-cold.jpg)',
    'url(./rain1.jpg)',
    'url(./sun1.jpg)'
]

const changeBackground = (dataValue)=>{
    let tempMax = dataValue.main.temp_max;
    let convertedMaxTemp = (tempMax - 273.15).toFixed(); // Remove '°C' for comparison
if(convertedMaxTemp < 10){
    bgImageContainer.style.backgroundImage = imageArray[2];
}else if(convertedMaxTemp >= 11 && convertedMaxTemp <=17){
    bgImageContainer.style.backgroundImage = imageArray[4];
}else if(convertedMaxTemp >= 18 && convertedMaxTemp <=22){
    bgImageContainer.style.backgroundImage = imageArray[1];
}else if(convertedMaxTemp >= 23 && convertedMaxTemp <=40){
    bgImageContainer.style.backgroundImage = imageArray[5];
}else{
    bgImageContainer.style.backgroundImage = `url(../bg-weather.png)`;
}
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let inputValue = input.value.trim();
    form.reset();
    if (inputValue === "") return;
    textCountry.textContent = inputValue;
    transformDetails.style.display = `flex`

    let requestedData = new XMLHttpRequest();
    requestedData.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${userKey}`);

    requestedData.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let dataValue = JSON.parse(this.responseText);
            console.log(dataValue);
            printOnUI(dataValue, inputValue);
            weatherDetails(dataValue);  // Display max temperature details
            weatherDetails2(dataValue); // Display min temperature details
            weatherDetails3(dataValue); //Display humidity details
            weatherDetails4(dataValue); //Display cloudy details
            weatherDetails5(dataValue);//Display Wind Details
            changeBackground(dataValue)
        }
    };

    requestedData.send();
});

function printOnUI(dataValue, inputValue) {
    temperatureSection.innerHTML = ``;

    let tempMax = dataValue.main.temp_max;
    let convertedMaxTemp = (tempMax - 273.15).toFixed() + '°C';

    let celsiusConverter = document.createElement("div");
    celsiusConverter.classList.add("celsius-converter");
    let heading = document.createElement("h1");
    heading.textContent = convertedMaxTemp;

    let countryDate = document.createElement("div");
    countryDate.classList.add("country-date");
    let country = document.createElement("p");
    country.classList.add("country");
    country.textContent = inputValue;
    let date = document.createElement("div");
    date.classList.add("date");
    let dateText = document.createElement("p");
    dateText.classList.add("date-in-full")
    dateText.textContent = new Date().toLocaleString();

    let temperatureIcon = document.createElement("div");
    temperatureIcon.classList.add("temperature-icon");
    let imageTemp = document.createElement("img");
    imageTemp.setAttribute("src", "../Cloudy.png");

    celsiusConverter.append(heading);
    countryDate.append(country, dateText);
    temperatureIcon.append(imageTemp);
    temperatureSection.append(celsiusConverter, countryDate, temperatureIcon);
}

function weatherDetails(dataValue) {
    detailsContainer.innerHTML = ``;

    let tempMax = dataValue.main.temp_max;
    let convertedMaxTemp = (tempMax - 273.15).toFixed() + '°C';

    let leftDetail = document.createElement("div");
    leftDetail.classList.add("left-detail");
    let heading4 = document.createElement("h4");
    heading4.textContent = `Temp Max`;

    let rightDetails = document.createElement("div");
    rightDetails.classList.add("right-details");

    let celsiusWithDetail = document.createElement("div");
    celsiusWithDetail.classList.add("celsius-with-detail-icon");
    let celsius = document.createElement("div");
    celsius.classList.add("celsius");
    let tempMaxText = document.createElement("p");
    tempMaxText.classList.add("TempMax-Text")
    tempMaxText.textContent = convertedMaxTemp;

    let detailIcon = document.createElement("div");
    detailIcon.classList.add("detail-icon");
    let faTemperature = document.createElement("i");
    faTemperature.classList.add("fa-solid", "fa-temperature-three-quarters");
    faTemperature.style.color = `#db2d1a`;
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("item-details")

    leftDetail.append(heading4);
    celsiusWithDetail.append(celsius, detailIcon);
    celsius.append(tempMaxText);
    detailIcon.append(faTemperature);
    rightDetails.append(celsiusWithDetail);

    itemDetails.append(leftDetail, rightDetails);
    detailsContainer.append(itemDetails)
}

function weatherDetails2(dataValue) {
    
    // Do not clear itemDetails again; append to existing content.
    let tempMin = dataValue.main.temp_min;
    let convertedMinTemp = (tempMin - 273.15).toFixed() + '°C';

    let leftDetail2 = document.createElement("div");
    leftDetail2.classList.add("left-detail2");
    let heading4 = document.createElement("h4");
    heading4.classList.add("heading2");
    heading4.textContent = `Temp Min`;

    let rightDetails2 = document.createElement("div");
    rightDetails2.classList.add("right-details2");

    let celsiusWithDetail2 = document.createElement("div");
    celsiusWithDetail2.classList.add("celsius-detail2");
    let celsius2 = document.createElement("div");
    celsius2.classList.add("celcius2");
    let tempMinText = document.createElement("p");
    tempMinText.textContent = convertedMinTemp;

    let detailIcon2 = document.createElement("div");
    detailIcon2.classList.add("detail-icon2");
    let faTemperature2 = document.createElement("i");
    faTemperature2.classList.add("fa-solid", "fa-temperature-empty");
    faTemperature2.style.color = `#09409f`;
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("item-details")

    itemDetails.append(leftDetail2, rightDetails2);
    leftDetail2.append(heading4);
    celsiusWithDetail2.append(celsius2, detailIcon2);
    celsius2.append(tempMinText);
    detailIcon2.append(faTemperature2);
    rightDetails2.append(celsiusWithDetail2);
    detailsContainer.append(itemDetails)
}

function weatherDetails3(dataValue){
    // Do not clear itemDetails again; append to existing content.
    let humidity = dataValue.main.humidity + '%'
    // let convertedMinTemp = (tempMin - 273.15).toFixed() + '°';

    let leftDetail2 = document.createElement("div");
    leftDetail2.classList.add("left-humidity");
    let heading4 = document.createElement("h4");
    heading4.classList.add("humidity-text");
    heading4.textContent = `Humidity`;

    let rightDetails2 = document.createElement("div");
    rightDetails2.classList.add("humidity-right");

    let celsiusWithDetail2 = document.createElement("div");
    celsiusWithDetail2.classList.add("celsius-detail-humidity");
    let celsius2 = document.createElement("div");
    celsius2.classList.add("humid-celcius");
    let humidityText = document.createElement("p");
    humidityText.textContent = humidity;

    let detailIcon2 = document.createElement("div");
    detailIcon2.classList.add("detail-humidity");
    let faTemperature2 = document.createElement("img");
    faTemperature2.setAttribute("src", "../outline (1).png")
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("item-humidity")

   
    leftDetail2.append(heading4);
    celsiusWithDetail2.append(celsius2, detailIcon2);
    celsius2.append(humidityText);
    detailIcon2.append(faTemperature2);
    rightDetails2.append(celsiusWithDetail2);
    itemDetails.append(leftDetail2, rightDetails2);
    detailsContainer.append(itemDetails)
}

function weatherDetails4(dataValue){
    // Do not clear itemDetails again; append to existing content.
    let clouds = dataValue.clouds.all + '%';
    // let convertedMinTemp = (tempMin - 273.15).toFixed() + '°';

    let leftDetail2 = document.createElement("div");
    leftDetail2.classList.add("left-cloudy");
    let heading4 = document.createElement("h4");
    heading4.classList.add("heading-cloudy");
    heading4.textContent = `Cloudy`;

    let rightDetails2 = document.createElement("div");
    rightDetails2.classList.add("right-cloudy");

    let celsiusWithDetail2 = document.createElement("div");
    celsiusWithDetail2.classList.add("celsius-detail-cloudy");
    let celsius2 = document.createElement("div");
    celsius2.classList.add("celsius-cloudy");
    let cloudyText = document.createElement("p");
    cloudyText.textContent = clouds;

    let detailIcon2 = document.createElement("div");
    detailIcon2.classList.add("detail-cloudy");
    let faTemperature2 = document.createElement("img");
    faTemperature2.setAttribute("src", "../Cloudy.png")
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("item-cloudy")

   
    leftDetail2.append(heading4);
    celsiusWithDetail2.append(celsius2, detailIcon2);
    celsius2.append(cloudyText);
    detailIcon2.append(faTemperature2);
    rightDetails2.append(celsiusWithDetail2);
    itemDetails.append(leftDetail2, rightDetails2);
    detailsContainer.append(itemDetails)
}
function weatherDetails5(dataValue){
    // Do not clear itemDetails again; append to existing content.
    let wind = dataValue.wind.deg + '%';
    // let convertedMinTemp = (tempMin - 273.15).toFixed() + '°';

    let leftDetail2 = document.createElement("div");
    leftDetail2.classList.add("left-wind");
    let heading4 = document.createElement("h4");
    heading4.classList.add("heading-wind");
    heading4.textContent = `Wind`;

    let rightDetails2 = document.createElement("div");
    rightDetails2.classList.add("right-wind");

    let celsiusWithDetail2 = document.createElement("div");
    celsiusWithDetail2.classList.add("celsius-detail-wind");
    let celsius2 = document.createElement("div");
    celsius2.classList.add("celsius-wind");
    let windText = document.createElement("p");
    windText.textContent = wind;

    let detailIcon2 = document.createElement("div");
    detailIcon2.classList.add("detail-icon-wind");
    let faTemperature2 = document.createElement("img");
    faTemperature2.setAttribute("src", "../outline (3).png")
    let itemDetails = document.createElement("div")
    itemDetails.classList.add("wind-detail")


    leftDetail2.append(heading4);
    celsiusWithDetail2.append(celsius2, detailIcon2);
    celsius2.append(windText);
    detailIcon2.append(faTemperature2);
    rightDetails2.append(celsiusWithDetail2);
    itemDetails.append(leftDetail2, rightDetails2);
    detailsContainer.append(itemDetails)
}

