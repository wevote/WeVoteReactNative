import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View } from "react-native";
export default class BallotIndex extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    return <View className="ballot">
            { this.props.children }
          </View>;
  }
}
