import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import AddressBox from "../../components/AddressBox";
import { Text, View } from 'react-native';
const logging = require("../../utils/logging");
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
//import Helmet from "react-helmet";


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
    Actions.refresh({came_from: 'location', forward_to_ballot: false})
  };


  render () {
    // console.log("Settings/Location");
    logging.renderLog("Location.js", "scene = " + Actions.currentScene);

    return <View>
        <AddressBox {...this.props} saveUrl="/ballot" />
    </View>;
  }
}