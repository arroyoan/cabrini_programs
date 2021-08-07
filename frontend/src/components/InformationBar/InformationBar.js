import React from 'react'
import styles from './InformationBar.module.css'

import Filters from '../Filters/Filters'
// breadcrumbs
// display none in state for thing like home screen

const InformationBar = () => {
  return (
    <div className={styles.infobar}>
      <Filters/>
    </div>
  )
}

export default InformationBar
