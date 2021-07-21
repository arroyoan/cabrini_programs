import React from 'react'
import {NavLink} from 'react-router-dom'

import styles from './LocationList.module.css'

const LocationList = ({locations}) => {
  return (
    <>
    {locations.length > 1 &&
      <div className={styles.locationList}>
        <h3>{`Partner Locations (${locations.length}) `}</h3>
        <ul>
          {locations.map(location=>{
            return <li className={styles.navLink} key={location._id}><NavLink to={`/locations/${location._id}`}>{location.locationName}</NavLink> </li>
          })}
        </ul>
      </div>
    }
    </>
  )
}

export default LocationList
