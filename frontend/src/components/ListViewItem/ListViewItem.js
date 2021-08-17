import React,{useState} from 'react'
import styles from './ListViewItem.module.css'
import {NavLink} from 'react-router-dom'

const ListViewItem = ({location}) => {
  //eslint-disable-next-line
  // const [showLocation, setShowLocation] = useState(false)

  return (
    <div className={styles.listViewItem}>
      <div className={styles.itemTitle}>
        <h2> <NavLink className={styles.NavLink} to={`/locations/${location._id}`}>{location.locationName}</NavLink></h2>
        {/* {(program.campusAffiliation && program.campusAffiliation.campusBranchName) && <h3>{program.campusAffiliation.campusBranchName}</h3>} */}
      </div>

      <div className={styles.itemContent}>
        <div className={styles.itemDescription}>
          <p>{location.desc}</p>
        </div>

        <div className={styles.itemContact}>
          {location.locationPhoneNumber && <p style={{'fontWeight':'600','paddingBottom':'5px'}}><i style={{'paddingRight':'5px'}} className="fas fa-phone"></i>{location.locationPhoneNumber}</p>}
          {location.locationEmail && <p><i style={{'paddingRight':'5px'}} className="fas fa-envelope"></i >{location.locationEmail}</p>}
        </div>
      </div>
      {/* {program.locations.length > 1 && 
        <div className={styles.itemPartners} onClick={()=>setShowLocation(!showLocation)}>
            {showLocation ? 
            <ul>
              {program.locations.map(location=>{
                return <li key={location._id} ><NavLink to={`/locations/${location._id}`}>{location.locationName}</NavLink></li>
              })}
            </ul> 
            : 
            <p>{`${program.locations.length} partners` }</p> }
        </div>
      } */}

    </div>
  )
}

export default ListViewItem
