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
  parking: Parking;
}

const ParkingListItem: React.FC<MessageListItemProps> = ({ parking }) => {
  const dotClassName = `dot dot-${parking.status}`;
  return (
    <IonItem routerLink={`/parking/${parking.id}`} detail={false}>
      <div slot="start" className={"icon-wrapper"}>
        <div className={dotClassName} />
        {parking.size === "Big" && <BigParking className={"parking-size"}/>}
        {parking.size === "Small" && <SmallParking className={"parking-size"}/>}
      </div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {parking.address}
        </h2>
        <h3>{new Date(parking.start).getDate()}/{new Date(parking.start).getMonth() + 1}/{new Date(parking.start).getFullYear()}</h3>
        <h3>{new Date(parking.start).getHours()}:{new Date(parking.start).getMinutes()} - {new Date(parking.end).getHours()}:{new Date(parking.end).getMinutes()}</h3>
        <p>
          {parking.description}
        </p>
      </IonLabel>
        <div slot="end" className={"price"}>
            <h3>{parking.price}&#8362;</h3>
        </div>
    </IonItem>
  );
};

export default ParkingListItem;
