import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import FCM from 'react-native-fcm';
import {saveToken} from './actionCreators';

import App from './App';
import SplashScreen from './components/SplashScreen';
import {setupPushNotifications, onAppBootstrap} from './NotificationService';
import configureStore from './store';
import rootSaga from './sagas';

const {runSaga, store, persistor} = configureStore();
runSaga(rootSaga);
enableScreens(false);
// setupPushNotifications();
// onAppBootstrap()
FCM.getFCMToken().then((token) => store.dispatch(saveToken(token))).catch((e) => console.log(e))

export default () => (
  <Provider store={store}>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
