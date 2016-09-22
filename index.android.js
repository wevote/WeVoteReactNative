/**
 * We Vote's iOS and Android React Native App, sister to the mobile website "WebApp"
 * https://github.com/wevote/WeVoteReactNative
 * @WeVote
 */

import React, { Component, PropTypes} from 'react';
import { AppRegistry, AsyncStorage, View, Text } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './stores/store';
let Loading =  require('./components/LoadingContainer').default;
let Navigation = require('./components/Navigation').default;
const store = configureStore();


export default class WeVoteReactNative extends Component {

  componentWillMount() {

  }

  render() {
    const store = configureStore();
    return <Provider store={store}><Navigation/></Provider>;
  }


}

AppRegistry.registerComponent('WeVoteReactNative', () => WeVoteReactNative);
