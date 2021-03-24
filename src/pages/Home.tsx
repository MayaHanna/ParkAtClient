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
  IonCard,
  IonAvatar
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
import MapWrapper from '../components/Map';

const Home: React.FC = () => {

  const [searchText, setSearchText] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(true);

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

  const onSearch = (text: string) => {
    setSearchText(text);
    setShowMap(text == undefined || text == "");
  };

  const goLogin = () => history.push('login');

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <a href="/profile">
              <IonAvatar  className={"profile-avatar"}>
                <img src={user.userPicture} ></img>
              </IonAvatar>
            </a>
          </IonButtons>
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

        <IonSearchbar className="searchBar" value={searchText} onIonChange={e => onSearch(e.detail.value!)} animated placeholder={"חפש חניה"} />
        {showMap ? 
        <MapWrapper></MapWrapper>
         :
        <IonList>
          {parkingsOffers.map(po => po.status === "Open" && <ParkingOfferListItem key={po.id} parkingOffer={po} />)}
        </IonList>}
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
