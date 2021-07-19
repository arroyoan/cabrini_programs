import React from 'react'
import styles from './ProgramDetailCard.module.css'

const ProgramDetailCard = ({title,content}) => {
  return (
    <div className={styles.programCard} >
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}

export default ProgramDetailCard
