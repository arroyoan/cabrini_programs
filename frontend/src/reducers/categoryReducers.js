import {
  CATEGORY_LIST_REQEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/categoryConstants'

export const categoryListReducer = (state=[],action) =>{
  switch (action.type) {
    case CATEGORY_LIST_REQEST:
      return {loading:true,categories:[]}

    case CATEGORY_LIST_SUCCESS:
      return {loading:false, categories:action.payload}

    case CATEGORY_LIST_FAIL:
      return {loading:false, error:action.payload}
      
    default:
      return state
  }
}