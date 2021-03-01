import MessageListItem from '../components/MessageListItem';
import { useState, useEffect } from 'react';
import { Message, getMessages } from '../data/messages';
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
  IonText
} from '@ionic/react';
import './Home.css';
import firebase from 'firebase';


const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [displayName, setDisplayName] = useState<string>();

  firebase.auth().onAuthStateChanged(()=>{
    setDisplayName(firebase.auth().currentUser?.displayName?.toString());
  });

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar className={"toolbar"}>
          <IonTitle>Inbox</IonTitle>
          <IonText className={"userName"} color="primary">
          {displayName}  שלום 
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
