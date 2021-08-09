import React from 'react'
import styles from './Header.module.css'

import Banner from '../Banner/Banner'

const Header = () => {
  return (
    <div className={styles.header}>
        <Banner/>
    </div>
  )
}

export default Header
