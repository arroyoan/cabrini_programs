import React from 'react'
import styles from './Banner.module.css'
import {useLocation} from 'react-router-dom'

import Logo from '../Logo/Logo'
import MapListToggle from '../MapListToggle/MapListToggle'

const Banner = () => {
  let location =useLocation()
  
  let pathName = location.pathname.split('/')

  let showButton =false

  if(pathName.includes('maplist') && !showButton){
    showButton=true
  } else {
    showButton=false
  }

  return (
    <div className={styles.banner}>
      <Logo/>
      {showButton && <MapListToggle/>}
    </div>
  )
}

export default Banner
