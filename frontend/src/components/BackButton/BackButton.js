import React from 'react'
import styles from './BackButton.module.css'
import { useHistory } from 'react-router-dom'

const BackButton = () => {
  const history = useHistory()
  const click = (e)=>{
    e.preventDefault()
    console.log(e.target);
    history.goBack()
  }
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={click}><i className="fas fa-arrow-left"></i>Back</button>
    </div>
  )
}

export default BackButton
