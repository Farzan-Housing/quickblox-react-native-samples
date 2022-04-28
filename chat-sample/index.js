import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
// import messaging from '@react-native-firebase/messaging'
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './src';
import {name as appName} from './app.json';

// async function onMessageReceived(message) {
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     importance: AndroidImportance.HIGH,
//   });

//   await notifee.displayNotification({
//     title: 'Notification Title',
//     body: message.data.message,
//     android: {
//       channelId,
//       importance: AndroidImportance.HIGH,
//     },
//   });
// }

// messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
