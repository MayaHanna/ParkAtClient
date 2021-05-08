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
import { FullParkingOffer, ParkingOfferSearch } from "../data/parkings-offers-module/types";
import { getParkingsOffers } from "../data/parkings-offers-module/actions";
import { useHistory } from "react-router-dom";
import { add } from 'ionicons/icons';
import MapWrapper from '../components/Map';
import SearchModal from '../components/SearchModal';
import { Coords } from 'google-map-react';

const Home: React.FC = () => {

  const [searchText, setSearchText] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>();

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

  const onSearch = (searchParams: ParkingOfferSearch) => {
    setShowSearchModal(false);
    setCenter(searchParams.centerLocation);

    //setSearchText(text);
    //setShowMap(text == undefined || text == "");
  };

  const goLogin = () => history.push('login');

  return (
    <IonPage id="home-page">
      {showSearchModal && 
      <>
      <IonBackdrop className="backdrop" visible={true} onIonBackdropTap={e=>console.log("you tapped on me")}/>
      <SearchModal search={onSearch}></SearchModal>
      </>
      }
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

        <IonSearchbar className="searchBar" value={searchText} onIonFocus={e => setShowSearchModal(true)} animated placeholder={"חפש חניה"} />

        {showMap ?
        <MapWrapper centerProp={center ?? center}></MapWrapper>
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
              <IonButton onClick={() => history.push("/reportParking")}> דווח </IonButton>
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
