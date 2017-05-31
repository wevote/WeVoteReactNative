import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet,Image, View, Text } from 'react-native';

export default MeasureInfo = ({description}) =>  <Text style={styles.text}> {description}</Text>

const styles = StyleSheet.create({
  text:{
  padding:10
  },
})
