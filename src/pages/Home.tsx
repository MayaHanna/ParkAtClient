import ParkingListItem from '../components/ParkingListItem';
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
import { userSelector } from '../data/user-module/selectors';
import {useDispatch, useSelector} from "react-redux";
import {getParkings} from "../data/parkings-module/actions";
import { parkingsWithFilterSelector} from "../data/parkings-module/selectors";
import {RootState} from "../data/configureStore";


const Home: React.FC = () => {

  const [searchText, setSearchText] = useState<string>("");

  const user = useSelector(userSelector);
  const parkings = useSelector((state: RootState) => parkingsWithFilterSelector(state, {searchText}));

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
          <IonTitle>Inbox</IonTitle>
          <IonText className={"userName"} color="primary">
          {user}  שלום 
          </IonText>
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
          {parkings.map(p => <ParkingListItem key={p.id} parking={p} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
