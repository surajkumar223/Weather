import React, { useState } from 'react'
import './Weather.css';
import { FaSearch,FaWind} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md';
import {WiHumidity} from 'react-icons/wi';



export const Weather = () => {
  const [city, setcity] = useState('');
  const [weather,setweather]= useState();
  const [error,setError]=useState();
  
  
  const API_KEY = "e3eebfd5efaa7cfd70c65d775cff610b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  function hchange(event) {
    setcity(event.target.value);

  }
  async function fetchData(){
    try{
      let response = await fetch(url);
      let output = await response.json();
      if(response.ok)
      {
        setweather(output);
        console.log(output);
        setError('');
      }
      else{
        setError('No data found, Please enter a valid city name');
      }
    }
    catch(error){
      
    }
  }
  return (
    <div className='container'>
      <div className='city'>
        <input type="text" value={city} onChange={hchange} placeholder='Enter any city name' />
        <button onClick={()=>fetchData()}>
          <FaSearch></FaSearch>
        </button>
      </div>
      {
        error && <p className='error-message'>{error}</p> 
      }
      {
        weather && weather.weather &&  /*if enter valid city name and if you have not this city data so what will be happen */
        <div className='content'>
          <div className='weather-image'>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" ></img>
            <h3 className='desc'>{weather.weather[0].description}</h3>
            <div className='weather-temp'>
              <h3>{weather.main.temp}<span>&deg;c</span></h3>
            </div>
          </div>
                  <div className='weather-city'>
                    <div className='location'>
                      <MdLocationOn  ></MdLocationOn>
                    </div>
                      <p>{weather.name},<span>{weather.sys.country}</span></p>
                    
                  </div>
                  
                  <div className='weather-stats'>
                    <div className='wind'>
                      <div className='wind-icon'>
                        <FaWind></FaWind>
                      </div>
                      <h3 className='wind-speed'>{weather.wind.speed}<span>km/h</span></h3>
                      <h3 className='wind-heading'>Wind Speed</h3>
                    </div> 
                    
                    <div className='humidity'>
                      <div className='humidity-icon'>
                        <WiHumidity></WiHumidity>
                      </div>
                      <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                      <h3 className='humidity-heading'>Humidity</h3>
                    </div>
                  </div>

                  
          
        </div>
      }
    </div>
  )
}

export default Weather
