import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import  * as parksData from './Data/parks.json'


export default function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  return (
    <>
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat:39.727908, lng:-104.967928 }}

      >
      {parksData.parks.map(park => {
        return (
          <Marker
             key={park.LOC_CODE}
             position={{ lat: park.LATITUDE, lng: park.LONGITUDE}}
             onClick={() => {
               setSelectedPark(park);
             }}
             icon={{
               url:'/park-svgrepo-com.svg',
               scaledSize: new window.google.maps.Size(25, 25)
             }}
             />

        )
      })}
      {selectedPark && (
        <InfoWindow
             onCloseClick={() => {
               setSelectedPark(null);
             } }
             position={{ lat: selectedPark.LATITUDE, lng: selectedPark.LONGITUDE}}
          >
          <div>
            <h2>{selectedPark.FORMAL_NAME}</h2>
            <p>{selectedPark.ADDRESS_LINE1}</p>
            <h4>Features</h4>
            <p>{selectedPark.FACILITIES}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </>
  )
}
