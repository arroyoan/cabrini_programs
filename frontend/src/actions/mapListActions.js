import {
  MAP_LIST_TOGGLE
} from '../constants/mapListConstants'

export const toggleMapList = () => (dispatch,getState) =>{
  const {mapList} = getState().mapListToggle
  dispatch({
    type: MAP_LIST_TOGGLE,
    payload: !mapList
  })
}
