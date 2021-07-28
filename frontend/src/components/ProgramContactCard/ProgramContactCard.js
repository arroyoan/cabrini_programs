import React from 'react'
import styles from './ProgramContactCard.module.css'

const ProgramContactCard = ({title, info}) => {

  return (
    <div className={styles.contactInfo}>
      <h3>{title}</h3>
      {info.contact&& <p>{info.contact}</p> }
      {info.email&& <p><i className="fas fa-envelope"></i >{info.email}</p> }
      {info.phoneNumber&& <p><i className="fas fa-phone"></i>{info.phoneNumber}</p> }
      {info.website&& <p className={styles.websiteLink}><a href={info.website}>{info.website}</a> <i className="fas fa-external-link-alt"></i></p> }
      {info.address&& <p>{info.address}</p> }
    </div>
  )
}

export default ProgramContactCard
