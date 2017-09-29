import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import App from './src/js/scenes/OldMain/AppOld'
// 9/28/17:  This needs work, it should probably be exactly like index.ios.js

class WeVote extends Component{
  render(){
    return(
      <App/>
      );
  }
}

AppRegistry.registerComponent('WeVoteReactNative', () => App);
