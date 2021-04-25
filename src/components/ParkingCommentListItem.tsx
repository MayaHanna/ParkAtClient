import {
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonText
} from '@ionic/react';
import './ParkingCommentListItem.css';
import { Comment } from "../data/parkings-module/types";
import {useEffect, useRef, useState} from "react";

interface ParkingCommentListItemProps {
  comment: Comment;
  setComment?: (comment: Comment) => void;
  isEditable: boolean;
}

const ParkingCommentListItem: React.FC<ParkingCommentListItemProps> = ({ comment , setComment, isEditable}) => {


    const handleFieldChangeByEvent = (e: any) => {
        const newValue = e.target.name === "rating" && (parseInt(e.detail.value) > 5 || parseInt(e.detail.value) < 1) ? comment.rating : e.detail.value;
        setComment && setComment({
            ...comment,
            [e.target.name]: newValue
        })
    };

  return (
    <IonItem detail={false} className={"parking-comment-item"}>
      <IonLabel color="primary" className="ion-text-wrap comment-content-label">
        <h2 className={"comment-publisher"}>
          {comment.publisherName}
        </h2>
          {
              isEditable ? <IonInput className="innerText parking-content-input" name="content" value={comment.content} onIonChange={e => handleFieldChangeByEvent(e)} placeholder={"מה יש לך להגיד על החניה?"}/>
                  : <p>
                        {comment.content}
                    </p>
          }
      </IonLabel>
      <div slot="end" className={"rating"} >
          {
              isEditable?
              <div className={"ratingWrapper"}>
                  <IonText color="primary" > 5 / </IonText>
                  <IonInput type={"number"} min={"1"} max={"5"} color="primary" className={"ratingInput"} name="rating" value={comment.rating} onIonChange={e => handleFieldChangeByEvent(e)}/>
              </div>
              :
                  comment.rating && <IonText color="primary" >5 / {comment.rating}</IonText>
          }
      </div>
    </IonItem>
  );
};

export default ParkingCommentListItem;
