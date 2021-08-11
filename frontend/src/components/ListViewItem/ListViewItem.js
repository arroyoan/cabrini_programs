import React,{useState} from 'react'
import styles from './ListViewItem.module.css'
import {NavLink} from 'react-router-dom'

const ListViewItem = ({program}) => {
  const [showLocation, setShowLocation] = useState(false)

  return (
    <div className={styles.listViewItem}>
      <div className={styles.itemTitle}>
        <h2> <NavLink className={styles.NavLink} to={`/programs/${program._id}`}>{program.programName}</NavLink></h2>
        {(program.campusAffiliation && program.campusAffiliation.campusBranchName) && <h3>{program.campusAffiliation.campusBranchName}</h3>}
      </div>

      <div className={styles.itemContent}>
        <div className={styles.itemDescription}>
          <p>{program.description.blurb}</p>
        </div>

        <div className={styles.itemContact}>
          {program.programPhoneNumber && <p style={{'fontWeight':'600','paddingBottom':'5px'}}><i style={{'paddingRight':'5px'}} className="fas fa-phone"></i>{program.programPhoneNumber}</p>}
          {program.programEmail && <p><i style={{'paddingRight':'5px'}} className="fas fa-envelope"></i >{program.programEmail}</p>}
        </div>
      </div>
      {program.locations.length > 1 && 
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
      }

    </div>
  )
}

export default ListViewItem
