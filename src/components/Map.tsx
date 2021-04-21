
import React, { useCallback, useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker,  } from '@react-google-maps/api';
import {Coords, Size, Point} from "google-map-react";
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonLoading, IonToast } from '@ionic/react';
import { carOutline } from 'ionicons/icons';
import {ReactComponent as BigParking} from "../resources/truck.svg";
import {ReactComponent as SmallParking} from "../resources/car.svg";


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
        googleMapsApiKey: "AIzaSyAe1Rhuj_BjDOoiqc3qF39_FOGFhd78d5Q"
    });

    const parkings: Coords[] = [
        { lat: 32.023004577099655, lng: 34.76947814192939 },
        { lat: 32.02536958076407, lng: 34.769403040079816 },
        { lat: 32.02541506100541, lng: 34.7700896855616 }
    ];
        
    const [center, setCenter] = useState<Coords>(initialCenter);

    useEffect(() => {
        Geolocation.getCurrentPosition().then(position =>{
            setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        }).catch(e=> {
            // TODO: Throw error
            setCenter({lat: 31.970021633983528, lng: 34.77273508410942});
        });
    });

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            { /* Child components, such as markers, info windows, etc. */ }
            {parkings.map(coord => <Marker position={coord}></Marker>)}
            <></>
        </GoogleMap>
    ) : <></>;
      }

export default React.memo(MapWrapper);