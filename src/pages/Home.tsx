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
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonButton,
  IonCard
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
import { add } from 'ionicons/icons';

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
          <div className="userWrapper"><IonText color="primary">
            שלום
          </IonText>
            <IonText className="userName" color="primary">
              {user}
            </IonText>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="primary">
              חניות
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar className="searchBar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated placeholder={"חפש חניה"} />
        <IonList>
          {parkingsOffers.map(po => po.status === "Open" && <ParkingOfferListItem key={po.id} parkingOffer={po} />)}
        </IonList>
      </IonContent>
      <IonFab className="fabButton" vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="secondary">
          <IonIcon icon={add} />
        </IonFabButton>
        <IonFabList side="top" className="fabList">
          <IonCard className="menu">
            <IonButtons className="menuButtons">
              <IonButton onClick={() => history.push("/addParkingOffer")}> הוסף הצעה </IonButton>
              <IonButton> דווח </IonButton>
            </IonButtons>
          </IonCard>


          {/* <IonFabButton> */}
          {/* <IonButton> הוסף הצעת חניה </IonButton> */}
          {/* </IonFabButton> */}
        </IonFabList>
      </IonFab>
    </IonPage>
  );
};

export default Home;
