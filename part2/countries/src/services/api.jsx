import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherURL = 'https://api.openweathermap.org/data/2.5'

const getAll = () => {
    return axios.get(`${baseURL}/all`)
}

const getValue = (name) => {
    return axios.get(`${baseURL}/name/${name}`)
}

const getWeather = (lat, lon) => {
    return axios.get(`${weatherURL}/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
}

export default { getAll, getValue, getWeather}