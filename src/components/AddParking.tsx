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
    IonRadio
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './AddParking.css';
import { useDispatch, useSelector } from "react-redux";
import { addParking as addParkingToRudux, getParkings } from "../data/parkings-module/actions";

interface AddParkingProps {
    chooseParking: Function;
}

const initializedFields: Parking = {
    name: "",
    id: 7,
    address: "",
    isPrivate: true,
    description: "",
    size: "Small",
    // suittableFor: "motorcycle",
    owner: 1
}

const AddParking: React.FC<AddParkingProps> = ({ chooseParking }) => {

    const [parking, setParking] = useState<Parking>(initializedFields);
    const dispatch = useDispatch();

    const addParkingSpot = () => {
        chooseParking(parking);

        addParking(parking)
            .then(res => {
                console.log(" החניה נוספה בהצלחה")
                dispatch(addParkingToRudux(parking));
            })
            .catch(err => console.log(err))
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
            <IonItem>
                <IonLabel>שם חניה</IonLabel>
                <IonInput type="text" name="name" onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>כתובת</IonLabel>
                <IonInput type="text" name="address" onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>סוג חניה </IonLabel>
                <IonButtons className="itemButtonWrapper">
                    <IonItem
                        className={parking.isPrivate ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("isPrivate", true)}>פרטית</IonItem>
                    <IonItem
                        className={!parking.isPrivate ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("isPrivate", false)}>ציבורית </IonItem>
                </IonButtons>
            </IonItem>
            <IonItem>
                <IonLabel>גודל חניה </IonLabel>
                <IonButtons className="itemButtonWrapper">
                    <IonItem
                        className={parking.size == "Big" ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("size", "Big")}>גדולה</IonItem>
                    <IonItem
                        className={parking.size == "Small" ? "choosenButton" : ""}
                        onClick={() => handleFieldChange("size", "Small")}>קטנה </IonItem>
                </IonButtons>
            </IonItem>
            <IonItem>
                <IonLabel>תיאור</IonLabel>
                <IonTextarea name="description" onIonChange={e => handleFieldChangeByEvent(e)}></IonTextarea>
            </IonItem>
            <IonButtons>
                <IonButton onClick={addParkingSpot}>הוסף חניה</IonButton>
            </IonButtons>
        </form >
    );
}

export default AddParking;
