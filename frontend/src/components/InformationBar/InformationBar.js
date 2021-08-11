import React from 'react'
import styles from './InformationBar.module.css'
import { useLocation } from 'react-router-dom'

import Filters from '../Filters/Filters'
import BackButton from '../BackButton/BackButton'
// breadcrumbs
// display none in state for thing like home screen


const InformationBar = () => {
  let location = useLocation()
  
  let pathName = location.pathname.split('/')

  let showBar =false

  if((pathName.includes('programs') || pathName.includes('locations')) && !showBar){
    showBar=true
  } else {
    showBar=false
  }
  
  return (
    <div className={styles.infobar}>
      {showBar ? pathName.includes('maplist') ? <Filters/> : <BackButton/> : <div className=""></div> }
    </div>
  )
}

export default InformationBar
