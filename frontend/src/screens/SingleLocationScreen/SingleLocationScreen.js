// eslint-disable-next-line
import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
// eslint-disable-next-line
import {Link} from 'react-router-dom'
import styles from './SingleLocationScreen.module.css'

import {getLocation} from '../../actions/locationActions'


const SingleLocationScreen = ({match}) => {
  const dispatch = useDispatch()

  // get id from parameter
  const id = match.params.locationId

  // get the state from the store
  const singleLocation = useSelector(state=>state.singleLocation)
  const {loading,error,location} = singleLocation

  // useEffect statements
  useEffect(()=>{
    dispatch(getLocation(id))
  },[dispatch,id])

  if(location){
    console.log(location)
  }

  return (
    <div>
      {loading && <h1>Loading....</h1> }
      {error && <h1>{error.message}</h1> }
      {(location!==undefined && location.locationName) && 
        <div className={styles.content}>
          
          <div className={styles.content__locationInfo}>
            <h2>{location.locationName}</h2>
            <div className={styles.content__address}>
              <p>{location.GeoJson.streetName}</p>
              <p>{location.GeoJson.city}, {location.GeoJson.stateCode} {location.GeoJson.zipcode}</p>
            </div>
            <a href={location.locationWebsite}>{location.locationWebsite}</a>
          </div>

          <div className={styles.content__locationPrograms}>
            <h3>{`Programs at ${location.locationName} (${location.programs.length})`}</h3>
            <ul>
              {location.programs.map(program=>{
                return <li key={program._id}> <Link to={`/programs/${program._id}`} >{program.programName}</Link></li>
              })}
            </ul>
          </div>

        </div> 
      }
    </div>
  )
}

export default SingleLocationScreen
