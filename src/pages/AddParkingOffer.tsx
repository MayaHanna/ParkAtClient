import { useState, useEffect } from 'react';
import { ParkingOffer } from "../data/parkings-offers-module/types";
import { Parking } from "../data/parkings-module/types";
import ParkingListItem from "../components/ParkingListItem";
import ParkingDetails from "../components/parkingDetails";
import PrivateOfferForm from "../components/privateOfferForm";
import PublicOfferForm from "../components/publicOfferForm";

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
import './AddParkingOffer.css';
import AddParking from "../components/AddParking";
import { getParkingsByOwner } from "../data/parkings-module/api";
import { parkingsWithOwnerSelector } from "../data/parkings-module/selectors";
import { addParkingOffer } from "../data/parkings-offers-module/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../data/configureStore";
import { addParkingOffer as addParkingOfferToRudux } from "../data/parkings-offers-module/actions";
import { useHistory } from "react-router";
import { userSelector } from "../data/user-module/selectors";
import { merchantSelector } from "../data/merchants-module/selectors";

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

function AddParkingOffer() {
    const [isChoosingFromList, setIsChoosingFromList] = useState(true);
    const [isCreatingNewParking, setisCreatingNewParking] = useState(false);
    const [chosenParking, setChosenParking] = useState<Parking>();
    const [parkingOffer, setParkingOffer] = useState<ParkingOffer>(initializedFields);
    const user = useSelector(userSelector);
    const merchant = useSelector(merchantSelector);
    const parkingsList: Parking[] = useSelector((state: RootState) => parkingsWithOwnerSelector(state, user.userMailAddress));

    const dispatch = useDispatch();
    const history = useHistory();

    const onClickAddParking = () => {
        setIsChoosingFromList(false);
        setisCreatingNewParking(true);
    }

    const onClickChooseFromList = () => {
        setisCreatingNewParking(false);
        setIsChoosingFromList(true);
    }

    const handleChooseParking = (parkingSpot: Parking) => {
        setChosenParking({
            ...chosenParking,
            ...parkingSpot
        });
    }

    const addPaarkingOffer = (parkingOffer: ParkingOffer) => {
        addParkingOffer(parkingOffer.owner? parkingOffer : {...parkingOffer, owner: merchant.userEmailAddress})
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
                <AddParking chooseParking={handleChooseParking} isPublic={false} />
            }
            {
                isChoosingFromList && (
                    <>
                        {
                            parkingsList.length == 0 &&
                            < h1 className="innerText"> לא נמצאו חניות שמורות </h1 >
                        }
                        <IonList>
                            {parkingsList.map(p => <ParkingListItem key={p.id} parking={p} onClick={handleChooseParking} isRouting={false} />)}
                        </IonList>
                    </>
                )
            }
        </>
    );

    return (
        < IonPage id="view-message-page" >
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="end">
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

                            {
                                chosenParking?.isPrivate ?
                                    <PrivateOfferForm chosenParking={chosenParking} onAdd={(parkingOffer: ParkingOffer) => addPaarkingOffer(parkingOffer)} /> :
                                    <PublicOfferForm chosenParking={chosenParking} onAdd={(parkingOffer: ParkingOffer) => addPaarkingOffer(parkingOffer)} />
                            }
                        </>

                    ) : displayChooseParkingMenu()
                }
            </IonContent>
        </IonPage >
    );
}

export default AddParkingOffer;
