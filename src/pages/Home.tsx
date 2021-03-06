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
  IonFab,
  IonInput,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonButton,
  IonCard,
  IonAvatar,
  IonBackdrop
} from '@ionic/react';
import './Home.css';
import { userSelector } from '../data/user-module/selectors';
import { useDispatch, useSelector } from "react-redux";
import { getParkings } from "../data/parkings-module/actions";
import { parkingsWithFilterSelector } from "../data/parkings-module/selectors";
import { RootState } from "../data/configureStore";
import { Parking } from "../data/parkings-module/types";
import { fullParkingsOffersWithFilterSelector } from "../data/parkings-offers-module/selectors";
import { FullParkingOffer, ParkingOffersMapParams } from "../data/parkings-offers-module/types";
import { getParkingsOffers } from "../data/parkings-offers-module/actions";
import { useHistory } from "react-router-dom";
import { add, searchOutline } from 'ionicons/icons';
import MapWrapper from '../components/Map';
import SearchModal from '../components/SearchModal';
import { Coords } from 'google-map-react';

const Home: React.FC = () => {

  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [mapFilterParams, setMapFilterParams] = useState<ParkingOffersMapParams>();

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onSearch = (searchParams: ParkingOffersMapParams) => {
    setShowSearchModal(false);
    setMapFilterParams(searchParams);
  };

  const goLogin = () => history.push('login');

  return (
    <IonPage id="home-page">
      {showSearchModal &&
        <>
          <IonBackdrop className="backdrop" visible={true} onIonBackdropTap={e => setShowSearchModal(false)} />
          <SearchModal search={onSearch}></SearchModal>
        </>
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <a href="/profile">
              <IonAvatar className={"profile-avatar"}>
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
        <button className="searchBar" onClick={e => setShowSearchModal(true)}>
          חפש חניה
          <IonIcon className="searchIcon" icon={searchOutline} />
        </button>
        {showMap &&
          <MapWrapper filterParams={mapFilterParams ?? mapFilterParams}></MapWrapper>}
      </IonContent>
      <IonFab className="fabButton" vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="secondary">
          <IonIcon icon={add} />
        </IonFabButton>
        <IonFabList side="top" className="fabList">
          <IonCard className="menu">
            <IonButtons className="menuButtons">
              <IonButton onClick={() => history.push("/addParkingOffer")}> הוסף הצעה </IonButton>
              <IonButton onClick={() => history.push("/reportParking")}> דווח (10 נקודות) </IonButton>
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
