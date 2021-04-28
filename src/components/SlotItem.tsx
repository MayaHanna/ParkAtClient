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
    time: String
}

const SlotItem: React.FC<ParkingDetailsProps> = ({ time }) => {
    const [isTaken, setIsTaken] = useState(false);

    return (
        <>
            <IonItem className={"slot"} onClick={() => setIsTaken(!isTaken)}>
                <IonText color="primary">{time}</IonText>
                {
                    isTaken &&
                    <IonText className={"takenSlot"}>///////</IonText>
                }
            </IonItem>
        </>
    );
}

export default SlotItem;