import {
  IonContent,
  IonPage,
  IonText,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLoading
} from '@ionic/react';

import { useSelector,} from "react-redux";
import {useState, useEffect} from 'react';
import {userSelector} from "../data/user-module/selectors";
import './Profile.css';
import { getParkingsByOwner } from "../data/parkings-module/api";
import { getMerchantByUser } from "../data/merchants-module/api";
import { Parking } from "../data/parkings-module/types";
import { FullParkingOffer } from "../data/parkings-offers-module/types";
import ParkingListItem from "../components/ParkingListItem";
import ParkingOfferListItem from "../components/ParkingOfferListItem";
import { fullParkingsOffersWithOwnerSelector, fullParkingsOffersWithClientSelector } from '../data/parkings-offers-module/selectors';
import { RootState } from '../data/configureStore';
import { Merchant } from '../data/merchants-module/types';

const Profile: React.FC = () => {
  const user = useSelector(userSelector);

  const [userParkings, setUserParkings] = useState<Parking[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userMerchantIds, setUserMerchantIds] = useState<string[]>();

  useEffect(()=>{
    if(user.userMailAddress == undefined)
      return setIsLoading(true);

    getParkingsByOwner(user.userMailAddress).then(res => {
      setIsLoading(false);
      setUserParkings(res);
    });

    getMerchantByUser(user.userMailAddress).then((res:Merchant[]) => {
      setUserMerchantIds(res.map(_=>_.merchantId));
    });


  },[user]);

  const parkingOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithOwnerSelector(state, user.userMailAddress));
  const parkingHistory: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithClientSelector(state, user.userMailAddress));

  
  return (
    <>
      <IonLoading isOpen={isLoading}></IonLoading>
      {!isLoading && 
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton color="secondary" defaultHref="home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

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
            {userParkings && userParkings?.map(p =>
                  <ParkingListItem key={p.id} parking={p} onClick={() => {}} isRouting={true}/>
                  )}
          </div>

          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>היסטוריה - הצעות</IonText>
            {parkingOffers && parkingOffers?.map(p=> <ParkingOfferListItem key={p.id} parkingOffer={p}/>)}
          </div>

          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>היסטוריה - חניות</IonText>
            {parkingHistory && parkingHistory?.map(p=> <ParkingOfferListItem key={p.id} parkingOffer={p}/>)}
          </div>

          {userMerchantIds &&
          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>פרטי מסחר</IonText>
            <IonText color="primary"> פייפל:</IonText>
            {userMerchantIds?.map(merchantId=> <IonText color="primary">{merchantId}</IonText>)}
          </div>
          }
        
        </IonContent>
      </IonPage>}
      </>
    );
}

export default Profile;