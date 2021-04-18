import {IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonToolbar} from "@ionic/react";
import ParkingDetails from "../components/parkingDetails";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../data/configureStore";
import {parkingsWithIdSelector} from "../data/parkings-module/selectors";
import {Parking} from "../data/parkings-module/types";
import ParkingCommentListItem from "../components/ParkingCommentListItem";

const ParkingProfile: React.FC = () => {
    const params = useParams<{ id: string }>();
    const parking: Parking | undefined = useSelector((state: RootState) => parkingsWithIdSelector(state, params.id));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton color="secondary" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {parking &&
                <IonContent fullscreen>
                    <ParkingDetails parking={parking} isRouting={false}/>
                    <IonList>
                        {
                            parking?.comments.map((comment) => <ParkingCommentListItem comment={comment} />)
                        }
                    </IonList>
                </IonContent>
            }
        </IonPage>
    );
}

export default ParkingProfile;