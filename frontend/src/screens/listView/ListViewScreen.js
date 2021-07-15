import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { listPrograms } from '../../actions/programActions'

const ListViewScreen = () => {
  const dispatch = useDispatch()

  const programList = useSelector(state => state.programList)
  const {loading, error, programs} = programList

  // this dispatches the listPrograms actiont get all programs from the database
  useEffect(()=>{
    dispatch(listPrograms())
  },[dispatch])

  return (
    <div>
      {loading ? <h1>Loading...</h1> : console.log(programs)}
    </div>
  )
}

export default ListViewScreen
