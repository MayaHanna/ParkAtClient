import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonText,
    IonIcon,
    IonImg
  } from '@ionic/react';
  import './ParkingOffer.css';
  import { useParams } from 'react-router';
  import { carOutline } from 'ionicons/icons';
  import {useDispatch, useSelector} from "react-redux";
  import {getParkings} from "../data/parkings-module/actions";
  import {parkingsWitIdSelector} from "../data/parkings-module/selectors";
  import {Parking} from "../data/parkings-module/types";
  import { useState, useEffect } from 'react';
  import {RootState} from "../data/configureStore";


const ParkingOffer: React.FC = () => {

    const params = useParams<{ id: string }>();
    const [searchText, setSearchText] = useState<string>("");

    const parkingOffer = useSelector((state: RootState) => parkingsWitIdSelector(state, {params}));

    debugger;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getParkings());
    }, []);

    return (
        <IonPage>
          <IonContent fullscreen>
            <div  className={"parking-offer-title"}>
                <IonIcon  icon={carOutline} className={"parking-offer-title-icon"}/>
                <div  className={"parking-offer-title-details"}>
                <IonText color="primary">חניה בית</IonText> 
                <IonText color="primary">לכיש 34, שוהם</IonText> 
                </div>
            </div>
            <div color="primary" className={"parking-offer-details"}>
                <IonImg  src="f"/>
                <IonText color="primary">{parkingOffer?.description}</IonText>
            </div>
          </IonContent>
        </IonPage>
      );
}

export default ParkingOffer;