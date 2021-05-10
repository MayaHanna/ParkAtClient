import {
  IonContent,
  IonPage,
  IonText,
  IonIcon,
  IonInput,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLoading, IonButton
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import {useDispatch, useSelector,} from "react-redux";
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
import {useLocation} from "react-router";
import {merchantSelector} from "../data/merchants-module/selectors";
import {editMerchant} from "../data/merchants-module/actions";

const Profile: React.FC = () => {
  const user = useSelector(userSelector);
  const userMerchant = useSelector(merchantSelector);

  const [isEditUser, setIsEditUser] = useState(false);
  const [currentUserPayPal, setCurrentUserPayPal] = useState(userMerchant.merchantId);
  const [userParkings, setUserParkings] = useState<Parking[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    if(user.userMailAddress == undefined)
      return setIsLoading(true);

    getParkingsByOwner(user.userMailAddress).then(res => {
      setIsLoading(false);
      setUserParkings(res);
    });
  },[user]);

  const parkingOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithOwnerSelector(state, user.userMailAddress));
  const parkingHistory: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithClientSelector(state, user.userMailAddress));


  const dispatch = useDispatch();
  const onPayPalAccountChanged = () => {
    dispatch(editMerchant({
        ...userMerchant,
      merchantId: currentUserPayPal
    }));
    setIsEditUser(false);
  };
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
              <IonText color="primary" className={"user-mail"}>{user.userMailAddress}</IonText>
            </div>
            {userMerchant &&
              <div className={"user-rank"}>
                <IonText color="primary">{userMerchant?.points} נקודות</IonText>
              </div>
            }
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
            {parkingHistory && parkingHistory?.map(p=> <ParkingOfferListItem key={p.id} parkingOffer={p} isCanAddComment={true}/>)}
          </div>

          {userMerchant &&
          <div color="primary"  className={"profile-section"}>
            <IonText color="primary" className={"profile-section-title"}>פרטי מסחר</IonText>
            <div className={"title-wrapper"}>
              <IonText color="primary">חשבון PayPal:</IonText>
              {
                !isEditUser && <IonIcon icon={pencil} color="primary" onClick={e=> setIsEditUser(true)} />}
            </div>
            {
              isEditUser ?
                  <>
                  <IonInput className="innerText" type="text" name="merchantId" value={currentUserPayPal} onIonChange={e => setCurrentUserPayPal(e.detail.value!)} placeholder={"הכנס חשבון PayPal כאן"}/>
                  <IonButtons>
                    <IonButton className="innerText" onClick={onPayPalAccountChanged}>שמור</IonButton>
                  </IonButtons>
                  </>
              : <IonText color="primary">{userMerchant.merchantId || "הכנס חשבון PayPal כאן"}</IonText>
            }

          </div>
          }
        
        </IonContent>
      </IonPage>}
      </>
    );
}

export default Profile;