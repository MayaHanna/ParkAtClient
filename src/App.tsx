import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import firebase from "firebase/app";
import "firebase/auth";


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

const App: React.FC = () =>{
 
  
  useIonViewWillEnter(() => {

    var firebaseConfig = {
      apiKey: "AIzaSyB66qJEzFreQiFxnwEp8DFwxozrGle8gEQ",
      authDomain: "parkat-cccbb.firebaseapp.com",
      projectId: "parkat-cccbb"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  })

 return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/message/:id">
           <ViewMessage />
        </Route>
        <Route path="/login" exact={true}>
          <Login/>
        </Route>
        <Route path="/signin" exact={true}>
          <SignIn/>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)};

export default App;
