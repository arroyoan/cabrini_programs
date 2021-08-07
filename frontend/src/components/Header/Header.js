import React from 'react'
import styles from './Header.module.css'

import Banner from '../Banner/Banner'
import InformationBar from '../InformationBar/InformationBar'

const Header = () => {
  return (
    <div className={styles.header}>
        <Banner/>
        <InformationBar/>
    </div>
  )
}

export default Header
