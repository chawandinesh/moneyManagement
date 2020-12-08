/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as AppName} from './app.json';
import StackNavigator from './src/navigators/stackNavigator/stackNavigator';
import TabNavigator from './src/navigators/tabNavigator/tabNavigator';

// AppRegistry.registerComponent('eventManagerCli', () => StackNavigator);
const App = () => {
  return <StackNavigator />;
};

export default App;
