import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import { useGenerateKitToken } from '../../../hooks/useGenerateKitToken';
const OnlineCourseLearning = () => {
    const { generateKitToken } = useGenerateKitToken('Simon', 'jRED5');
    const { kitToken, roomID } = generateKitToken();
    let myMeeting = async (element) => {
        const kitToken =
            '04AAAAAGXp/AYAEDY5NDU2NzkxMzk5NTcyNDIAcI3CSl4Zf7+rxFQNF/7A47ZEyis3PBBAjuyXlCdrfhtVx/smmMaoqYt7Y+eOyx/3OqWE0bPJDSGcu4Af3WxJiaMJ1Z9PUM9g8hnS5y4vihAQA9KCM7updhUXnJ1e0OoAgYa4QdkoKs6xtuYscP+UgzE=#eyJ1c2VySUQiOiI3R0tyTiIsInJvb21JRCI6InJKOU5xIiwidXNlck5hbWUiOiJTaW1vbiIsImFwcElEIjo2MjU0NzI3Nzl9';
        const roomID = 'rJ9Nq';
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ ZegoSuperBoardManager });
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol +
                        '//' +
                        window.location.host +
                        window.location.pathname +
                        '?roomID=' +
                        roomID
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            },
            whiteboardConfig: {
                showAddImageButton: true,
                showCreateAndCloseButton: true
            },
            showPreJoinView: false
        });
    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
};

export default OnlineCourseLearning;