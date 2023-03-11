import Map, { LngLat, Marker } from "react-map-gl";
import React, { useEffect } from 'react'
import { getBins } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const listLongLat = useSelector((state: any) => state.bins.bins.map((bin:any) => ({long:bin.long, lat: bin.lat})));
  
  useEffect(() => {
    getBins(dispatch);
  }, []);
  let token =
    "pk.eyJ1IjoiaGVsbG93b3JsZDIwMDEiLCJhIjoiY2xibHpxbG1lMGNkdzNvbDkyajh6cDViOCJ9.4_YKoVFcV2SMHCZ73YwpLA";
  return (
    <Map
    initialViewState={{
      longitude: 105.84,
      latitude: 21,
      zoom: 14,
    }}
    style={{ width:"100vw", height: "100vh", margin: "0 auto" }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={token}
  >
    {listLongLat.map((longLat: any)=>(
      <Marker
      longitude={longLat.long}
      latitude={longLat.lat}
      color="blue"
      anchor="center"
    />
    ))}
  </Map>
  )
}

export default Home