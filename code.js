let search=document.querySelector('#search')
let place=document.querySelector('.place-name')
let date=document.querySelector('.date')
let currentWeather=document.querySelector('.current-weather ')
let weatherImg=document.querySelector('.weather-img')
let temperature=document.querySelector('.temperature')
let minTemp=document.querySelector('.min')
let maxTemp=document.querySelector('.max')
let sunRise=document.querySelector(".SunRise")
let sunSet=document.querySelector(".SunSet")
let feelsLike=document.querySelector(".feelLike")
let humid=document.querySelector(".humid")
let Wind=document.querySelector(".wind")
let pressure=document.querySelector(".pressure")
let form=document.querySelector(".submitting")

let city="Dir"
form.addEventListener('submit',(e)=>{
e.preventDefault();
city=search.value
weatherData();
search.value=""

})
let countryCode=(code)=>{
 return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
let getDateTime=(dt)=>{
let currentDate=new Date(dt*1000)
let formatOptions={
weekday:"long",
year:"numeric",
month:"long",
day:"numeric",
hour:"numeric",
minute:"numeric"
}
let formatting=new Intl.DateTimeFormat('eng-US',formatOptions)
return formatting.format(currentDate)
}
let toCelsius=(kelvin)=>{
return kelvin - 273.15
}
let getSetRise=(value)=>{
    let currentTime=new Date(value*1000)
    let options={
        hour:'numeric',
        minute:'numeric'
    }
    let formatTime=new Intl.DateTimeFormat('eng-US',options);
    return formatTime.format(currentTime)

}
let speedKmh=(mph)=>{
    return mph*1.60934
}
let weatherData=async()=>{
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7658aab4a34ee4132b0d15e147d87b6`
try {
    let response= await fetch(api)
    let data=await response.json()
    console.log(data);

    const {main,name,sys,weather,dt,wind}=data;
    place.innerHTML=`<h1>${name},${countryCode(sys.country)}</h1>`;
    date.innerHTML=`<h3>${getDateTime(dt)}</h3>`;
    currentWeather.innerHTML=`${weather[0].description}`;
    weatherImg.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="image">`;
    temperature.innerHTML=`<h1><p>Now</p><p class="temp"> ${toCelsius(main.temp_max).toFixed(0)}&#176</p></h1>`;
    sunRise.innerHTML=`${getSetRise(sys.sunrise)}`;
    sunSet.innerHTML=`${getSetRise(sys.sunset)}`;
    feelsLike.innerHTML=`${toCelsius(main.feels_like).toFixed(0)}&#176`
    humid.innerHTML=`${main.humidity}%`;
    Wind.innerHTML=`${speedKmh(wind.speed).toFixed(0)} km/h `;
    pressure.innerHTML=`${main.pressure} mBar`;
    
} catch (error) {
    console.log(`API not working!!!\nTry later!!!\n${error}`);
9}
}
document.body.addEventListener('load',weatherData())