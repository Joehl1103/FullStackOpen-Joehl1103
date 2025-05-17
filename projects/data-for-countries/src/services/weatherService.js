import axios from 'axios'
const baseApiURL = `https://api.openweathermap.org/data/2.5/weather?`

function getCurrentWeather(lat,lon){
    const APIKey = import.meta.env.VITE_SOME_KEY
    const request = axios.get(`${baseApiURL}lat=${lat}&lon=${lon}&unit=imperial&appid=${APIKey}`)
    return request.then(response => response.data)
}

export default {getCurrentWeather}