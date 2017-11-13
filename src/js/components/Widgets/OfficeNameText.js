import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";

export default class OfficeNameText extends Component {
  static propTypes = {
    political_party: PropTypes.string,
    contest_office_name: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  componentWillReceiveProps () {
    this.setState({transitioning: false});
  }


  render () {
    let nameText = "";
    let { contest_office_name, political_party } = this.props;
    if (political_party === undefined) {
      nameText = <Text style = {{fontSize: 15, color: '#555', fontWeight:'bold'}} className="no-political-party">
        Candidate for { contest_office_name }
      </Text>;
    } else {
      nameText = <Text style = {{fontSize: 15, color: '#555', fontWeight:'bold'}} className="card-main__political-party u-bold u-gray-darker">
        {political_party} candidate for { contest_office_name }
      </Text>;
    }
    return nameText;

  }
}
