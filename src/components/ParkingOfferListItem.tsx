import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './ParkingOfferListItem.css';
import { Parking } from "../data/parkings-module/types";
import { ReactComponent as BigParking } from "../resources/truck.svg";
import { ReactComponent as SmallParking } from "../resources/car.svg";
import {FullParkingOffer} from "../data/parkings-offers-module/types";

interface MessageListItemProps {
    parkingOffer: FullParkingOffer;
}

const ParkingOfferListItem: React.FC<MessageListItemProps> = ({ parkingOffer }) => {
  const dotClassName = `dot dot-${parkingOffer.parking.status}`;
  const startDate = new Date(parkingOffer.start);
  const endDate = new Date(parkingOffer.end);
    return (
    <IonItem routerLink={`/parking/${parkingOffer.id}`} detail={false}>
      <div slot="start" className={"icon-wrapper"}>
        <div className={dotClassName} />
        {parkingOffer.parking.size === "Big" && <BigParking className={"parking-size"}/>}
        {parkingOffer.parking.size === "Small" && <SmallParking className={"parking-size"}/>}
      </div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {parkingOffer.parking.address}
        </h2>
        <h3>{startDate.getDate()}/{startDate.getMonth() + 1}/{startDate.getFullYear()}</h3>
        <h3>{startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()}</h3>
        <p>
          {parkingOffer.parking.description}
        </p>
      </IonLabel>
        <div slot="end" className={"price"}>
            <h3>{parkingOffer.price}&#8362;</h3>
        </div>
    </IonItem>
  );
};

export default ParkingOfferListItem;