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
import './publicOfferForm.css';
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

const PublicOfferForm: React.FC<ParkingDetailsProps> = ({ chosenParking, onAdd }) => {
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
                    <IonLabel className="labelText">בחר שעת התחלה</IonLabel>
                    <IonDatetime
                        className="innerText"
                        displayFormat="H:mm"
                        name="start"
                        value={parkingOffer.start.toString()}
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">בחר שעת סיום</IonLabel>
                    <IonDatetime
                        className="innerText"
                        displayFormat="H:mm"
                        name="end"
                        value={parkingOffer.end.toString()}
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonButtons>
                    <IonButton className="innerText" onClick={() => onAdd(parkingOffer)}>הוסף</IonButton>
                </IonButtons>
            </form>
        </>
    );
}

export default PublicOfferForm;