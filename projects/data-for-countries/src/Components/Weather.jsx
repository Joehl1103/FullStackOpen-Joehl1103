import weatherService from '../services/weatherService'
import {useState,useEffect} from 'react'

/*
TODO get the icon to render
TODO get the data to display in imperial units
   TODO Check the API call
*/

const Weather = (capitalInfo) => {
    const [weatherObject,setWeatherObject] = useState(null)

    // destructure capital info
    // console.log("capital info",capitalInfo.capitalInfo.latlng)
    // capitalInfo Object with another capitalinfoobject with an array
    const latLng = capitalInfo.capitalInfo.latlng
  
    //console.log("Latlng",latLng)
    useEffect(()=> {
        weatherService
        .getCurrentWeather(latLng[0],latLng[1])
        .then(response => {
            const iconURL = `'https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png'`
            console.log("Weather API call response",response)
            const tempWeatherObject = {
                iconUrl: iconURL,
                temp: response.main.temp,
                windSpeed: response.wind.speed
            }
            console.log("tempWeatherObject: ",tempWeatherObject)
            setWeatherObject(tempWeatherObject)
            return
        })
        .catch(error => {
            console.error(error.message)
        })
    },[latLng])
    
       

    
    if (weatherObject !== null){
        return (
            <>
               <p>Temperature: {weatherObject.temp} F</p>
               <img src={weatherObject.iconURL}/>
               <p>Wind: {weatherObject.windSpeed} m/s</p>

            </>
        )

    } else {
            <p>Loading weather data...</p>
    }
}

 

export default Weather