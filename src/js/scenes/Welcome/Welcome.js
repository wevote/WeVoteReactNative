import React, { Component } from "react";
import {
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from "../../stylesheets/components/baseStyles"
import RouteConst from "../RouteConst";
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
    Actions.refresh({came_from: RouteConst.KEY_WELCOME, forward_to_ballot: false})
    logging.rnrfLog("onExit from Welcome: currentScene = " + Actions.currentScene);
  };

  componentWillReceiveProps(nextProps) {
    logging.rnrfLog("Welcome: componentWillReceiveProps ");
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
      logging.renderLog("Welcome, when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }

    logging.renderLog("Welcome, scene = " + Actions.currentScene);

    return <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
            <Text style={styles.title_text} >Hello world!</Text>
        </View>
      </View>;
  } // render
} // class
