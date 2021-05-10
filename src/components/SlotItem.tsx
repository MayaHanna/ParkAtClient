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

    useEffect(() => {
        setDisplayTime(`${endDate.getHours()}:${getMinutesToDisplay(endDate)} - 
        ${startDate.getHours()}:${getMinutesToDisplay(startDate)}`)
    }, [])


    const getMinutesToDisplay = (date: Date) => {
        let minutes = date.getMinutes();
        return minutes < 10  ? `0${minutes}` : minutes
    }

    return (
        <>
            <IonItem className={"slot"} onClick={() => {
                const newIsTaken = !isTaken;
                setIsTaken(newIsTaken);
                onClick(newIsTaken);
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
// interface ParkingDetailsProps {
//     time: String,
//     incomingUser: String | undefined,
//     onClick: Function
// }

// const SlotItem: React.FC<ParkingDetailsProps> = ({ time, incomingUser, onClick }) => {
//     const [isTaken, setIsTaken] = useState(incomingUser ? true : false);

//     return (
//         <>
//             <IonItem className={"slot"} onClick={() => {
//                 const newIsTaken = !isTaken;
//                 setIsTaken(newIsTaken);
//                 onClick(newIsTaken);
//             }}>
//                 <IonText color="primary">{time}</IonText>
//                 {
//                     isTaken &&
//                     <IonText className={"takenSlot"}>///////</IonText>
//                 }
//             </IonItem>
//         </>
//     );
// }

export default SlotItem;