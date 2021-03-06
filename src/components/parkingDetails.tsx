import {
  IonText,
  IonIcon,
  IonCard,
  IonNote
} from '@ionic/react';
import './parkingDetails.css';
import { carOutline } from 'ionicons/icons';
import { Parking } from "../data/parkings-module/types";

interface ParkingDetailsProps {
  parking: Parking | undefined
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ parking }) => {

  return (
    <IonCard className="parkingTitle">
      <div className="headerWrapper">
        <div >
          <IonIcon icon={carOutline} className="title-icon" />
        </div>
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