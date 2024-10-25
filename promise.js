// let countrydiv = document.getElementById("countrydiv")

// let requestedData = new XMLHttpRequest
// requestedData.open("GET", "./http.json")
// requestedData.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status === 200){
//         let data = JSON.parse(this.responseText)
//         data.forEach((item)=>{
//             let name = item.name
//             let country = item.country

//             let userName = document.createElement("h3")
//             userName.textContent = name

//             let userCountry = document.createElement("p")
//             userCountry.textContent = country

//             countrydiv.append(userName, userCountry)
//         })
//     }
// }
// requestedData.send()

































// let countrydiv = document.getElementById("countrydiv")
// let city = `Abuja`
// let APIKEYS = `5451fdda2953b14d3035c37755998aef`
// let weatherRequest = new XMLHttpRequest()
// weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEYS}`)
// weatherRequest.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status === 200){
//         let data = JSON.parse(this.responseText)
//         console.log(data)
//         printonUI(data)
        
//     }
// }

// function printonUI(data){
//     let temperature = data.main.temp
//     let convertedTemp = (temperature - 273).toFixed()
//     let tempText = document.createElement("p")
//     tempText.textContent = convertedTemp

//     countrydiv.append(tempText)
// }
// weatherRequest.send()
