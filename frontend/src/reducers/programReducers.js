import {
  PROGRAM_LIST_REQEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  SINGLE_PROGRAM_REQEST,
  SINGLE_PROGRAM_SUCCESS,
  SINGLE_PROGRAM_FAIL
} from '../constants/programConstants'

export const programListReducer = (state = { progams:[] }, action) =>{
  switch (action.type) {
    case PROGRAM_LIST_REQEST:
      return {loading:true,programs:[]}
      
    case PROGRAM_LIST_SUCCESS:
      return {
        loading:false,
        programs:action.payload.programs,
        documentCount:action.payload.documentCount
      }
    case PROGRAM_LIST_FAIL:
      return {loading:false,error:action.payload}
    default:
      return state
  }
}

export const singleProgramReducer = (state={program:{}},action) =>{
  switch (action.type) {
    case SINGLE_PROGRAM_REQEST:  
      return {loading:true, program:{}}

    case SINGLE_PROGRAM_SUCCESS:
      return {
        loading:false,
        program: action.payload,
      }
    
    case SINGLE_PROGRAM_FAIL:
      return {
        loading:false,
        error:action.payload
      }
  
    default:
      return state;
  }
}