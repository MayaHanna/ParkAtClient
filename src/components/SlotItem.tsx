import { useState, useEffect } from 'react';
import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonText,
    IonIcon,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButton,
} from '@ionic/react';
import './SlotItem.css';
import { userSelector } from "../data/user-module/selectors";
import { useSelector, useDispatch } from "react-redux";

interface ParkingDetailsProps {
    // time: String,
    endDate: Date,
    startDate: Date,
    incomingUser: String | undefined,
    onClick: Function
}

const SlotItem: React.FC<ParkingDetailsProps> = ({ endDate, startDate, incomingUser, onClick }) => {
    const [isTaken, setIsTaken] = useState(incomingUser ? true : false);
    const [displayTime, setDisplayTime] = useState("");
    const user = useSelector(userSelector);

    useEffect(() => {
        setDisplayTime(`${endDate.getHours()}:${getMinutesToDisplay(endDate)} - 
        ${startDate.getHours()}:${getMinutesToDisplay(startDate)}`)
    }, [])


    const getMinutesToDisplay = (date: Date) => {
        let minutes = date.getMinutes();
        return minutes < 10 ? `0${minutes}` : minutes
    }

    return (
        <>
            <IonItem className={"slot"} onClick={() => {
                if ((isTaken && incomingUser == user.userMailAddress) || !isTaken) {
                    const newIsTaken = !isTaken;
                    setIsTaken(newIsTaken);
                    onClick(newIsTaken);
                }
            }}>
                <IonText color="primary">{displayTime}</IonText>
                {
                    isTaken &&
                    <IonText className={"takenSlot"}>///////</IonText>
                }
            </IonItem>
        </>
    );
}

export default SlotItem;