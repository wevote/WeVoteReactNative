import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
let Info = require('./Info');

export default class ItemInfo extends Component {

  render() {

    return ( <View><Info/>
             </View>
            );
  }


}
