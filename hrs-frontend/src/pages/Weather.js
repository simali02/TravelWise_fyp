import React, { useEffect, useContext } from 'react'
// import WeatherDetailsCard from '../components/WeatherDetailsCard'
import Weather from '../components/Weather'
import '../assets/css/WeatherStyles.css'
import { ProgressContext } from '../contexts/ProgressContext'

const WeatherPage = () => {
  const setProgress = useContext(ProgressContext);

  useEffect(() => {
   setProgress(100); 
  }, [setProgress]);

  return (
    <section className='weather'>
      <Weather/>
        {/* <h2>Weather Updates</h2> */}
        {/* <div className='weather-details-wrapper'> */}

        {/* <WeatherDetailsCard/> */}
        {/* <WeatherDetailsCard/> */}
        {/* <WeatherDetailsCard/> */}
        {/* // </div> */}
    </section>
  )
}

export default WeatherPage