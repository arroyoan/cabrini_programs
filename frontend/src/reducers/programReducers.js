import {
  PROGRAM_LIST_REQEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL
} from '../constants/programConstants'

export const programListReducer = (state = { progams:[] }, action) =>{
  switch (action.type) {
    case PROGRAM_LIST_REQEST:
      return {loading:true,programs:[]}
      
    case PROGRAM_LIST_SUCCESS:
      return {
        loading:false,
        programs:action.payload.programs
      }
    case PROGRAM_LIST_FAIL:
      return {loading:false,error:action.payload}
    default:
      return state
  }
}