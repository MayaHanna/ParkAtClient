import { useState, useEffect } from 'react';
import { ParkingOffer } from "../data/parkings-offers-module/types";
import { Parking } from "../data/parkings-module/types";
import ParkingListItem from "../components/ParkingListItem";
import ParkingDetails from "../components/parkingDetails";
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
import './AddPrivateOffer.css';
import AddParking from "../components/AddParking";
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

function AddPrivateOffer() {
    const [isChoosingFromList, setIsChoosingFromList] = useState(true);
    const [isCreatingNewParking, setisCreatingNewParking] = useState(false);
    const [chosenParking, setChosenParking] = useState<Parking>();
    const [parkingOffer, setParkingOffer] = useState<ParkingOffer>(initializedFields);
    const parkingsList: Parking[] = useSelector((state: RootState) => parkingsWithOwnerSelector(state, "1"));
    const dispatch = useDispatch();
    const history = useHistory();

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

    const onClickAddParking = () => {
        setIsChoosingFromList(false);
        setisCreatingNewParking(true);
    }

    const onClickChooseFromList = () => {
        setisCreatingNewParking(false);
        setIsChoosingFromList(true);
    }

    const handleChooseParking = (parkingSpot: Parking) => {
        setChosenParking(parkingSpot);
    }

    const addPaarkingOffer = () => {
        addParkingOffer(parkingOffer)
            .then(res => {
                console.log("הצעת החניה נוספה בהצלחה");
                dispatch(addParkingOfferToRudux(parkingOffer));
                history.push("/home");
                setChosenParking(undefined);
            })
            .catch(err => console.log(err))
    }

    const displayChooseParkingMenu = () => (
        <>
            <h2 className="secondaryTitle">בחר חניה</h2>
            <IonButtons className="chooseParkingButtons">
                <IonButton
                    className={isChoosingFromList ? "choosenMenuButton" : "chooseParkingButton"}
                    onClick={onClickChooseFromList}>החניות שלי</IonButton>
                <IonButton className={isCreatingNewParking ? "choosenMenuButton" : "chooseParkingButton"}
                    onClick={onClickAddParking}>חניה חדשה </IonButton>
            </IonButtons>
            {
                isCreatingNewParking &&
                <AddParking chooseParking={handleChooseParking} />
            }
            {
                isChoosingFromList && (
                    <>
                        {
                            parkingsList.length == 0 &&
                            < h1 > לא נמצאו חניות שמורות </h1 >
                        }
                        <IonList>
                            {parkingsList.map(p => <ParkingListItem key={p.id} parking={p} onClick={handleChooseParking} />)}
                        </IonList>
                    </>
                )
            }
        </>
    );

    const displayParkingOfferForm = () => (
        <>
            <ParkingDetails parking={chosenParking} />
            <form className="formWrapper">
                <IonItem>
                    <IonLabel>מחיר</IonLabel>
                    <IonInput type="number" name="price" value={parkingOffer.price} onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>בחר תאריך התחלה</IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY H:mm"
                        name="start"
                        value={parkingOffer.start.toString()}
                        // min={parkingOffer.start.toString()} 
                        max="2030-12-09"
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>בחר תאריך סיום</IonLabel>
                    <IonDatetime
                        displayFormat="DD/MM/YYYY H:mm"
                        name="end"
                        value={parkingOffer.end.toString()}
                        // min={parkingOffer.end.toString()} 
                        max="2030-12-09"
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>אפשרות להצעה קבועה </IonLabel>
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
                    <IonLabel>חשבון paypal לזיכוי</IonLabel>
                    <IonInput name="merchantId" value={parkingOffer.merchantId} onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
                </IonItem>
                <IonButtons>
                    <IonButton onClick={addPaarkingOffer}>הוסף</IonButton>
                </IonButtons>
            </form>
        </>
    )

    return (
        < IonPage id="view-message-page" >
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton text="מסך בית" defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <h1 className="title">הוספת הצעת חניה</h1>
                {
                    chosenParking?.id ? (
                        <>
                            <IonButtons>
                                <IonButton onClick={() => setChosenParking(undefined)} >בחר חניה אחרת</IonButton>
                            </IonButtons>

                            {displayParkingOfferForm()}
                        </>

                    ) : displayChooseParkingMenu()
                }
            </IonContent>
        </IonPage >
    );
}

export default AddPrivateOffer;
