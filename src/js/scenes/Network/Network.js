import React, { Component } from "react";
import { Text, View, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import AddressBox from "../../components/AddressBox";
import RouteConst from "../RouteConst"
const logging = require("../../utils/logging");

export default class Network extends Component {
  static propTypes = {
      location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {};
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to Network: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from Netowrl: currentScene = " + Actions.currentScene);
    Actions.refresh({came_from: RouteConst.KEY_NETWORK});
  };


  render () {
    logging.renderLog("Network, scene = " + Actions.currentScene);

    if(Actions.currentScene === RouteConst.KEY_NETWORK) {
      Linking.openURL('https://wevote.us/more/network');
    }

    return <View>
        <Text>Redirecting to network</Text>
    </View>;
  }
}