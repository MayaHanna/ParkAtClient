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
  IonButtons,
  IonButton
} from '@ionic/react';
import './ParkingOffer.css';
import {useLocation, useParams} from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fullParkingsOffersWithIdSelector } from "../data/parkings-offers-module/selectors";
import { RootState } from "../data/configureStore";
import { FullParkingOffer } from '../data/parkings-offers-module/types';
import { Slot } from '../data/slots-module/types';
import { ReactComponent as BigParking } from "../resources/truck.svg";
import { ReactComponent as SmallParking } from "../resources/car.svg";
import SlotItem from '../components/SlotItem';
import { userSelector } from "../data/user-module/selectors";
import { useHistory } from "react-router";
import { editParkingOffer } from "../data/parkings-offers-module/api";
import { editParkingOffer as UpdateParkingOfferInRudux } from "../data/parkings-offers-module/actions";
import {Paypal} from "./Paypal";
import ParkingDetails from "../components/parkingDetails";
import {useState} from "react";


const ParkingOffer: React.FC = () => {

  const params = useParams<{ id: string }>();

  const parkingOffer: FullParkingOffer = useSelector((state: RootState) => fullParkingsOffersWithIdSelector(state, params.id));
  const [parkingOfferToUpdate, setParkingOfferToUpdate] = useState<FullParkingOffer>(parkingOffer);

  const user = useSelector(userSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;

  const canAddComment = search.split("=")[1];

  const acceptOffer = () => {

    editParkingOffer(parkingOfferToUpdate.id, { slots: parkingOfferToUpdate.slots })
      .then(res => {
        console.log("הצעת החניה עודכנה בהצלחה");
        dispatch(UpdateParkingOfferInRudux({ slots: parkingOfferToUpdate.slots }));
        history.push("/home");
      })
      .catch(err => console.log(err))
  }

  const handleSlot = (slot: Slot, slotIndex: number, isTaken: Boolean) => {
    const newParkingOffer: FullParkingOffer = { ...parkingOffer, slots: [...parkingOffer.slots] };

    newParkingOffer.slots[slotIndex] = {
      ...newParkingOffer.slots[slotIndex],
      incomingUser: isTaken ? user.userMailAddress : undefined
    }

    setParkingOfferToUpdate(newParkingOffer);
  }

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
        <ParkingDetails parking={parkingOffer?.parking} isRouting={true} isCanAddComment={!!canAddComment}/>
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
            {
              parkingOffer.status == "Open" &&
              parkingOffer.parking.isPrivate &&
              <>
                <IonRow>
                  <IonCol><IonText color="primary">מחיר</IonText></IonCol>
                  <IonCol><IonText color="primary">{parkingOffer.price}&#8362;</IonText></IonCol>
                </IonRow>
                <IonRow className={"paypal-row"}>
                  <Paypal price={parkingOffer.price} merchantId={parkingOffer.merchantId} parkingOfferId={parkingOffer.id} />
                </IonRow>
              </>
            }
          </IonGrid>
          {
            !parkingOffer.parking.isPrivate &&
            (
              <>
                <IonText className="text" > לחץ כדי לתפוס את החניה בשעות הנוחות לך !</IonText>
                <form className="slotFormWrapper">
                  {
                    parkingOffer.slots.map((slot, slotIndex) => (

                      <SlotItem
                        endDate={slot.end}
                        startDate={slot.start}
                        incomingUser={slot.incomingUser}
                        onClick={(isTaken: Boolean) => handleSlot(slot, slotIndex, isTaken)}
                      />
                    )
                    )}
                </form>
                <br></br>
                <IonButtons>
                  <IonButton className="innerText" onClick={acceptOffer}>קבל הצעה</IonButton>
                </IonButtons>
              </>
            )
          }

        </div>
      </IonContent>
    </IonPage>
  );
}

export default ParkingOffer;