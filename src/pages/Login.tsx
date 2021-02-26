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
    IonRow,
    IonGrid,
    IonCol,
  } from '@ionic/react';
  import './Login.css';

const Login: React.FC = () => {
    return (
        <IonPage>
          <IonContent fullscreen  id="login-page">
            <h2>ParkAt</h2>
            <h1>תתחיל לחנות</h1>
            
              
          </IonContent>
        </IonPage>
      );
}

export default Login;