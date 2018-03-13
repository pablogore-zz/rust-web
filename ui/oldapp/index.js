import React from 'react';
import ReactDOM from 'react-dom';
import { AppRegistry } from 'react-native';
import App from './app.web.js';

AppRegistry.registerComponent('NCMApp', () => App);
AppRegistry.runApplication('NCMApp', {
  rootTag: document.getElementById('root'),
});
