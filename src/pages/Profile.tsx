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
import ParkingListItem from "../components/ParkingListItem";


const Profile: React.FC = () => {
  const user = useSelector(userSelector);

  const [userParkings, setUserParkings] = useState<Parking[]>();


  useIonViewWillEnter(() => {
    const parkings =  getParkingsByOwner("1") .then(res => {
      setUserParkings(res);
    });
  });


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
          <div color="primary" className={"parking-offer-details"}>
            <IonText color="primary">החניות שלי</IonText>
            {userParkings && userParkings.map(p => <ParkingListItem key={p.id} parking={p} onClick={() => console.log("kaki")} />)}
            
          </div>
        </IonContent>
      </IonPage>
    );
}

export default Profile;