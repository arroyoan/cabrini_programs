import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'

import {
  programListReducer,
  singleProgramReducer,
} from './reducers/programReducers'

import {
  locationListReducer,
  singleLocationReducer
} from './reducers/locationReducers'

import {
  mapListToggleReducer
} from './reducers/mapListReducers'

import {
  categoryListReducer
} from './reducers/categoryReducers'

import thunk from 'redux-thunk'

import {
  composeWithDevTools
} from 'redux-devtools-extension'

// combines all the reducers together
const reducer = combineReducers({
  programList:programListReducer,
  singleProgram:singleProgramReducer,
  locationList:locationListReducer,
  singleLocation:singleLocationReducer,
  mapListToggle:mapListToggleReducer,
  categoryList:categoryListReducer,
})

// creates an initial state from objects in local storage if there are any
const initialState = {}

// places middleware into an array that will be used in the store and applied by applyMiddleware
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store


