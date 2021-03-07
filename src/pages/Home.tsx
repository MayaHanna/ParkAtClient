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
  IonText,
  IonSearchbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import './Home.css';
import { userSelector } from '../data/user-module/selectors';
import { useDispatch, useSelector } from "react-redux";
import { getParkings } from "../data/parkings-module/actions";
import { parkingsWithFilterSelector } from "../data/parkings-module/selectors";
import { RootState } from "../data/configureStore";
import { Parking } from "../data/parkings-module/types";
import { fullParkingsOffersWithFilterSelector } from "../data/parkings-offers-module/selectors";
import { FullParkingOffer } from "../data/parkings-offers-module/types";
import { getParkingsOffers } from "../data/parkings-offers-module/actions";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const parkingsOffers: FullParkingOffer[] = useSelector((state: RootState) => fullParkingsOffersWithFilterSelector(state, { searchText }));

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onParkingClick = (parking: Parking) => {
    history.push(`/parking/${parking.id}`);
  }

  const goLogin = () => history.push('login');

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar className={"toolbar"}>
          <IonTitle>Inbox</IonTitle>
          <IonText className={"userName"} color="primary">
            {user}  שלום
          </IonText>
          <IonButtons>
            <IonBackButton text="הוסף הצעת חניה" defaultHref="/addParkingOffer"></IonBackButton>
          </IonButtons>
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

        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated placeholder={"חפש חניה"} />
        <IonList>
          {parkingsOffers.map(po => po.status === "Open" && <ParkingOfferListItem key={po.id} parkingOffer={po} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
