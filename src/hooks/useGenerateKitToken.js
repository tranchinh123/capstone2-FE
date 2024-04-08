import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { randomID } from '../constants/GenerateRandomID';

export const useGenerateKitToken = (userName, ID) => {
    const roomID = ID || randomID(5);
    const appID = 913343285;
    const serverSecret = 'f5f97ab6df5e23a63126beb0795e1f4f';

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