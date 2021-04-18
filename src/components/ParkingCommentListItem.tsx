import {
  IonItem,
  IonLabel,
  IonNote,
  IonText
} from '@ionic/react';
import './ParkingCommentListItem.css';
import { Comment } from "../data/parkings-module/types";

interface ParkingCommentListItemProps {
  comment: Comment;
}

const ParkingCommentListItem: React.FC<ParkingCommentListItemProps> = ({ comment }) => {
  return (
    <IonItem detail={false}>
      <IonLabel color="primary" className="ion-text-wrap">
        <h2 className={"comment-publisher"}>
          {comment.publisherName}
        </h2>
        <p>
          {comment.content}
        </p>
      </IonLabel>
      <div slot="end" className={"rating"} >
        <IonText color="primary" >5 / {comment.rating}</IonText>
      </div>
    </IonItem>
  );
};

export default ParkingCommentListItem;
