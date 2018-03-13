import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { withState, compose } from 'recompose';
import strings from '../strings';
import { base, colors } from '../theme';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
};

const NotificationScreen = ({ navigation, error }) => (
  <View style={base.page}>
    <View style={styles.container}>
      <Text style={base.boldText}>
        {strings.feed.emptyData}
      </Text>
    </View>
  </View>
);

NotificationScreen.propTypes = propTypes;

export default compose(
  withState('error', 'setError', ''),
)(NotificationScreen);

// import { Permissions, Notifications } from 'expo';

// const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

// async function registerForPushNotificationsAsync() {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;

//   // only ask if permissions have not already been determined, because
//   // iOS won't necessarily prompt the user a second time.
//   if (existingStatus !== 'granted') {
//     // Android remote notification permissions are granted during the app
//     // install, so this will only ask on iOS
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }

//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }

//   // Get the token that uniquely identifies this device
//   let token = await Notifications.getExpoPushTokenAsync();

//   // POST the token to your backend server from where you can retrieve it to send push notifications.
//   return fetch(PUSH_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       token: {
//         value: token,
//       },
//       user: {
//         username: 'Brent',
//       },
//     }),
//   });
// }
