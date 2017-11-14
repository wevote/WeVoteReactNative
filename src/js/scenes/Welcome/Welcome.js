import React, { Component } from "react";
import {
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../../stylesheets/BaseStyles"
const logging = require("../../utils/logging");

/*
  This is just a placeholder for whatever will handle Welcome, feel free to use it or replace it.
  Steve Nov 13, 2017
 */

export default class Welcome extends Component {

  constructor (props) {
    super(props);
    this.state = {
     };

  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to Welcome: currentScene = " + Actions.currentScene);
    Actions.refresh({dummy: 'hello'});  // triggers componentWillReceiveProps
  };

  static onExit = () => {
    logging.rnrfLog("onExit from Welcome: currentScene = " + Actions.currentScene);
  };

  componentWillReceiveProps(nextProps) {
  }

  // Doesn't work in react-native? // componentDidMount () {
  componentWillMount () {
    console.log("Welcome ++++ MOUNT currentScene = " + Actions.currentScene);
  }

  componentWillUnmount () {
    console.log("Welcome ---- UN mount");
  }


  render () {
    if (Actions.currentScene !== "welcome") {
      logging.renderLog("Welcome", "when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }

    logging.renderLog("Welcome", "scene = " + Actions.currentScene);

    return <View style={styles.outerGrayPane} >
        <View style={styles.innerWhitePane} >
            <Text style={styles.titleText} >Hello world!</Text>
        </View>
      </View>;
  } // render
} // class
