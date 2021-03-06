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
    IonList, IonText
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
import {merchantSelector} from "../data/merchants-module/selectors";

const initializedFields: ParkingOffer = {
    id: 1,
    start: new Date(),
    end: new Date(),
    isPermanent: false,
    price: 0,
    parkingId: 1,
    owner: "",
    status: "Open",
    slots: []
};

interface ParkingDetailsProps {
    chosenParking: Parking,
    onAdd: Function
}

const PrivateOfferForm: React.FC<ParkingDetailsProps> = ({ chosenParking, onAdd }) => {
    const [parkingOffer, setParkingOffer] = useState<ParkingOffer>(initializedFields);
    const currentMerchant = useSelector(merchantSelector);

    useEffect(() => {
        chosenParking ?
            setParkingOffer({
                ...parkingOffer,
                parkingId: chosenParking.id
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
            <ParkingDetails parking={chosenParking} isRouting={false} isCanAddComment={false} />
            <form className="formWrapper">
                <IonItem>
                    <IonLabel className="labelText">מחיר</IonLabel>
                    <IonInput className="innerText priceInput" type={"number"} name="price" value={parkingOffer.price} onIonChange={e => handleFieldChangeByEvent(e)} />
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
                    />
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
                    />
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">חשבון PayPal לזיכוי</IonLabel>
                    <IonText color="primary">{currentMerchant.merchantId || "לא הוגדר חשבון"}</IonText>
                </IonItem>

                <IonButtons>
                    <IonButton className="innerText" onClick={() => onAdd(parkingOffer)}>הוסף</IonButton>
                </IonButtons>
            </form>
        </>
    );
}

export default PrivateOfferForm;