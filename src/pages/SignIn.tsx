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
  import './SignIn.css';
  import firebase from "firebase"; 
  import * as firebaseui from "firebaseui";


const SignIn: React.FC = () => {

  useIonViewWillEnter(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = ({
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    });
    ui.start('#firebaseui-auth-container', uiConfig)
  });

    return (
        <IonPage>
          <IonContent fullscreen>
            <div  id="signIn-page">
              <h1>הרשמה</h1>
              <div id="#firebaseui-auth-container">

              </div>
            </div>
          </IonContent>
        </IonPage>
      );
}

export default SignIn;