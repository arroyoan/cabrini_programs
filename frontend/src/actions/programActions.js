import axios from 'axios'

import {
  PROGRAM_LIST_REQEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL
} from '../constants/programConstants'

export const listPrograms = (keywords='',programs='',partners='') => async (dispatch)=> {
  try {
    dispatch({type:PROGRAM_LIST_REQEST})

    const {data} = await axios.get(`/api/v1/programs/`)
    dispatch({
      type:PROGRAM_LIST_SUCCESS,
      payload:data
    })
    
  } catch (error) {
    console.error(error)
    dispatch({
      type:PROGRAM_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}