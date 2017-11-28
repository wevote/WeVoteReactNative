import React, { Component } from "react";
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import AddressBox from "../../components/AddressBox";
import RouteConst from "../RouteConst"
const logging = require("../../utils/logging");

export default class Location extends Component {
  static propTypes = {
      location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {};
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to location: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from location: currentScene = " + Actions.currentScene);
    Actions.refresh({came_from: RouteConst.KEY_LOCATION, forward_to_ballot: false})
  };


  render () {
    logging.renderLog("Location, scene = " + Actions.currentScene);

    return <View>
        <AddressBox {...this.props} saveUrl="/ballot" />
    </View>;
  }
}