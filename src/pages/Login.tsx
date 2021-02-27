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
          <IonContent fullscreen>
            <div  id="login-page">
              <h1>ParkAt</h1>
              <h4>!תתחיל לחנות</h4>
            </div>
            
              
          </IonContent>
        </IonPage>
      );
}

export default Login;