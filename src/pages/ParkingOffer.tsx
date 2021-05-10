import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import './ParkingOffer.css';
import {useLocation, useParams} from 'react-router';
import { useSelector } from "react-redux";
import { fullParkingsOffersWithIdSelector } from "../data/parkings-offers-module/selectors";
import { RootState } from "../data/configureStore";
import { FullParkingOffer } from '../data/parkings-offers-module/types';
import {Paypal} from "./Paypal";
import ParkingDetails from "../components/parkingDetails";
import { boolean } from "boolean";


const ParkingOffer: React.FC = () => {

  const params = useParams<{ id: string }>();

  const parkingOffer: FullParkingOffer = useSelector((state: RootState) => fullParkingsOffersWithIdSelector(state, params.id));

  const location = useLocation();
  const search = location.search;

  const canAddComment = search.split("=")[1];


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonBackButton text="חזור" color="secondary" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ParkingDetails parking={parkingOffer?.parking} isRouting={true} isCanAddComment={boolean(canAddComment)}/>
        <div color="primary" className={"parking-offer-details"}>
          <IonGrid className={"parking-grid"}>
            <IonRow>
                        <IonCol><IonText color="primary">סטטוס</IonText></IonCol>
                        <IonCol>
                            {parkingOffer.status == "Open" && <IonText color="primary">פנויה</IonText>}
                            {parkingOffer.status == "Closed" && <IonText color="primary">תפוסה</IonText>}
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
                {parkingOffer.parking.size === "Big" && <IonText color="primary">גדולה</IonText>}
                {parkingOffer.parking.size === "Small" && <IonText color="primary">קטנה</IonText>}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonText color="primary">מחיר</IonText></IonCol>
              <IonCol><IonText color="primary">{parkingOffer.price}&#8362;</IonText></IonCol>
            </IonRow>
            {parkingOffer.status == "Open" &&
            <IonRow className={"paypal-row"}>
                <Paypal price={parkingOffer.price} merchantId={parkingOffer.merchantId} parkingOfferId={parkingOffer.id}/>
            </IonRow>
            }
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ParkingOffer;