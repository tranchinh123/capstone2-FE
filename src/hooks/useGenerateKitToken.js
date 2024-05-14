import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { randomID } from "../constants/GenerateRandomID";

export const useGenerateKitToken = (userName, ID) => {
  const roomID = ID || randomID(5);
  const appID = 1162237749;
  const serverSecret = "6302865c8b9f175d0d2b19433bf822af";

  const generateKitToken = () => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      userName
    );
    return { kitToken, roomID };
  };

  return { generateKitToken };
};
