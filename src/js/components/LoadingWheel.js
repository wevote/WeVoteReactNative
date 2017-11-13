import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from "../stylesheets/BaseStyles"

export default class LoadingWheel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      animating: true,
      mounted: false
    };
  }

  render() {
    let textLines = null;
    if (!this.props.text ) {
      textLines = ['HEY developer, be sure to add some text to describe the reason for the wheel!', 'soon!'];
    } else {
      textLines = this.props.text;
    }
    if (!Array.isArray(this.props.text)) {
      textLines = [textLines];
    }

    return (
      <View style={styles.outerGrayPane} >
        <View style={styles.innerWhitePane} >
          { textLines.map( (item) => <Text style={styles.titlePaddedText} key={item} >{item}</Text> ) }
          <ActivityIndicator
                animating = {this.state.animating}
                color = '#bc2b78'
                size = "large"
                style = {styles.activityIndicator} />
        </View>
      </View>
    );
  }
}


