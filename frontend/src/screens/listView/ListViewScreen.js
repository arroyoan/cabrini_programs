import React from 'react'
import styles from './ListViewScreen.module.css'
import {useSelector} from 'react-redux'

import ListViewItem from '../../components/ListViewItem/ListViewItem'

const ListViewScreen = ({documentCount}) => { 
  // selects the program list from the state
  // const programList = useSelector(state => state.programList)
  // const { programs } = programList
  const locationList = useSelector(state => state.locationList)
  const { locations } = locationList

  console.log(documentCount);

  return (
    <div>
      {locations && 
      <div className={styles.listViewItems}>
        {documentCount && 
          <div className={styles.results}>
            <p>{`Showing 1 - ${documentCount} of ${documentCount} Partners`}</p>
          </div>
        }
        {locations.map((location)=>{
          return <ListViewItem key={location._id} location={location}/>
        })}
      </div>}
    </div>
  )
}

export default ListViewScreen
