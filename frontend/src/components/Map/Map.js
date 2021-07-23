import React,{useState} from 'react'
import ReactMapGL, {Layer,Feature} from 'react-map-gl'

const Map = () => {
  const [viewPort,setViewPort] = useState({
    width:"100%",
    height:"100%",
    //center:[40.056082679718784,-75.37415783339138],
    latitude: 40.056082679718784,
    longitude: -75.37415783339138,
    zoom: 9,
    moveMethod:'easeTo'
  })

  return (
    <>
      {console.log('hello')}
      <ReactMapGL 
        {...viewPort} 
        mapboxApiAccessToken="pk.eyJ1IjoiYW5vZWwxMjE0IiwiYSI6ImNrcmZhZjRucjV2MnoycG1mOGttempuOHkifQ.vv0SKucOmqui3LeYloubQQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange = {nextViewPort => setViewPort(nextViewPort)} />
    </>
  )
}

export default Map
