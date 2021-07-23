import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './Map.module.css'

mapboxgl.accessToken = "pk.eyJ1IjoiYW5vZWwxMjE0IiwiYSI6ImNrcmZhZjRucjV2MnoycG1mOGttempuOHkifQ.vv0SKucOmqui3LeYloubQQ"

const TestMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.37415783339138);
  const [lat, setLat] = useState(40.056082679718784);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

  return (
    <div className={styles.mapContainer}>
      {console.log('hello')}
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  )
}

export default TestMap
