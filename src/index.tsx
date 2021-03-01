import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import configureStore from "./data/configureStore";
import { Provider } from "react-redux";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyB66qJEzFreQiFxnwEp8DFwxozrGle8gEQ",
  authDomain: "parkat-cccbb.firebaseapp.com",
  projectId: "parkat-cccbb",
  appId: "parkat-cccbb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
