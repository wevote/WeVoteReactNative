import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import AddressBox from "../../components/AddressBox";
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
//import Helmet from "react-helmet";
import { Text, View } from 'react-native';

export default class Location extends Component {
  static propTypes = {
      location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {};
  }

  static onEnter = () => {
    console.log("RNRF onEnter to location: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    console.log("RNRF onExit from location: currentScene = " + Actions.currentScene);
    Actions.refresh({came_from: 'location', forward_to_ballot: false})
  };


  render () {
    // console.log("Settings/Location");
    console.log("Location.js =================== render (), scene = " + Actions.currentScene);

    return <View>
        <AddressBox {...this.props} saveUrl="/ballot" />
    </View>;
  }
}