import React from 'react'
import {NavLink} from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div>
      <h1>THis is the home screen and navigation will be added here to load stuff</h1>
      <NavLink to='/programs/maplist' >ListView</NavLink>
      <NavLink to='/programs/mapview' >MapView</NavLink>
    </div>
  )
}

export default HomeScreen
