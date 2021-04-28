import { useState, useEffect } from 'react';
import { ParkingReport } from "../data/parking-reports-module/types";
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
import './ReportParking.css';
import AddParking from "../components/AddParking";
import { getParkingsByOwner } from "../data/parkings-module/api";
import { publicParkingsSelector } from "../data/parkings-module/selectors";
import { addParkingReports } from "../data/parking-reports-module/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../data/configureStore";
import { addParkingReports as addParkingReportsToRudux } from "../data/parking-reports-module/actions";
import { useHistory } from "react-router";

const initializedFields: ParkingReport = {
    id: 7,
    reportDate: new Date(),
    parking: 1
};

function ReportParking() {
    const [isChoosingFromList, setIsChoosingFromList] = useState(true);
    const [isCreatingNewParking, setisCreatingNewParking] = useState(false);
    const [chosenParking, setChosenParking] = useState<Parking>();
    const [parkingReport, setParkingReport] = useState<ParkingReport>(initializedFields);
    const parkingsList: Parking[] = useSelector((state: RootState) => publicParkingsSelector(state));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        chosenParking ?
            setParkingReport({
                ...parkingReport,
                parking: chosenParking.id
            }) :
            setParkingReport(initializedFields);
    }, [chosenParking])


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

    const report = () => {
        addParkingReports(parkingReport)
            .then(res => {
                console.log("הדיווח נשלח בהצלחה");
                dispatch(addParkingReportsToRudux(parkingReport));
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
                    onClick={onClickChooseFromList}>חניות ציבוריות</IonButton>
                <IonButton className={isCreatingNewParking ? "choosenMenuButton" : "chooseParkingButton"}
                    onClick={onClickAddParking}>חניה חדשה </IonButton>
            </IonButtons>
            {
                isCreatingNewParking &&
                <AddParking chooseParking={handleChooseParking} isPublic={true} />
            }
            {
                isChoosingFromList && (
                    <>
                        {
                            parkingsList.length == 0 &&
                            < h1 className="title"> לא נמצאו חניות ציבוריות במערכת </h1 >
                        }
                        <IonList>
                            {parkingsList.map(p => <ParkingListItem key={p.id} parking={p} onClick={handleChooseParking} />)}
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
                    <IonButtons>
                        <IonBackButton text="מסך בית" defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <h1 className="title">דווח על חניה פנויה</h1>
                {
                    chosenParking?.id ? (
                        <>
                            <IonButtons>
                                <IonButton className="innerText" onClick={() => setChosenParking(undefined)} >בחר חניה אחרת</IonButton>
                            </IonButtons>

                            <ParkingDetails parking={chosenParking} />
                            <IonButtons>
                                <IonButton className="innerText" onClick={report}>דווח</IonButton>
                            </IonButtons>
                        </>

                    ) : displayChooseParkingMenu()
                }
            </IonContent>
        </IonPage >
    );
}

export default ReportParking;
