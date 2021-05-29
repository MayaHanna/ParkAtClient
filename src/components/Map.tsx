
import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {Coords} from "google-map-react";
import { Geolocation } from '@ionic-native/geolocation';
import { useSelector } from "react-redux";
import { RootState } from '../data/configureStore';
import { FullParkingOffer, ParkingOffersMapParams } from '../data/parkings-offers-module/types';
import { fullParkingsOffersWithFilterSelector } from '../data/parkings-offers-module/selectors';
import { useHistory } from 'react-router';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const initialCenter: Coords = {
    lat: 31.970021633983528, 
    lng: 34.77273508410942
};

interface MapWrapperProps {
    filterParams?: ParkingOffersMapParams
}

function getBaseLog(x: number, y: number) {
    return Math.log(y) / Math.log(x);
} 

const greenLocationIconUrl = "https://i.ibb.co/VtLx9jj/park-1.png";
const blueLocationIconUrl = "https://i.ibb.co/McX0jGk/park.png";

const MapWrapper: React.FC<MapWrapperProps> = ({filterParams}) => {
    const history = useHistory();
    const {isLoaded} = useJsApiLoader({
        id: 'ParkAt',
        googleMapsApiKey: "AIzaSyAe1Rhuj_BjDOoiqc3qF39_FOGFhd78d5Q",
        libraries: ["places"]
    });

    const parkingOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithFilterSelector(state, filterParams).filter(po=>po.status=== "Open"));
    const [center, setCenter] = useState<Coords>(filterParams?.centerLocation ? filterParams?.centerLocation : initialCenter);
    const [zoom, setZoom] = useState<number>(15);

    useEffect(() => {
        if(!!center)
            Geolocation.getCurrentPosition().then(position =>{
                setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            });
    });

    useEffect(() => {
        setCenter(filterParams?.centerLocation ? filterParams?.centerLocation : center);
    }, [filterParams?.centerLocation]);

    useEffect(() => {
        if(!!filterParams?.maxDistanceFromCenter){
            setZoom(getBaseLog(2, 40000 / (filterParams?.maxDistanceFromCenter  / 2)))
        }
    }, [filterParams?.maxDistanceFromCenter]);

    console.log(parkingOffers);
    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
            {parkingOffers.map((po, k) =>
             <Marker position={po.parking.location}
                onClick={e=> history.push(`/parkingOffer/${po.id}?canAddComment=${false}&canAddImage=${false}`)}
                icon={po.parking.isPrivate ? greenLocationIconUrl : blueLocationIconUrl}
            />)}
            <></>
        </GoogleMap>
    ) : <></>;
      }

export default React.memo(MapWrapper);