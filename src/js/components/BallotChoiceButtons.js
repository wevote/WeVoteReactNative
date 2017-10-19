import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
import styles from '../assets/styles/style';

export default class BallotChoiceButtons extends Component {



  constructor(props) {
    super(props);
    this.state = {support: this.props.isSupported};
    //this._switchToSupport = this._switchToSupport.bind(this);
  }


  render() {
    let supportBlank = require('../assets/icons/up-arrow-gray-icon.png');
    let opposeBlank = require('../assets/icons/down-arrow-gray-icon.png');
    let support = require('../assets/icons/up-arrow-color-icon.png');
    let oppose = require('../assets/icons/down-arrow-color-icon.png');




    return ( <View style={styles.buttonRow}>
                  {console.log(this.state.support)}
                  <TouchableNativeFeedback onPress={() => {this.setState({support: true})}}><View><Image source={this.state.support?support:supportBlank}></Image></View></TouchableNativeFeedback>

                  <TouchableNativeFeedback onPress={() => {this.setState({support: false})}}><View><Image source={(!this.state.support && this.state.support !== undefined)?oppose:opposeBlank}></Image></View></TouchableNativeFeedback>

                  <TouchableNativeFeedback><View><Text>Comment</Text></View></TouchableNativeFeedback>

                  <TouchableNativeFeedback><View><Text>Share</Text></View></TouchableNativeFeedback>

             </View>

            );

  }


}
