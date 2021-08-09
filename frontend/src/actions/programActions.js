import axios from 'axios'

import {
  PROGRAM_LIST_REQEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  SINGLE_PROGRAM_REQEST,
  SINGLE_PROGRAM_SUCCESS,
  SINGLE_PROGRAM_FAIL
} from '../constants/programConstants'

export const listPrograms = (keyword='',program='',partner='') => async (dispatch)=> {
  try {
    dispatch({type:PROGRAM_LIST_REQEST})

    console.log(keyword)
    console.log(program)
    console.log(partner);

    const {data} = await axios.get(`/api/v1/programs?keyword=${keyword}&program=${program}&partner=${partner}`)

    console.log(data);
    
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

export const getSingleProgram = (id) => async (dispatch) => {
  try {
    dispatch({type:SINGLE_PROGRAM_REQEST})

    const {data} = await axios.get(`/api/v1/programs/${id}`)
    
    dispatch({
      type:SINGLE_PROGRAM_SUCCESS,
      payload:data
    })

  } catch (error) {
    dispatch({
      type:SINGLE_PROGRAM_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}