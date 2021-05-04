import { useState, useEffect } from 'react';
import { Parking } from "../data/parkings-module/types";
import { addParking } from "../data/parkings-module/api";
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonToolbar,
    useIonViewWillEnter,
    IonInput,
    IonDatetime,
    IonTextarea,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonRow,
    IonCol,
    IonGrid
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './AddParking.css';
import { useDispatch, useSelector } from "react-redux";
import { addParking as addParkingToRudux, getParkings } from "../data/parkings-module/actions";
import axios, { AxiosResponse } from "axios";
import { GoogleMap, useJsApiLoader, Marker,  } from '@react-google-maps/api';
import { User } from '../data/user-module/types';
import { userSelector } from '../data/user-module/selectors';


interface AddParkingProps {
    chooseParking: Function;
    isPublic: boolean;
}

const initializedFields: Parking = {
    name: "",
    id: 7,
    address: "",
    isPrivate: true,
    description: "",
    size: "Small",
    // suittableFor: "motorcycle",
    owner: "",
    comments: [],
    location: {lat: 0, lng: 0}
}

const AddParking: React.FC<AddParkingProps> = ({ chooseParking, isPublic }) => {

    const [parking, setParking] = useState<Parking>({
        ...initializedFields,
        isPrivate: !isPublic
    });
    const loggedInUser: User = useSelector(userSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInUser && loggedInUser.userMailAddress) {
            setParking({
                ...parking,
                owner: loggedInUser.userMailAddress
            })
        }
    }, [loggedInUser]);
    
    const addParkingSpot = () => {
        findLocationByAddress();
        chooseParking(parking);

        addParking(parking)
            .then(res => {
                console.log(" החניה נוספה בהצלחה");
                dispatch(addParkingToRudux(parking));
            })
            .catch(err => console.log(err))
    }

    
    const findLocationByAddress = () => {

        if(isLoaded){
            axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/parkingsOffers/find/`+parking.address)
            .then(res => {
                if(res.data.candidates.length != 1)
                    console.log("todo");
                else{
                    var location  = res.data.candidates[0].geometry.location
                    setParking({
                        ...parking,
                        location: location
                    })
                }
            })
            .catch(err => console.log(err))
        }
    }
    

    const handleFieldChangeByEvent = (e: any) => {
        setParking({
            ...parking,
            [e.target.name]: e.detail.value!
        })
    }

    const handleFieldChange = (field: string, value: any) => {
        setParking({
            ...parking,
            [field]: value
        })
    }
    
    return (
        <form className="formWrapper">
            <IonItem >
                <IonLabel className="labelText">שם חניה</IonLabel>
                <IonInput className="innerText" type="text" name="name" onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
            </IonItem>
            <IonItem >
                <IonLabel className="labelText">כתובת</IonLabel>
                <IonInput className="innerText" type="text" name="address" onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
            </IonItem>
            {
                !isPublic &&
                <IonItem>
                    <IonLabel className="labelText" >סוג חניה </IonLabel>
                    <IonButtons className="itemButtonWrapper">
                        <IonItem
                            className={parking.isPrivate ? "choosenButton" : ""}
                            onClick={() => handleFieldChange("isPrivate", true)}>פרטית</IonItem>
                        <IonItem
                            className={!parking.isPrivate ? "choosenButton" : ""}
                            onClick={() => handleFieldChange("isPrivate", false)}>ציבורית </IonItem>
                    </IonButtons>
                </IonItem>
            }
            <IonItem>
                <IonLabel className="labelText" >גודל חניה </IonLabel>
                <IonButtons className="itemButtonWrapper">
                    <IonItem
                        className={parking.size == "Big" ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("size", "Big")}>גדולה</IonItem>
                    <IonItem
                        className={parking.size == "Small" ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("size", "Small")}>קטנה </IonItem>
                </IonButtons>
            </IonItem>
            <IonItem >
                <IonLabel className="labelText">תיאור</IonLabel>
                <IonTextarea className="innerText" name="description" onIonChange={e => handleFieldChangeByEvent(e)}></IonTextarea>
            </IonItem>
            <IonButtons>
                <IonButton className="innerText" onClick={addParkingSpot}>הוסף חניה</IonButton>
            </IonButtons>
        </form >
    );
}

export default AddParking;
