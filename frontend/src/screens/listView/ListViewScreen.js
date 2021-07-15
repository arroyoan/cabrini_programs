import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { listPrograms } from '../../actions/programActions'

const ListViewScreen = () => {
  const dispatch = useDispatch()

  // selects the program list from the state
  const programList = useSelector(state => state.programList)
  const {loading, error, programs} = programList

  // loads the program list based on the filters the user selected
  useEffect(()=>{
    dispatch(listPrograms())
  },[dispatch])

  return (
    <div>
      <h2>Confirmation that this is loading</h2>
      {loading ? <h1>Loading...</h1> : console.log(programs)}
      {error && <h1>{error.message}</h1> }
    </div>
  )
}

export default ListViewScreen
