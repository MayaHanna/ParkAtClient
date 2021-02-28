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
    IonText
  } from '@ionic/react';
  import './Login.css';
  import firebase from "firebase"; 
  import * as firebaseui from "firebaseui";
  import { useState } from 'react';

const Login: React.FC = () => {

  useIonViewWillEnter(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = ({
      callbacks: {
        signInSuccessWithAuthResult: function(authResult: any, redirectUrl: string) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          debugger;
          var photo = authResult.user.photoURL;
          var displayName = authResult.user.displayName;
          var email = authResult.user.email;

          console.log(authResult.toJSON());
          return true;
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      //signInFlow: 'popup',
      signInSuccessUrl: '/home',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
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
                <h4>!תתחיל לחנות</h4>
              </IonText>

              <div id="firebaseui-auth-container">
                  
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
}

export default Login;