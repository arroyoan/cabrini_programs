import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import styles from './Map.module.css'
import PopUp from '../PopUp/PopUp'

mapboxgl.accessToken = "pk.eyJ1IjoiYW5vZWwxMjE0IiwiYSI6ImNrcmZhZjRucjV2MnoycG1mOGttempuOHkifQ.vv0SKucOmqui3LeYloubQQ"

const Map = ({history,locations}) => {

  // defaults for the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ className:styles.mapbox_popup_content,offset: 15 }));
  const lng =  -75.37415783339138;
  const lat= 40.056082679718784;
  const zoom = 11;

  // creates the map if it doesnt exist
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      dragRotate:false,
    });
  });
  
  // adds the markers to the map if map is loaded and locations are loaded
  useEffect(()=>{
    // if the map or locations dont exist it returns nothing
    if(!map.current || !locations || locations.length === 0){
      return 
    }

    // iterates throught locations and reshapes the data to for adding it as a marker on the map
    const features = createFeatures()
    
    // strucure needed to for add layer function
    const mapLocations = {
      "type":"FeatureCollection",
      "features":features
    }

    // when the map finishes loading styles it adds a new layer with id locations
    map.current.on('load',(e)=>{
      map.current.addLayer({
        'id':'locations',
        'type':'circle',
        'source':{
          'type':'geojson',
          'data':mapLocations
        }
      })
    })
    
    // creates an empty div for each marker
      mapLocations.features.forEach(location=>{
        // creates empty div and adds the marker styles
        const el = document.createElement('div')
        el.className=styles.marker

        // creates new marker, sets its coordinates, and adds it to the map
        // eslint-disable-next-line
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.geometry.coordinates)
          .addTo(map.current)
  })

  // eslint-disable-next-line
  },[locations,map])

  // handles the display of popups when markers are clicked
  useEffect(()=>{
    // when a location point is clicked it centers the map to the point and shows a popup
    map.current.on('click','locations',(e)=>{
      const popups = document.getElementsByClassName('mapboxgl-popup')
      console.log(popups);

      // if there is a popup already open it removes that popup
      if(popups[0]) 
        popups[0].remove()

      flyTo(e.features[0].geometry.coordinates)
      // create a popup component
      const popupnode = document.createElement('div')
      ReactDOM.render(<PopUp history={history} properties={e.features[0].properties}/>, popupnode)
      popUpRef.current.setLngLat(e.features[0].geometry.coordinates).setDOMContent(popupnode).addTo(map.current)
    })
  },[map,history])

  // helper function to structure location data appropriately
  const createFeatures = ()=>{
    return locations.map(location=>{
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
  }

  // helper function that centers the map on the clicked marker
  const flyTo = (coords)=>{
    map.current.flyTo({
      center: coords,
      zoom: zoom,
      speed: 0.2,
      });
  }

  return (
    <div className={styles.mapContainer}>
      {/* {error && <h1>Trouble loading data points for map</h1> } */}
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  )
}

export default Map
