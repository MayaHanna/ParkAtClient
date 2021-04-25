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
import {User} from "../data/user-module/types";
import {userSelector} from "../data/user-module/selectors";

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
    const loggedInUser: User = useSelector(userSelector);
    const parkingsList: Parking[] = useSelector((state: RootState) => parkingsWithOwnerSelector(state, loggedInUser.userMailAddress));
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
                <AddParking chooseParking={handleChooseParking} isPublic={false}/>
            }
            {
                isChoosingFromList && (
                    <>
                        {
                            parkingsList.length == 0 &&
                            < h1 className="innerText"> לא נמצאו חניות שמורות </h1 >
                        }
                        <IonList>
                            {parkingsList.map(p => <ParkingListItem key={p.id} parking={p} onClick={handleChooseParking} isRouting={false}/>)}
                        </IonList>
                    </>
                )
            }
        </>
    );

    const displayParkingOfferForm = () => (
        <>
            {chosenParking && <ParkingDetails parking={chosenParking} isRouting={true}/> }
            <form className="formWrapper">
                <IonItem>
                    <IonLabel className="labelText">מחיר</IonLabel>
                    <IonInput className="innerText" type="number" name="price" value={parkingOffer.price} onIonChange={e => handleFieldChangeByEvent(e)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">בחר תאריך התחלה</IonLabel>
                    <IonDatetime
                        className="innerText"
                        displayFormat="DD/MM/YYYY H:mm"
                        name="start"
                        value={parkingOffer.start.toString()}
                        // min={parkingOffer.start.toString()} 
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
                        // min={parkingOffer.end.toString()} 
                        max="2030-12-09"
                        onIonChange={e => handleDateChange(e)}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel className="labelText">אפשרות להצעה קבועה </IonLabel>
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
                    <IonButton className="innerText" onClick={addPaarkingOffer}>הוסף</IonButton>
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
                                <IonButton className="innerText" onClick={() => setChosenParking(undefined)} >בחר חניה אחרת</IonButton>
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
