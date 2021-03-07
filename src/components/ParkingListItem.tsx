import {
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/react';
import './ParkingListItem.css';
import { Parking } from "../data/parkings-module/types";
import { ReactComponent as BigParking } from "../resources/truck.svg";
import { ReactComponent as SmallParking } from "../resources/car.svg";

interface MessageListItemProps {
  parking: Parking,
  onClick: Function
}

const ParkingListItem: React.FC<MessageListItemProps> = ({ parking, onClick }) => {
  const dotClassName = `dot dot-Free`;
  // const dotClassName = `dot dot-${parking.status}`;
  return (
    <IonItem button onClick={() => onClick(parking)}>
      <div slot="start" className={"icon-wrapper"}>
        <div className={dotClassName} />
        {parking.size === "Big" && <BigParking className={"parking-size"} />}
        {parking.size === "Small" && <SmallParking className={"parking-size"} />}
      </div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {parking.address}
        </h2>
        <p>
          {parking.description}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ParkingListItem;
