import React from 'react'
import styles from './HomeScreen.module.css'
import {Link} from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div className={styles.homeScreenContainer}>
      <div className={styles.homescreen__content}>
        <h2>Discover Cabrini Univiersity Community Partners!</h2>
        <Link to='/programs/maplist'>View All Partners</Link>
      </div>
    </div>
  )
}

export default HomeScreen
