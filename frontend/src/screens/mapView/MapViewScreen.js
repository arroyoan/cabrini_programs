import React from 'react'
//import Map from '../../components/Map/Map'
import TestMap from '../../components/Map/TestMap'
import styles from './MapViewScreen.module.css'

const MapViewScreen = () => {
  return (
    <div className={styles.mapView}>
      {/* <Map /> */}
      <TestMap/>
    </div>
  )
}

export default MapViewScreen
