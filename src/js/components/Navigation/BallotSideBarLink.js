import React, { Component } from "react";
import PropTypes from 'prop-types';
import { sentenceCaseString } from "../../utils/textFormat";
import { Link } from "react-router-native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export default class BallotSideBarLink extends Component {
  static propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    subtitle: PropTypes.string,
    displaySubtitles: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    let subtitle_in_sentence_case = sentenceCaseString(this.props.subtitle);

    return <View className="BallotItem__summary-item-container">
      <TouchableOpacity onPress={this.props.onClick.bind(this)}>
        <Link to={this.props.url}>
          <Text className="BallotItem__summary-item" > {this.props.label} </Text>
          { this.props.displaySubtitles ?
            <Text className="BallotItem__summary-subtitle"> {subtitle_in_sentence_case}</Text> : null
          }
        </Link>
      </TouchableOpacity>
    </View>;
  }
}
