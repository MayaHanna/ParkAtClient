
import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {Coords} from "google-map-react";
import { Geolocation } from '@ionic-native/geolocation';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const initialCenter: Coords = {
    lat: 31.970021633983528, 
    lng: 34.77273508410942
};

const MapWrapper: React.FC = () => {

    const {isLoaded} = useJsApiLoader({
        id: 'ParkAt',
        googleMapsApiKey: "AIzaSyBLOYIVFpldCMdD67yaIlqz21gPc9qqEUI"
    });
        
    const [center, setCenter] = useState<Coords>(initialCenter);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
    ) : <></>;
      }

export default React.memo(MapWrapper);