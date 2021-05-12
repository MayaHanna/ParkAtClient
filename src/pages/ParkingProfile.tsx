import {
    IonBackButton, IonButton,
    IonButtons, IonCard,
    IonContent, IonFab,
    IonFabButton, IonFabList,
    IonHeader, IonIcon,
    IonList,
    IonPage,
    IonToolbar
} from "@ionic/react";
import ParkingDetails from "../components/parkingDetails";
import {useLocation, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../data/configureStore";
import {parkingsWithIdSelector} from "../data/parkings-module/selectors";
import {Comment, Parking} from "../data/parkings-module/types";
import ParkingCommentListItem from "../components/ParkingCommentListItem";
import {add} from "ionicons/icons";
import {useState} from "react";
import {userSelector} from "../data/user-module/selectors";
import {boolean} from "boolean";
import {addCommentToParking} from "../data/parkings-module/actions";

const ParkingProfile: React.FC = () => {
    const currentUser = useSelector(userSelector);
    const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
    const params = useParams<{ id: string }>();
    const parking: Parking | undefined = useSelector((state: RootState) => parkingsWithIdSelector(state, params.id));

    const location = useLocation();
    const search = location.search;

    const canAddComment = search.split("=")[1];

    const initialNewComment: Comment = {
        content: "",
        publisher: currentUser.userMailAddress || "",
        publisherName: currentUser.userDisplayName || ""
    };

    const [newComment, setNewComment] = useState<Comment>(initialNewComment);

    const dispatch = useDispatch();
    const addComment = () => {
        if (parking) {
            dispatch(addCommentToParking({
                comment: newComment,
                parkingId: parking.id
            }));
            setIsAddCommentClicked(false);
            setNewComment(initialNewComment);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons  slot="end">
                        <IonBackButton text="חזור" color="secondary" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {parking &&
                <IonContent fullscreen>
                    <ParkingDetails parking={parking} isRouting={false}/>
                    <IonList>
                        {
                            parking?.comments.map((comment) => <ParkingCommentListItem comment={comment} key={`${comment.publisher}${comment.rating}${comment.content}`} isEditable={false}/>)

                        }
                        {
                            isAddCommentClicked &&
                            <>
                                <ParkingCommentListItem comment={newComment} setComment={setNewComment} key={"NewComment"} isEditable={true}/>
                                <IonButtons>
                                    <IonButton className="innerText" onClick={addComment}>שמור תגובה</IonButton>
                                </IonButtons>
                            </>
                        }
                    </IonList>
                </IonContent>
            }
            {
                boolean(canAddComment) &&
                <IonFab className="fabButton" vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="secondary">
                        <IonIcon icon={add} />
                    </IonFabButton>
                    <IonFabList side="top" className="fabList">
                        <IonCard className="menu">
                            <IonButtons className="menuButtons">
                                <IonButton onClick={() => setIsAddCommentClicked(true)}> הוסף תגובה (5 נקודות) </IonButton>
                            </IonButtons>
                        </IonCard>


                        {/* <IonFabButton> */}
                        {/* <IonButton> הוסף הצעת חניה </IonButton> */}
                        {/* </IonFabButton> */}
                    </IonFabList>
                </IonFab>
            }
        </IonPage>
    );
}

export default ParkingProfile;