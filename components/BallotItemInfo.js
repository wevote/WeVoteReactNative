import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
let ItemInfo = require('./ItemInfo').default;

export default class BallotItemInfo extends Component {

  render() {

    return ( <ItemInfo item={this.props.item}/> );
  }


}
