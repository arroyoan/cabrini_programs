import axios from 'axios'
import {
  CATEGORY_LIST_REQEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/categoryConstants'

export const getCategories =  () => async (dispatch) =>{
  try {
    dispatch({type:CATEGORY_LIST_REQEST})

    const {data} = await axios.get(`/api/v1/categories/`)

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    console.error(error);
    dispatch({
      type:CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}