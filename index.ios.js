import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
const MessageQueue = require('MessageQueue');

import App from './src/js/scenes/Main/App'

class WeVote extends Component{
  render(){
    // MessageQueue.spy(true); // Important tool for debugging JavaScript to ObjectiveC bridging
    return(
      <App/>
      );
  }
}

/* AppRegistry is the JS entry point to running all React Native apps. App root components should register themselves
with AppRegistry.registerComponent, then the native system can load the bundle for the app and then actually run the app
when it's ready by invoking AppRegistry.runApplication. */

AppRegistry.registerComponent('WeVoteReactNative', () => App);
