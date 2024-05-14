import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { useGenerateKitToken } from "../../../hooks/useGenerateKitToken";
import { Navigate } from "react-router-dom";

const VideoCallMeeting = ({ name, token, notAllowToJoin }) => {
  // const { generateKitToken } = useGenerateKitToken('Simon', 'jRED5');
  const { generateKitToken } = useGenerateKitToken(name, token);
  const { kitToken, roomID } = generateKitToken();

  let myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.addPlugins({ ZegoSuperBoardManager });
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      whiteboardConfig: {
        showAddImageButton: true,
        showCreateAndCloseButton: true,
      },
      showPreJoinView: false,
    });
  };

  return (
    <>
      {notAllowToJoin ? (
        <Navigate to="/not-allow" />
      ) : (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: "100vw", height: "100vh" }}
        ></div>
      )}
    </>
  );
};

export default VideoCallMeeting;
