import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
import styles from '../assets/styles/style';

export default class BallotItemHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {starred: this.props.isStarred};
  }
  render() {
    let bookmark = require('../assets/icons/bookmark-icon-filled.png');
    let notBookmark = require('../assets/icons/bookmark-icon-empty.png');
    console.log("HEADER",this.state.starred);
    return ( <View style={styles.headerRow}><Text style={styles.header}>{this.props.title}</Text>
            <TouchableNativeFeedback onPress={() => this.props.onClick()}>
            <View><Image source={this.state.starred?bookmark:notBookmark}/></View></TouchableNativeFeedback></View>);

  }


}
