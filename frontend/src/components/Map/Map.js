import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import styles from './Map.module.css'
import PopUp from '../PopUp/PopUp'

mapboxgl.accessToken = "pk.eyJ1IjoiYW5vZWwxMjE0IiwiYSI6ImNrcmZhZjRucjV2MnoycG1mOGttempuOHkifQ.vv0SKucOmqui3LeYloubQQ"

const Map = ({history,locations}) => {

  // defaults for the map
  const mapContainer = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ className:styles.mapbox_popup_content,offset: 15 }));

  useEffect(() => {
    console.log('hello');
    const map = new mapboxgl.Map({
      container:mapContainer.current,
      center:[-75.37415783339138,40.056082679718784],
      zoom:11,
      style:'mapbox://styles/mapbox/streets-v11',
      dragRotate:false
    })

    const data = createDataPoints()

    map.on('load', ()=>{
      map.addSource('partner-locations',{
        type:'geojson',
        data:data
      })

      map.addLayer({
        id:'locations',
        type:'circle',
        source:'partner-locations',
        paint:{
          "circle-color":"#FFF",
          "circle-radius":7,
          "circle-stroke-color":"#00205c",
          "circle-stroke-width": 3
        }
      })
    })

    map.on('click',e =>{
      const features = map.queryRenderedFeatures(e.point,{
        layers:["locations"]
      })

      if(features.length > 0){
        const feature = features[0]
        const popupNode = document.createElement('div')
        ReactDOM.render(
          <PopUp 
            history={history}
            properties = {feature.properties}
          />, popupNode
        )
        popUpRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map)
      }
    })

    return ()=>map.remove()

  }, [locations])

  const createDataPoints = ()=>{
    const features = locations.map(location =>{
      return {
              "type":"Feature",
              "geometry":{
                "type":"Point",
                "coordinates":[location.GeoJson.longitude,location.GeoJson.latitude]
              },
              "properties":{
                "id":`${location._id}`,
                "locationName":`${location.locationName}`,
                "streetName":`${location.GeoJson.streetName}`,
                "city":`${location.GeoJson.city}`,
                "stateCode":`${location.GeoJson.stateCode}`,
                "zipcode":`${location.GeoJson.zipcode}`,
                "programs":`${location.programs}`
              }
            }
    })

    const data = {
      "type":"FeatureCollection",
      "features":features
    }

    return data
  }

  return (
    <div className={styles.mapContainer}>
      {/* {error && <h1>Trouble loading data points for map</h1> } */}
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  )
}

export default Map
