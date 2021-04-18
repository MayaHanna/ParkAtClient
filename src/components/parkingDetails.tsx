import {
  IonText,
  IonIcon,
  IonCard,
  IonNote
} from '@ionic/react';
import './parkingDetails.css';
import { Parking } from "../data/parkings-module/types";
import {ReactComponent as BigParking} from "../resources/truck.svg";
import {ReactComponent as SmallParking} from "../resources/car.svg";
import {useDispatch} from "react-redux";

interface ParkingDetailsProps {
  parking: Parking,
  isRouting: boolean
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ parking, isRouting }) => {
  let cardProps = {};
  if (isRouting) {
    cardProps = {
        ...cardProps,
      routerLink: `/parking/${parking.id}`
    }
  }
  return (
    <IonCard className="parkingTitle" {...cardProps}>
      <div className="headerWrapper">
        {parking?.size === "Big" && <BigParking className={"title-icon"} />}
        {parking?.size === "Small" && <SmallParking className={"title-icon"} />}
        <div className="details">
          <IonText color="primary">{parking?.name}</IonText>
          <IonText color="primary">{parking?.address}</IonText>
          <IonNote color="primary">{parking?.description}</IonNote>
          {parking?.isPrivate ?
            <IonNote color="primary">חניה פרטית</IonNote>
            : <IonNote color="primary">חניה ציבורית</IonNote>}
        </div>
      </div>
    </IonCard>
  );
}

export default ParkingDetails;