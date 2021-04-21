
import React, { useCallback, useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker,  } from '@react-google-maps/api';
import {Coords, Size, Point} from "google-map-react";
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonLoading, IonToast } from '@ionic/react';
import { carOutline } from 'ionicons/icons';
import {ReactComponent as BigParking} from "../resources/truck.svg";
import {ReactComponent as SmallParking} from "../resources/car.svg";
import { getParkings } from "../data/parkings-module/actions";
import { useDispatch, useSelector } from "react-redux";
import { parkingsSelector } from '../data/parkings-module/selectors';
import { RootState } from '../data/configureStore';
import { Parking } from '../data/parkings-module/types';


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
        googleMapsApiKey: "AIzaSyAe1Rhuj_BjDOoiqc3qF39_FOGFhd78d5Q",
        libraries: ["places"]
    });

    const parkings: Parking[] = useSelector((state: RootState) => parkingsSelector(state));
        
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
            {parkings.map(parking => <Marker position={parking.location}></Marker>)}
            <></>
        </GoogleMap>
    ) : <></>;
      }

export default React.memo(MapWrapper);