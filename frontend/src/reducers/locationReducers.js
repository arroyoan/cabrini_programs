import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  SINGLE_LOCATION_REQUEST,
  SINGLE_LOCATION_SUCCESS,
  SINGLE_LOCATION_FAIL
} from '../constants/locationConstants'


export const locationListReducer = (state = {locations:[]}, action) => {
  switch (action.type) {
    case LOCATION_LIST_REQUEST:
      return {loading:true,locations:[]}
    
    case LOCATION_LIST_SUCCESS:
      return {loading: false, locations:action.payload.locations}

    case LOCATION_LIST_FAIL:
      return {loading: false, error:action.payload}
  
    default:
      return state
  }
}

export const singleLocationReducer =(state={location:{}},action)=>{
  switch (action.type) {
    case SINGLE_LOCATION_REQUEST:
      return {loading:true,location:{}}
    case SINGLE_LOCATION_SUCCESS:
      return {loading:false,location:action.payload}
    case SINGLE_LOCATION_FAIL:
      return {loading:false, error:action.payload}
    default:
      return state
  }
}