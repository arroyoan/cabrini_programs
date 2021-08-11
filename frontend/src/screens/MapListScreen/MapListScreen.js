import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

import { listPrograms } from '../../actions/programActions'
import ListViewScreen from '../listView/ListViewScreen'
import MapViewScreen from '../mapView/MapViewScreen'
import Spinner from '../../components/Spinner/Spinner'


const MapListScreen = () => {
  let location =useLocation()
  const dispatch = useDispatch()

  // selects the program list from the state
  const programList = useSelector(state => state.programList)
  const {loading, error, programs/*, documentCount*/} = programList

  const mapListToggle = useSelector(state => state.mapListToggle)
  const {mapList} = mapListToggle

  
  let keyword,program,partner;

  if(location.search){
    let [kW,pG,pT] = location.search.replace('?','').split('&')
    keyword = kW.split('=')[1] || ''
    program = pG.split('=')[1] || ''
    partner = pT.split('=')[1] || ''
  } 

  // the locations array to be passed to mapview
  let locations = []

  // loads the program list based on the filters the user selected
  useEffect(()=>{
    dispatch(listPrograms(keyword,program,partner))
  },[dispatch,location])

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
      {loading && <Spinner/> }
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
