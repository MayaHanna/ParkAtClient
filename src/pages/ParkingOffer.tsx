import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonText,
    IonIcon,
    IonImg,
    IonGrid,
    IonRow,IonCol

  } from '@ionic/react';
  import './ParkingOffer.css';
  import { useParams } from 'react-router';
  import { carOutline } from 'ionicons/icons';
  import {useDispatch, useSelector} from "react-redux";
  import {getParkings} from "../data/parkings-module/actions";
  import {parkingsWitIdSelector} from "../data/parkings-module/selectors";
  import {Parking} from "../data/parkings-module/types";
  import { useState, useEffect } from 'react';
  import {RootState} from "../data/configureStore";


const ParkingOffer: React.FC = () => {

    const params = useParams<{ id: string }>();

    const parkingOffer = useSelector((state: RootState) => parkingsWitIdSelector(state, params.id));

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getParkings());
    }, []);

    return (
        <IonPage>
          <IonContent fullscreen>
            <div  className={"parking-offer-title"}>
                <IonIcon  icon={carOutline} className={"parking-offer-title-icon"}/>
                <div  className={"parking-offer-title-details"}>
                <IonText color="primary">חניה בית</IonText> 
                <IonText color="primary">{parkingOffer?.address}</IonText> 
                </div>
            </div>
            <div color="primary" className={"parking-offer-details"}>
                <IonText color="primary">{parkingOffer.description}</IonText>
                <IonGrid className={"parking-grid"}>
                    <IonRow>
                        <IonCol><IonText color="primary">סטטוס</IonText></IonCol>
                        <IonCol>
                            {parkingOffer.status && <IonText color="primary">פנויה</IonText>}
                            {!parkingOffer.status &&<IonText color="primary">תפוסה</IonText>}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonText color="primary">תאריך התחלה</IonText></IonCol>
                        <IonCol> <IonText color="primary">{new Date(parkingOffer.start).getDate()}/{new Date(parkingOffer.start).getMonth() + 1}/{new Date(parkingOffer.start).getFullYear()} {new Date(parkingOffer.start).getHours()}:{new Date(parkingOffer.start).getMinutes()}</IonText></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonText color="primary">תאריך סיום</IonText></IonCol>
                        <IonCol> <IonText color="primary">{new Date(parkingOffer.end).getDate()}/{new Date(parkingOffer.end).getMonth() + 1}/{new Date(parkingOffer.end).getFullYear()} {new Date(parkingOffer.end).getHours()}:{new Date(parkingOffer.end).getMinutes()}</IonText></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonText color="primary">גודל חניה</IonText></IonCol>
                        <IonCol>
                            {parkingOffer.size === "Big" && <IonText color="primary">גדולה</IonText>}
                            {parkingOffer.size === "Small" &&<IonText color="primary">קטנה</IonText>}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonText color="primary">מחיר</IonText></IonCol>
                        <IonCol><IonText color="primary">{parkingOffer.price}&#8362;</IonText></IonCol>
                    </IonRow>
                </IonGrid>

            </div>
          </IonContent>
        </IonPage>
      );
}

export default ParkingOffer;