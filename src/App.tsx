import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {useHistory} from "react-router";
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import Login from './pages/Login';
import ParkingOffer from './pages/ParkingOffer';
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css"
import { userSelector } from './data/user-module/selectors';
import {useDispatch, useSelector} from "react-redux";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {useEffect, useRef, useState} from "react";
import {setUser} from "./data/user-module/actions";
import {Paypal} from "./pages/Paypal";

const App: React.FC = () =>{
  const user = useSelector(userSelector);
  const [currentScreen, setCurrentScreen] = useState("Loading");

    const userRef = useRef<any>();
    const dispatch = useDispatch();
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
        setTimeout(() => {
            if (!userRef.current) {
                setCurrentScreen("Login");
            }
        }, 3000)
    }

    if (!userRef.current && currentUser) {
        setCurrentScreen("Home");
        dispatch(setUser({userDisplayName: currentUser.displayName || undefined}))
    }
    userRef.current = currentUser;
 return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact={true}>
          {
              currentScreen === "Loading" ? <IonLoading isOpen={true}/> : currentScreen === "Home" ? <Home/> : <Redirect to="/login" />
          }
        </Route>
        <Route path="/message/:id">
           <ViewMessage />
        </Route>
        <Route path="/login" exact={true}>
          <Login/>
        </Route>
        <Route path="/parkingOffer/:id">
          <ParkingOffer/>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)};

export default App;
