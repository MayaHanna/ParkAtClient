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
  onClick: Function;
  isRouting: boolean;
  isCanAddComment?: boolean;
  isCanAddImage?: boolean;
}

interface ItemProps {
    onClick: () => void;
    routerLink?: string;
}

const ParkingListItem: React.FC<MessageListItemProps> = ({ parking, onClick, isRouting, isCanAddComment, isCanAddImage }) => {
  const dotClassName = `dot dot-Free`;
  // const dotClassName = `dot dot-${parking.status}`;

    let itemProps: ItemProps = {
        onClick: () => onClick(parking)
    };

    if (isRouting) {
        itemProps = {
            ...itemProps,
            routerLink: `/parking/${parking.id}?canAddComment=${isCanAddComment || false}&canAddImage=${isCanAddImage || false}`
        }
    }
  return (
    <IonItem button {...itemProps}>
      <div slot="start" className={"icon-wrapper"}>
        {parking.size === "Big" && <BigParking className={"parking-size"} />}
        {parking.size === "Small" && <SmallParking className={"parking-size"} />}
      </div>
      <IonLabel className="ion-text-wrap" color="primary">
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
