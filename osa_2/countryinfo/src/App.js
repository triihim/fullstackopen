import {useState, useEffect} from "react";
import axios from "axios";

const Weather = ({city}) => {
  const [weather, setWeather] = useState({});

  const updateWeather = weather => {
    setWeather({
      ...weather, 
      temperature: weather.temperature,
      windSpeed: weather.wind_speed,
      windDirection: weather.wind_dir,
      icon: weather.weather_icons && weather.weather_icons[0]
    });
  }

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`;
    axios.get(url)
      .then(res => updateWeather(res.data.current))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p><strong>Temperature: </strong>{weather.temperature}</p>
      <img src={weather.icon} width="100"></img>
      <p><strong>Wind: </strong>{weather.windSpeed} mph direction {weather.windDirection}</p>
    </div>
  );
}

const CountryList = ({countries, onShowClick}) => {
  return countries.map(c => {
    return (
      <div key={c.alpha3Code}>
        <span>{c.name}</span>
        <button onClick={() => onShowClick(c.name)}>Show</button>
      </div>
    );
  });
}

const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)}
      </ul>
      <img src={country.flag} width="100"></img>
      <Weather city={country.capital} />
    </div>
  );
}

const Content = ({countries, handleShowClick}) => {
  if(countries.length > 10) {
    return <p>Too many matches, specify more</p>
  } else if(countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  } else {
    return <CountryList countries={countries} onShowClick={handleShowClick} />
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const filteredCountries = countries.filter(c => {
    if(selectedCountry.length > 0) {
      return c.name === selectedCountry;
    } else {
      return c.name.toLowerCase().includes(countrySearch.toLowerCase())
    }
  });

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value);
    setSelectedCountry(""); // Clear exact match on search input change.
  }

  const filterExactMatch = (countryName) => {
    setSelectedCountry(countryName);
  }

  const fetchCountries = () => {
    const endpoint = "https://restcountries.eu/rest/v2/all";
    axios.get(endpoint)
         .then(res => setCountries(countries.concat(res.data)))
         .catch(console.error);
  }

  useEffect(fetchCountries, []);

  return (
    <div className="App">
      <div>
        Find countries: 
        <input value={countrySearch} 
               onChange={handleCountrySearch} />
      </div>
      <Content countries={filteredCountries} handleShowClick={filterExactMatch} />
    </div>
  );
}

export default App;
