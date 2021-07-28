import React from 'react'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'

import SearchBar from '../SearchBar/SearchBar'

const Header = () => {
  return (
    <div className={styles.header}>

      {/* Will use header__content to format both nav and filters to match */}
      <div className="header__content">

        {/* Handles the navigation between mapView and listView */}
        <div className={styles.header__navigation}>
          <div className={styles.nav__logo}> <Link to={`/`}><h1>Cabrini Community Programs</h1></Link></div>
          <div className={styles.nav__buttons}>
            <button className={styles.nav__button} >
              <p>{'Map View'}</p> 
              <span><i className="fas fa-map"></i></span> 
            </button>
          </div>
        </div>

        {/* Handles filters and keyword search */}
        <div className={styles.header__filters}>
          <SearchBar />
        </div>

      </div>
    </div>
  )
}

export default Header
