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
let SearchBox = require('./components/SearchBox').default;
import styles from './assets/styles/style';



class WeVoteReactNative extends Component {

  constructor(props){
    super(props);
    this.state = {ballot: ballot.ballot_item_list};

  }

  componentWillMount () {
    this.ballotRetrieve();
  }



    async ballotRetrieve() {
      try{
        // Reach out to WeVoteServer and pull the candidate data
        let response = await fetch("https://api.wevoteusa.org/apis/v1/voterBallotItemsRetrieve/" +
            "?voter_device_id=" + "2VQ4w0mpBIjaIR81yJXMpu9eIARa87QTLqlgM3aj9cBNADqlqMBSd4gFGefdOD0pz8X02srVljj6uopGprgeeq09", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        let responseJson = await response.json();

        this.setState({ballot: responseJson.ballot_item_list});

      } catch(error) {
        console.error(error);
      }
    }

  render() {
    content = ballot != undefined ? <Ballot ballot={this.state.ballot}/> : <Text> No Ballot Available </Text> ;

    return  <View style={styles.app}><Header/><SearchBox ballotUpdate = {this.ballotRetrieve.bind(this)}/><ScrollView>
            {content}
          </ScrollView>
          </View>
  }


}

AppRegistry.registerComponent('WeVoteReactNative', () => WeVoteReactNative);
