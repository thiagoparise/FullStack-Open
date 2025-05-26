import {useState, useEffect} from 'react'
import api from './services/api.jsx'

const CountryInfo = ({country, weather}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital[0]}</p>
      <p>{country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language])=> <li key={code}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description}></img>
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountriesList = ({value, results, handleShow, weather}) => {
  if(value === "") 
    return null
  if(results.length > 10){
    return <div>Too many matches, specify another filter</div>
  } else if(results.length > 1) {
    return (
      <ul>
        {results.map(country => <li key={country.cca3}>{country.name.common} <button onClick={() => handleShow(country)}>show</button> </li>)}
      </ul>
    )
  } else if(results.length === 1) {
      return <CountryInfo country={results[0]} weather={weather.data}/>
  }
  
}

const App = () => {

  const [value, setValue] = useState(null)
  const [results, setResults] = useState([])
  const [countries, setCountries] = useState([])
  const [countryWeather, setCountryWeather] = useState({})

  useEffect(() => {
    api.getAll().then(promise => {
      setCountries(promise.data)
    })
  }, [value])
  
  const onSearch = (event) => {
    event.preventDefault()
  }

  const handleShow = (country) => {
    api.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
    .then(response => {
      console.log(response)
      setCountryWeather(response)
      setResults([country])
    })
    .catch(error => setCountryWeather({}))
  }
  
  const handleChange = (event) => {
    setValue(event.target.value)
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if(filteredCountries.length === 1) {
      handleShow(filteredCountries[0])
    } else {
      setResults(filteredCountries.slice())
    }
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input onChange={handleChange}></input>
      </form>
      <CountriesList results={results} value={value} handleShow={handleShow} weather={countryWeather} />
    </div>
      
  )
}


export default App