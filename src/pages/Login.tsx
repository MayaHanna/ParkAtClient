import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonText,
    
  } from '@ionic/react';
  import './Login.css';
  import firebase from "firebase"; 
  import * as firebaseui from "firebaseui";


const Login: React.FC = () => {


  useIonViewWillEnter(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = ({
      callbacks: {
        signInSuccessWithAuthResult: function(authResult: any, redirectUrl: string) {
          const displayName = authResult.user.displayName;

          return true;
        },
      },
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
    });
    ui.start('#firebaseui-auth-container', uiConfig)
  });

    return (
        <IonPage>
          <IonContent fullscreen>
            <div  id="login-page">
              <IonText color="secondary">
                <h1 className={"title"}>ParkAt</h1>
              </IonText>
              <IonText color="primary">
                <h4 className={"startDriving"}>!תתחיל לחנות</h4>
              </IonText>

              <div id="firebaseui-auth-container">
                  
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
}

export default Login;