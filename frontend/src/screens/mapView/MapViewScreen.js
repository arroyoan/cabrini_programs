import React from 'react'
import Map from '../../components/Map/Map'
import {Route} from 'react-router-dom'
import styles from './MapViewScreen.module.css'

const MapViewScreen = ({locations}) => {
  return (
    <div className={styles.mapView}>
      <Route render={({ history }) => <Map history={history} locations={locations} />} />
    </div>
  )
}

export default MapViewScreen
