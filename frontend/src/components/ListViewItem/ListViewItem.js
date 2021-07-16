import React,{useState} from 'react'
import styles from './ListViewItem.module.css'

const ListViewItem = ({program}) => {
  const [showLocation, setShowLocation] = useState(false)
  return (
    <div className={styles.listViewItem}>
      <div className={styles.itemTitle}>
        <h2>{program.programName}</h2>
        <h3>{program.campusAffiliation.campusBranchName}</h3>
      </div>
      <div className={styles.itemContent}>
        <div className={styles.itemDescription}>
          <p>{program.description.blurb}</p>
        </div>
        <div className={styles.itemContact}>
          <p>{program.programEmail}</p>
          <p>{program.programPhoneNumber}</p>
        </div>
      </div>
      <div className={styles.itemPartners} onClick={()=>setShowLocation(!showLocation)}>
          {showLocation  ? 
          <ul>
            {program.locations.map(location=>{
              return <li key={location._id}>{location.locationName}</li>
            })}
          </ul> 
          : 
          <p>{`${program.locations.length} partners` }</p> }
      </div>

    </div>
  )
}

export default ListViewItem
