import {
    IonItem,
    IonLabel,
    IonNote,
    IonCard,
    IonText,
    IonInput,
    IonButtons,
    IonIcon,
    IonSelect,
    IonSelectOption
  } from '@ionic/react';
  import './SearchModal.css';
  import { locationOutline } from 'ionicons/icons';
  import { Parking } from "../data/parkings-module/types";
  import { ReactComponent as BigParking } from "../resources/truck.svg";
  import { ReactComponent as SmallParking } from "../resources/car.svg";
import { useState } from 'react';
  
  
  const SearchModal: React.FC = () => {
    const [parkingType, setParkingType] = useState<string[]>([]);
  
    return (
      <IonCard className={"searchModal"}>
        <IonItem className="searchRow">
            <IonLabel color="primary">כתובת</IonLabel>
            <IonInput color="primary"></IonInput>
            <IonIcon icon={locationOutline} color="primary" onClick={e=>{}}></IonIcon>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary"> מחיר מקסימלי</IonLabel>
            <IonInput color="primary" inputmode="numeric"></IonInput>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary">טווח רצוי מהכתובת</IonLabel>
            <IonInput color="primary" inputmode="numeric"></IonInput>
            <IonLabel color="primary">ק"מ</IonLabel>
        </IonItem>
        <IonItem className="searchRow">
            <IonLabel color="primary">סוג חניה</IonLabel>
            <IonSelect value={parkingType} multiple={true} cancelText="Nah" okText="Okay!" onIonChange={e => setParkingType(e.detail.value)}>
              <IonSelectOption value="public">ציבורית</IonSelectOption>
              <IonSelectOption value="private">פרטית</IonSelectOption>
            </IonSelect>
        </IonItem>
        <button>חפש</button>
    </IonCard>
    );
  };
  
  export default SearchModal;
  