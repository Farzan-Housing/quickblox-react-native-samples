import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar, StyleSheet, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
// import messaging from '@react-native-firebase/messaging';
import FCM from 'react-native-fcm';
import notifee from '@notifee/react-native'

import Navigator from './Navigation';
import ChatConnectionIndicator from './components/ChatConnectionIndicator';
import {
  appStart,
  chatConnectAndSubscribe,
  createSubscriptions,
} from './actionCreators';
import {colors} from './theme';
import config from './QBConfig';

const styles = StyleSheet.create({
  navigatorView: {
    backgroundColor: colors.primary,
    flex: 1,
    width: '100%',
  },
});

export default function App() {
  const dispatch = useDispatch();
  const {appReady, connected, connecting, loggedIn} = useSelector(
    ({app, auth, chat}) => ({
      appReady: app.ready,
      connected: chat.connected,
      connecting: chat.loading,
      loggedIn: auth.loggedIn,
    }),
  );

  React.useEffect(() => {
    dispatch(appStart(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const unsubscribe = messaging().onMessage(onMessageReceived);
    // return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (appReady && loggedIn) {
      dispatch(chatConnectAndSubscribe());
      dispatch(createSubscriptions());
    }
  }, [appReady, dispatch, loggedIn]);

  async function onMessageReceived(message) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      body: message.data.message,
      android: {
        channelId
      },
    });
  }

  return (
    <SafeAreaProvider style={styles.navigatorView}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Navigator appReady={appReady} loggedIn={loggedIn} />
      {appReady && loggedIn ? (
        <ChatConnectionIndicator
          connected={connected}
          connecting={connecting}
        />
      ) : null}
      <FlashMessage position="bottom" />
    </SafeAreaProvider>
  );
}
