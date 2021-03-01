import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { Message } from '../data/messages';
import './MessageListItem.css';
import {useSelector} from "react-redux";
import {exampleStringSelector} from "../data/example-module/selectors";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  const exampleString = useSelector(exampleStringSelector);
  return (
    <IonItem routerLink={`/message/${message.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {message.fromName}
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </h2>
        <h3>{message.subject}</h3>
        <p>
          {exampleString}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
