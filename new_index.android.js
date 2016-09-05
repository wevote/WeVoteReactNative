/**
 * We Vote's iOS and Android React Native App, sister to the mobile website "WebApp"
 * https://github.com/wevote/WeVoteReactNative
 * @WeVote
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Navigator
} from 'react-native';
import ballot from './assets/stubs/ballotList';
let Ballot = require('./components/Ballot').default;
let Header = require('./components/Header').default;
import styles from './assets/styles/style';



class WeVoteReactNative extends Component {

  constructor(props){
    super(props);
    this.state = {ballot: ballot.ballot_item_list};
  }

  componentWillMount () {

  }

  render() {
    return <View><ScrollView style={styles.app}><Ballot ballot={this.state.ballot}/></ScrollView></View>
  }


}

AppRegistry.registerComponent('WeVoteReactNative', () => WeVoteReactNative);
