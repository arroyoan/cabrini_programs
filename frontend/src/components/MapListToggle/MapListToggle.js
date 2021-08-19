import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styles from './MapListToggle.module.css'

import {toggleMapList} from '../../actions/mapListActions'

const MapListToggle = () => {
  const  dispatch = useDispatch() 

  const mapListToggle = useSelector(state => state.mapListToggle)
  const {mapList} = mapListToggle

  const onClick = (e)=>{
    e.preventDefault()
    dispatch(toggleMapList())
  }

  return (
    <div className={styles.toggle}>
      {mapList 
        ? <button onClick={onClick} >List View <i className="fas fa-list"></i></button>
        : <button onClick={onClick}>Map View <i className="fas fa-map"></i></button>
      }
      
    </div>
  )
}

export default MapListToggle
