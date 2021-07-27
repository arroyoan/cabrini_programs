import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useSelector, useDispatch} from 'react-redux'

import styles from './Map.module.css'
import {listLocations} from '../../actions/locationActions'

console.log(process.env.REACT_APP_MAPBOX)

mapboxgl.accessToken = "pk.eyJ1IjoiYW5vZWwxMjE0IiwiYSI6ImNrcmZhZjRucjV2MnoycG1mOGttempuOHkifQ.vv0SKucOmqui3LeYloubQQ"

const Map = () => {
   const dispatch = useDispatch();

   const locationList = useSelector(state => state.locationList)
   const {error,locations} = locationList
 
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng =  -75.37415783339138;
  const lat= 40.056082679718784;
  const zoom = 11;


  useEffect(()=>{
    dispatch(listLocations())
  },[dispatch])

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
    if(!map.current || !locations || locations.length === 0){
      console.log("does it go here")
      return 
    }

    // iterates throught locations and reshapes the data to for adding it as a marker on the map
    const features = createFeatures()

    // console.log(map)
    // console.log(features)

    
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
        // console.log(location.geometry.coordinates)
        const el = document.createElement('div')
        el.className=styles.marker

        // // add event listener for each map
        // el.addEventListener('click',(e)=>{
        //   //console.log(location)
        //   //createPopUp(location)
        // })
        // add the marker to the new layer on the map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.geometry.coordinates)
          .addTo(map.current)
       // console.log(marker)
  })

  // eslint-disable-next-line
  },[locations,map])

  useEffect(()=>{
    map.current.on('click','locations',(e)=>{
      console.log('it is in here')
      console.log(e)
      console.log(e.features[0])

      const popups = document.getElementsByClassName('mapboxgl-popup')
      if(popups[0]) popups[0].remove();
      const popup= new mapboxgl.Popup({className:styles.mapboxgl_pop_content})
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML("<h1>Hello World!</h1>")
        .addTo(map.current)

    })
  },[map])

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
        }
      }
    })
  }

  const createPopUp = (feature)=>{
    const popups = document.getElementsByClassName('mapboxgl-popup')
    console.log(popups)

    if(popups[0]) popups[0].remove();
    console.log('about to create the popup')
    const popup= new mapboxgl.Popup({className:styles.mapboxgl_pop_content})
      .setLngLat(feature.geometry.coordinates)
      .setHTML("<h1>Hello World!</h1>")
      .addTo(map.current)

    console.log(popup)
    console.log(map.current)
  }

  return (
    <div className={styles.mapContainer}>
      {error && <h1>Trouble loading data points for map</h1> }
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  )
}

export default Map
