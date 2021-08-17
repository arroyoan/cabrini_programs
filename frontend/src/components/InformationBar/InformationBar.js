import React from 'react'
import styles from './InformationBar.module.css'
import { useLocation } from 'react-router-dom'

import Filters from '../Filters/Filters'
import BackButton from '../BackButton/BackButton'

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
    <>
      {showBar ? pathName.includes('maplist') ? <div className={styles.infobar}><Filters/></div> : <div className={styles.infobar}><BackButton/></div> : <div className=""></div> }
    </>
  )
}

export default InformationBar
