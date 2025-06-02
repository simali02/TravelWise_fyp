import React from 'react';
import '../assets/css/FeaturedCitiesStyles.css'
import CityCard from './CityCard';
import generateUniqueKey from '../features/uniqueKey';

const cities = [
  {name: 'Karachi', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Jinnah_Mausoleum_%28cropped%29.JPG/1600px-Jinnah_Mausoleum_%28cropped%29.JPG', link: `/listings?city=Karachi&place_type=hotel&sort_by=recommendations&query=${encodeURIComponent("best hotels in karachi")}`},
  {name: 'Lahore', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Minar-e-Pakistan_by_ZILL_NIAZI_3.jpg/440px-Minar-e-Pakistan_by_ZILL_NIAZI_3.jpg', link: `/listings?city=Lahore&place_type=hotel&sort_by=recommendations&query=${encodeURIComponent("best hotels in lahore")}`},
  {name: 'Islamabad', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/New_Faisal_Mosque_Islamabad.jpg/440px-New_Faisal_Mosque_Islamabad.jpg', link: `/listings?city=Islamabad&place_type=hotel&sort_by=recommendations&query=${encodeURIComponent("best hotels in islamabad")}`},
]

const FeaturedCities = () => {
  return (
    <section className='featured-cities'>
        <div className="content">
            <h2>Popular Cities</h2>
        </div>

        <div className="cities">
        {cities.map((e, i) => {
          return <CityCard key={generateUniqueKey("cities"+i)}imageSrc={e.url} cityName={e.name} linkTo={e.link} />
        })}
        </div>
    </section>
  )
}

export default FeaturedCities