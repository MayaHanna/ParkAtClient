import ParkingListItem from '../components/ParkingListItem';
import { useState, useEffect } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonText
} from '@ionic/react';
import './Home.css';
import firebase from 'firebase';
import {useDispatch, useSelector} from "react-redux";
import {getParkings} from "../data/parkings-module/actions";
import {parkingsSelector} from "../data/parkings-module/selectors";
import {Parking} from "../data/parkings-module/types";


const Home: React.FC = () => {

  const [displayName, setDisplayName] = useState<string>();

  firebase.auth().onAuthStateChanged(()=>{
    setDisplayName(firebase.auth().currentUser?.displayName?.toString());
  });

  const parkings = useSelector(parkingsSelector);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParkings());
  }, []);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar className={"toolbar"}>
          <IonTitle>{displayName}שלום </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              חניות
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {parkings.map(p => <ParkingListItem key={p.id} parking={p} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
