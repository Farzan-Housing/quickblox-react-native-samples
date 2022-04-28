import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

import DialogsList from './List';
import useDialogScreenOptions from './useDialogScreenOptions';
import {styles} from '../../theme';
import QB from 'quickblox-react-native-sdk';

function DialogsScreen(props) {
  const {navigation} = props;
  const [deleteMode, setDeleteMode] = React.useState(false);

  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'x',
      name: 'New Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        importance: AndroidImportance.HIGH
      },
    });
  }

  const sendEvent = () => {
    const event = {
      notificationType: QB.events.NOTIFICATION_TYPE.PUSH,
      payload: {
        message: "Your push notification message",
        // key: value
      },
      recipientsIds: [134498335], // users' IDs to deliver notification
      senderId: 134481045, // ID of the user who created the event
      type: QB.events.NOTIFICATION_EVENT_TYPE.ONE_SHOT,
    };

    QB.events.create(event).then(d => console.log('data', d))
  }

  const turnDeleteModeOn = () => {
    if (deleteMode) {
      return;
    }
    setDeleteMode(true);
  };

  const turnDeleteModeOff = () => {
    if (!deleteMode) {
      return;
    }
    setDeleteMode(false);
  };

  const navigationOptions = useDialogScreenOptions(
    deleteMode,
    turnDeleteModeOff,
  );

  React.useLayoutEffect(() => {
    if (navigation && navigationOptions) {
      navigation.setOptions(navigationOptions);
    }
  }, [navigation, navigationOptions]);

  const goToDialog = dialog =>
    navigation.navigate('Messages', {dialogId: dialog.id});

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <Button title="Display Notification" onPress={() => { onDisplayNotification() }} />
      <Button title="send event" onPress={() => sendEvent()} />
      <DialogsList
        onLongPress={turnDeleteModeOn}
        onPress={deleteMode ? undefined : goToDialog}
        selectable={deleteMode}
      />
    </SafeAreaView>
  );
}

export default React.memo(DialogsScreen);
