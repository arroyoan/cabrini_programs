import React from 'react'
import styles from './ListViewScreen.module.css'
import {useSelector} from 'react-redux'

import ListViewItem from '../../components/ListViewItem/ListViewItem'

const ListViewScreen = () => {


  // selects the program list from the state
  const programList = useSelector(state => state.programList)
  const { programs } = programList

  return (
    <div>
      {programs && 
      <div className={styles.listViewItems}>
        {programs.map((program)=>{
          return <ListViewItem key={program._id} program={program}/>
        })}
      </div>}
    </div>
  )
}

export default ListViewScreen
