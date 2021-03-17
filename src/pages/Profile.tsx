import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  IonText,
  useIonViewDidLeave,
  useIonViewWillLeave,
  IonImg,
  IonAvatar

} from '@ionic/react';
import firebase from "firebase"; 
import * as firebaseui from "firebaseui";
import {useDispatch, useSelector,} from "react-redux";
import { setUser} from "../data/user-module/actions";
import { useHistory } from "react-router";
import {useState, useEffect, useRef} from 'react';
import {userSelector} from "../data/user-module/selectors";
import auth from "firebaseui";
import './Profile.css';
import { getParkingsByOwner } from "../data/parkings-module/api";
import { Parking } from "../data/parkings-module/types";
import { FullParkingOffer } from "../data/parkings-offers-module/types";
import ParkingListItem from "../components/ParkingListItem";
import ParkingOfferListItem from "../components/ParkingOfferListItem";
import { getParkingsOffers } from "../data/parkings-offers-module/actions";
import { fullParkingsOffersWithOwnerSelector, fullParkingsOffersWithClientSelector } from '../data/parkings-offers-module/selectors';
import { RootState } from '../data/configureStore';

const Profile: React.FC = () => {
  const user = useSelector(userSelector);

  const [userParkings, setUserParkings] = useState<Parking[]>();

  useEffect(()=>{
    if(user.userMailAddress == undefined)
      return;

    getParkingsByOwner(user.userMailAddress).then(res => {
      setUserParkings(res);
    });


  },[user]);

  const parkingOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithOwnerSelector(state, user.userMailAddress));
  const parkingHistory: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithClientSelector(state, user.userMailAddress));

  
  return (
      <IonPage>
        <IonContent fullscreen>

          <div className={"profile-title"}>
            <IonAvatar  className={"profile-avatar"}>
              <img src={user.userPicture}></img>
            </IonAvatar>


            <div className={"profile-title-details"}>
              <IonText color="primary">{user.userDisplayName}</IonText>
              <IonText color="primary">{user.userMailAddress}</IonText>
            </div>
          </div>
          <div color="primary" className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>החניות שלי</IonText>
            {userParkings && userParkings?.map(p => <ParkingListItem key={p.id} parking={p} onClick={() => {}} />)}
          </div>

          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>היסטוריה - הצעות</IonText>
            {parkingOffers && parkingOffers?.map(p=> <ParkingOfferListItem key={p.id} parkingOffer={p}/>)}
          </div>

          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>היסטוריה - חניות</IonText>
            {parkingHistory && parkingHistory?.map(p=> <ParkingOfferListItem key={p.id} parkingOffer={p}/>)}
          </div>
        </IonContent>
      </IonPage>
    );
}

export default Profile;