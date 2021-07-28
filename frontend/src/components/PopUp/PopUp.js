import React from 'react'
import styles from './PopUp.module.css'

const PopUp = ({history,properties}) => {
  console.log(properties)
  // uses history to link to the other component bc this component is outside of the router
  const onClick = (id)=>{
    history.push(`/locations/${id}`)
  }

  return (
    <>
      <div className={styles.popup__card}>
        <p className={styles.popup__heading}>Location</p>
        <h3 className={styles.popup__location} onClick={()=>onClick(properties.id)}>{properties.locationName}</h3>
        <p className={styles.popup__streetAddress}>{properties.streetName}</p>
        <p className={styles.popup__cityZip}>{`${properties.city} ${properties.stateCode}${properties.zipcode ?', '+properties.zipcode:console.log(properties.zip)}`}</p>
      </div>
    </>
  )
}

export default PopUp
