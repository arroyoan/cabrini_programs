import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { listPrograms } from '../../actions/programActions'
import ListViewScreen from '../listView/ListViewScreen'
import MapViewScreen from '../mapView/MapViewScreen'

const MapListScreen = () => {
  const dispatch = useDispatch()

  // selects the program list from the state
  const programList = useSelector(state => state.programList)
  const {loading, error, programs/*, documentCount*/} = programList

  const mapListToggle = useSelector(state => state.mapListToggle)
  const {mapList} = mapListToggle

  // the locations array to be passed to mapview
  let locations = []

  // loads the program list based on the filters the user selected
  useEffect(()=>{
    dispatch(listPrograms())
  },[dispatch])

  // helper functions
  const getLocations = ()=>{
    // searches through programs locations and adds them to an array, doesnt add duplicates
    const locSet = new Set()
    const locs = []

    for(let i =0; i< programs.length;++i){
      for(let j =0;j<programs[i].locations.length;++j){
        if( !locSet.has( String(programs[i].locations[j]._id) ) ){
          locSet.add(String(programs[i].locations[j]._id))
          locs.push(programs[i].locations[j])
        }
      }
    }
    locations = locs
    locSet.clear()
  }

  // will get array of locations from programs
  if(programs !== undefined ){
    getLocations()
  }


  return (
    <div>
      {loading && <h1>...Loading</h1> }
      {error && <h1>Sorry, there seems to be an error on our side (0_0')!!</h1> }
      {programs !== undefined && (
        mapList 
          ? <MapViewScreen locations={locations}/>
          : <ListViewScreen />
      ) }
    </div>
  )
}

export default MapListScreen
