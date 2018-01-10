import React, { Component } from "react";
import { Linking, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import CookieStore from "../../stores/CookieStore";
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

    if (Actions.currentScene === RouteConst.KEY_NETWORK) {
      Linking.openURL(CookieStore.getJumpURLWithCookie('https://wevote.us/more/network'));
    }
    return null;
  }
}