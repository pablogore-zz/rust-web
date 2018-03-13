import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Welcome to React 123 ⚛️</Text>
        </View>
        <Text style={styles.appIntro}>
          To get started, edit src/App.js and save to reload. 123
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
})

// import React from 'react';
// import { StackNavigator } from 'react-navigation';
// import { Provider } from 'unstated';
// import { ThemeProvider } from 'glamorous-native';
// // import { Examples } from '@shoutem/ui';

// import LoginScreen from './screens/LoginScreen';
// import ProfileScreen from './screens/ProfileScreen';

// const theme = {
//   colors: {
//     red: 'red',
//   },
// };

// const Navigator = StackNavigator({
//   LoginScreen: {
//     screen: LoginScreen
//   },
//   ProfileScreen: {
//     screen: ProfileScreen
//   },
// });

// export default class App extends React.Component {
//   render() {
//     return (
//       <ThemeProvider theme={theme}>
//         <Provider>
//           <Navigator />
//         </Provider>
//       </ThemeProvider>
//     );
//   }
// }