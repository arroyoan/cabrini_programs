// eslint-disable-next-line
import React, {useEffect} from 'react'
import styles from './ListViewScreen.module.css'
import {useDispatch,useSelector} from 'react-redux'

// eslint-disable-next-line
import { listPrograms } from '../../actions/programActions'
import ListViewItem from '../../components/ListViewItem/ListViewItem'

const ListViewScreen = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch()

  // selects the program list from the state
  const programList = useSelector(state => state.programList)
  const {/*loading, error,*/ programs/*, documentCount*/} = programList

  // loads the program list based on the filters the user selected
  // useEffect(()=>{
  //   dispatch(listPrograms())
  // },[dispatch])

  return (
    <div>
      {/* {loading && <h1>Loading...</h1> }
      {error && <h1>{error.message}</h1> } */}
      {programs && 
      <div className={styles.listViewItems}>
        {/* <div>{`Showing ${documentCount} of ${documentCount}`}</div> */}
        {programs.map((program)=>{
          return <ListViewItem key={program._id} program={program}/>
        })}
      </div>}
    </div>
  )
}

export default ListViewScreen
