import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL
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