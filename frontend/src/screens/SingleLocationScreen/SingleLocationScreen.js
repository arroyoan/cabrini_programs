// eslint-disable-next-line
import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
// eslint-disable-next-line
import {Link} from 'react-router-dom'
import styles from './SingleLocationScreen.module.css'
import Spinner from '../../components/Spinner/Spinner'


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

  return (
    <div style={{'margin':'0 auto'}}>
      {loading && <Spinner/> }
      {error && <h1>{error.message}</h1> }
      {(location!==undefined && location.locationName) &&
        <div className={styles.content}>

          <div className={styles.content__locationInfo}>
            <h2 style={{paddingBottom:'0'}}>{location.locationName}</h2>
            <div>
              <p style={{paddingTop:"10px",fontSize:"16px"}}>{location.desc}</p>
            </div>
          </div>

          <div className={styles.content__locationPrograms}>
            <h3>{`${location.locationName}'s Contact Info`}</h3>
            {/* <a href={location.locationWebsite}>{location.locationWebsite}</a>
            <p>{location.locationEmail}</p>
            <p>{location.locationPhoneNumber}</p> */}
            <div className={styles.content__locationContact}>
              {location.locationEmail&& <p><i className="fas fa-envelope"></i >{location.locationEmail}</p> }
              {location.locationPhoneNumber&& <p><i className="fas fa-phone"></i>{location.locationPhoneNumber}</p> }
              {location.locationWebsite&& <p className={styles.websiteLink}><i className="fas fa-desktop"></i><a href={location.locationWebsite} style={{'color':'#00205c'}}>{location.locationWebsite}</a></p> }
              {location.GeoJson.streetName && (
                <div className={styles.content__address}>
                  <p><i className="fas fa-map-marked"></i>{location.GeoJson.streetName} {location.GeoJson.city}, {location.GeoJson.stateCode} {location.GeoJson.zipcode}</p>
                </div>
              ) }

              {/* {location.address&& <p>{location.address}</p> } */}
            </div>
          </div>

          {/* <div className={styles.content__locationPrograms}>
            <h3>{`Programs at ${location.locationName} (${location.programs.length})`}</h3>
            <ul>
              {location.programs.map(program=>{
                return <li key={program._id}> <Link to={`/programs/${program._id}`} >{program.programName}</Link></li>
              })}
            </ul>
          </div> */}

        </div>
      }
    </div>
  )
}

export default SingleLocationScreen
