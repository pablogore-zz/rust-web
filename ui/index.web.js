import 'babel-polyfill';
import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'

AppRegistry.registerComponent('ui', () => App)
AppRegistry.runApplication('ui', {
  rootTag: document.getElementById('root'),
})
