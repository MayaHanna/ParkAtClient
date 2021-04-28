import { useState, useEffect } from 'react';
import { ParkingOffer } from "../data/parkings-offers-module/types";
import { Parking } from "../data/parkings-module/types";
import ParkingListItem from "./ParkingListItem";
import ParkingDetails from "./parkingDetails";
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
    IonRadio,
    IonRadioGroup,
    IonButton,
    IonList
} from '@ionic/react';
import { useParams } from 'react-router';
import './privateOfferForm.css';
import AddParking from "./AddParking";
import { getParkingsByOwner } from "../data/parkings-module/api";
import { parkingsWithOwnerSelector } from "../data/parkings-module/selectors";
import { addParkingOffer } from "../data/parkings-offers-module/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../data/configureStore";
import { addParkingOffer as addParkingOfferToRudux } from "../data/parkings-offers-module/actions";
import { useHistory } from "react-router";

const initializedFields: ParkingOffer = {
    id: 7,
    start: new Date(),
    end: new Date(),
    isPermanent: false,
    price: 0,
    parking: 1,
    merchantId: "",
    status: "Open"
};

interface ParkingDetailsProps {
    chosenParking: Parking,
    onAdd: Function
}

const PrivateOfferForm: React.FC<ParkingDetailsProps> = ({ chosenParking, onAdd }) => {
    const [parkingOffer, setParkingOffer] = useState<ParkingOffer>(initializedFields);

    useEffect(() => {
        chosenParking ?
            setParkingOffer({
                ...parkingOffer,
                parking: chosenParking.id
            }) :
            setParkingOffer(initializedFields);
    }, [chosenParking])

    const handleFieldChangeByEvent = (e: any) => {
        setParkingOffer({
            ...parkingOffer,
            [e.target.name]: e.detail.value!
        })
    }

    const handleFieldChange = (field: string, value: any) => {
        setParkingOffer({
            ...parkingOffer,
            [field]: value
        })
    }

    const handleDateChange = (e: any) => {
        setParkingOffer({
            ...parkingOffer,
            [e.target.name]: new Date(e.detail.value)
        })
    }

    return (
        <>
            <ParkingDetails parking={chosenParking} />
            <form className="formWrapper">
                <IonItem>
                    <IonItem>
                        <IonLabel className="labelText">מחיר</IonLabel>
                        <IonInput className="innerText" name="price" value={parkingOffer.price} onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
                    </IonItem>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">בחר תאריך התחלה</IonLabel>
                    <IonDatetime
                        className="innerText"
                        displayFormat="DD/MM/YYYY H:mm"
                        name="start"
                        value={parkingOffer.start.toString()}
                        max="2030-12-09"
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">בחר תאריך סיום</IonLabel>
                    <IonDatetime
                        className="innerText"
                        displayFormat="DD/MM/YYYY H:mm"
                        name="end"
                        value={parkingOffer.end.toString()}
                        max="2030-12-09"
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel className="labelText" >אפשרות להצעה קבועה </IonLabel>
                    <IonButtons className="itemButtonWrapper">
                        <IonItem
                            className={parkingOffer.isPermanent ? "choosenButton" : ""}
                            onClick={() => handleFieldChange("isPermanent", true)}>כן</IonItem>
                        <IonItem
                            className={!parkingOffer.isPermanent ? "choosenButton" : ""}
                            onClick={() => handleFieldChange("isPermanent", false)}>לא </IonItem>
                    </IonButtons>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">חשבון paypal לזיכוי</IonLabel>
                    <IonInput className="innerText" name="merchantId" value={parkingOffer.merchantId} onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
                </IonItem>

                <IonButtons>
                    <IonButton className="innerText" onClick={() => onAdd(parkingOffer)}>הוסף</IonButton>
                </IonButtons>
            </form>
        </>
    );
}

export default PrivateOfferForm;