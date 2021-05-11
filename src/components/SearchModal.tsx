import {
    IonItem,
    IonLabel,
    IonNote,
    IonCard,
    IonText,
    IonInput,
    IonButtons,
    IonIcon,
    IonSelect,
    IonSelectOption
  } from '@ionic/react';
  import './SearchModal.css';
  import { add, locationOutline, search } from 'ionicons/icons';
  import { Parking } from "../data/parkings-module/types";
  import { ReactComponent as BigParking } from "../resources/truck.svg";
  import { ReactComponent as SmallParking } from "../resources/car.svg";
import { useEffect, useState } from 'react';
import { Coords } from 'google-map-react';
import { findLocationByAddress } from '../data/location-module/api';
import { ParkingOffersMapParams } from '../data/parkings-offers-module/types';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';

interface SearchModaProps {
    search: (search: ParkingOffersMapParams) => void
}


const SearchModal: React.FC<SearchModaProps> = ({search}) => {
    const [location, setLocation] = useState<Coords>();
    const [address, setAddress] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<number>();
    const [maxDistance, setMaxDistance] = useState<number>();
    const [parkingTypes, setParkingTypes] = useState<string[]>(["private", "public"]);
    
    const [addressPlaceHolder, setAddressPlaceHolder] = useState<string>("");
    const [disableAddressInput, setDisableAddressInput] = useState<boolean>(false);

    const updateLocationByCurrentPoistion = () => {
        setAddressPlaceHolder("טוען מיקום נוכחי...");
        setDisableAddressInput(true)
        return Geolocation.getCurrentPosition().then(position =>{
            setLocation({lat: position.coords.latitude, lng: position.coords.longitude}  as Coords);
            setAddress("מיקום נוכחי");
        }).finally(()=> setDisableAddressInput(false));
    }

    const onSearch= () => {
        if(!!address && !location)
            findLocationByAddress(address)
            .then(coords=>{
                setLocation(coords);
                sendSearch(coords);
            })
        else
            sendSearch(location as Coords);
    }

    const sendSearch = (c : Coords) => {
        search({
            centerLocation: c,
            ignorePrivate: !parkingTypes.includes("private"),
            ignorePublic: !parkingTypes.includes("public"),
            maxDistanceFromCenter: maxDistance,
            maxPrice: maxPrice
            } as ParkingOffersMapParams)
    }

    return (
      <IonCard className={"searchModal"}>
        <IonItem className="searchRow">
            <IonLabel color="primary">כתובת</IonLabel>
            <IonInput color="primary" inputmode="text" value={address} onIonChange={e => setAddress(e.detail.value!)} placeholder={addressPlaceHolder} disabled={disableAddressInput}></IonInput>
            <IonIcon icon={locationOutline} color="primary" onClick={e=> updateLocationByCurrentPoistion()}></IonIcon>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary"> מחיר מקסימלי</IonLabel>
            <IonInput color="primary" type="number" value={maxPrice} placeholder="הכנס מספר" onIonChange={e => setMaxPrice(parseInt(e.detail.value!, 10))}></IonInput>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary">טווח רצוי מהכתובת</IonLabel>
            <IonInput color="primary" type="number" value={maxDistance} placeholder="הכנס מספר" onIonChange={e => setMaxDistance(parseInt(e.detail.value!, 10))}></IonInput>
            <IonLabel color="primary">ק"מ</IonLabel>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary">סוג חניה</IonLabel>
            <IonSelect value={parkingTypes} multiple={true} cancelText="ביטול" okText="אישור" onIonChange={e => setParkingTypes(e.detail.value)}>
              <IonSelectOption value="public" >ציבורית</IonSelectOption>
              <IonSelectOption value="private" >פרטית</IonSelectOption>
            </IonSelect>
        </IonItem>
        <button className={"searchButton"} onClick={e => onSearch()} disabled={disableAddressInput}>חפש</button>
    </IonCard>
    );
  };
  
  export default SearchModal;
  