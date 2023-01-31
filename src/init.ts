import { AppRegistry } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { dispatchShadowAction } from './store/globalStore/dispatchShadowAction';
import { dispatchUpdateLastUserLocation } from './store/globalStore/dispatchUpdateLastUserLocation';
import App from './App';

export function init(appName: string) {
    const notificationHandler = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage.data?.['getLastUserLocation']) {
            dispatchUpdateLastUserLocation(remoteMessage.data?.['getLastUserLocation']);
        }

        if (remoteMessage.data?.['shadowActionId']) {
            dispatchShadowAction(remoteMessage.data['shadowActionId']);
        }
    };

    messaging().setBackgroundMessageHandler(notificationHandler);

    messaging().onMessage(notificationHandler);

    AppRegistry.registerComponent(appName, () => App);
}
