import axios from "axios"
import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  SINGLE_LOCATION_REQUEST,
  SINGLE_LOCATION_SUCCESS,
  SINGLE_LOCATION_FAIL
} from '../constants/locationConstants'

export const listLocations = (keywords='',programs='',partners='') => async (dispatch)=>{
  try {
    dispatch({type: LOCATION_LIST_REQUEST})

    const {data} = await axios.get(`/api/v1/locations/`)

    dispatch({
      type:LOCATION_LIST_SUCCESS,
      payload:data
    })

  } catch (error) {
    dispatch({
      type:LOCATION_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message 
        : error.message
    })
  }
}

export const getLocation = (id) => async (dispatch)=>{
  try {
    dispatch({type:SINGLE_LOCATION_REQUEST})

    const {data} = await axios.get(`/api/v1/locations/${id}`)

    dispatch({
      type:SINGLE_LOCATION_SUCCESS,
      payload:data
    })
  } catch (error) {
    console.error(error)
    dispatch({
      type:SINGLE_LOCATION_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}