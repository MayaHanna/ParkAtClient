import {
    IonContent,
    IonPage,
    useIonViewWillEnter,
    IonText,
    useIonViewDidLeave,
    useIonViewWillLeave,

  } from '@ionic/react';
  import './Login.css';
  import firebase from "firebase"; 
  import * as firebaseui from "firebaseui";
  import {useDispatch, useSelector,} from "react-redux";
  import { setUser} from "../data/user-module/actions";
  import { useHistory } from "react-router";
  import {useState, useEffect, useRef} from 'react';
  import {userSelector} from "../data/user-module/selectors";
  import auth from "firebaseui";


const Login: React.FC = () => {

  const dispatch = useDispatch();

  const history = useHistory();
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = ({
    callbacks: {
      signInSuccessWithAuthResult: function(authResult: any, redirectUrl: string) {
        dispatch(setUser({userDisplayName: authResult.user.displayName,
           userMailAddress: authResult.user.email,
            userPicture: authResult.user.photoURL}));

        dispatch(history.push("/home"));

        return true;
      },
    },
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  });

  useIonViewWillEnter(() => {
    ui.start('#firebaseui-auth-container', uiConfig);
  });

  useIonViewWillLeave(()=>{
    ui.delete();
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