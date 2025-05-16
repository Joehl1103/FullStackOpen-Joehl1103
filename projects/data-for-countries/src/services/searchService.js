import axios from 'axios'
const baseApiURL = 'https://studies.cs.helsinki.fi/restcountries/api'

function getAll(){
    const request = axios.get(`${baseApiURL}/all`)
    return request.then(response => response.data) 
}

function getCountryData(countryName){
    const request = axios.get(`${baseApiURL}/name/${countryName}`)
    return request.then(response => response.data)
}

export default {getAll,getCountryData}