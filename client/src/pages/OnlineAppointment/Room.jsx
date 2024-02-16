import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const Room = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        const appID = 1967074976;
        const serverSecret = "70fb34f191e089653fe6999b62b7b8e7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), 'Atoms')


        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        })
    };


    return (
        // <Layout>
        <div className="">
            <div className="room-page">
                <div ref={myMeeting}></div>
            </div>
        </div>
        // </Layout>
    )
}

export default Room;