import React, { Component, PropTypes } from 'react';
import {StyleSheet, View, Text } from 'react-native';

const Info = (props) => <View><Text>{props.title}</Text><Text>{props.description}</Text></View>;
Info.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string
}
Info.defaultProps = {
  title: 'Test Title',
  description: 'Test Description'
}

module.exports = Info;
