import ParkingOfferListItem from '../components/ParkingOfferListItem';
import { useState, useEffect } from 'react';
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
  IonText, IonSearchbar
} from '@ionic/react';
import './Home.css';
import firebase from 'firebase';
import {useDispatch, useSelector} from "react-redux";
import {getParkings} from "../data/parkings-module/actions";
import {parkingsSelector, parkingsWithFilterSelector} from "../data/parkings-module/selectors";
import {RootState} from "../data/configureStore";
import {Parking} from "../data/parkings-module/types";
import {fullParkingsOffersWithFilterSelector} from "../data/parkings-offers-module/selectors";
import {FullParkingOffer} from "../data/parkings-offers-module/types";
import {getParkingsOffers} from "../data/parkings-offers-module/actions";


const Home: React.FC = () => {

  const [displayName, setDisplayName] = useState<string>();
  const [searchText, setSearchText] = useState<string>("");

  firebase.auth().onAuthStateChanged(()=>{
    setDisplayName(firebase.auth().currentUser?.displayName?.toString());
  });

  const parkingsOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithFilterSelector(state, {searchText}));

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParkings());
    dispatch(getParkingsOffers());
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
          <IonRefresherContent />
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              חניות
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated placeholder={"חפש חניה"}/>
        <IonList>
          {parkingsOffers.map(po => <ParkingOfferListItem key={po.id} parkingOffer={po} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
