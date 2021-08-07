import {
  MAP_LIST_TOGGLE
} from '../constants/mapListConstants'

export const mapListToggleReducer = (state=false,action) =>{
  switch (action.type) {
    case MAP_LIST_TOGGLE:
      return {mapList:action.payload}
      
    default:
      return state
  }
}