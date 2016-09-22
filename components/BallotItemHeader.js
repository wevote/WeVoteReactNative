import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
import styles from '../assets/styles/style';

export default class BallotItemHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {saved: this.props.saved};
  }
  render() {
    let bookmark = require('../assets/icons/bookmark-icon-filled.png');
    let notBookmark = require('../assets/icons/bookmark-icon-empty.png');

    return ( <View style={styles.headerRow}><Text style={styles.header}>{this.props.title}</Text>
            <TouchableNativeFeedback onPress={() => {this.setState({saved: !this.state.saved})}}>
            <View><Image source={this.state.saved?bookmark:notBookmark}/></View></TouchableNativeFeedback></View>);

  }


}
