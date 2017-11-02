import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from "react-native-router-flux";
import AddressBox from "../../components/AddressBox";
import styles from "../../stylesheets/BaseStyles"

export default class SelectAddressModal extends Component {
  // This modal will allow users to change their addresses

  static propTypes = {
    show: PropTypes.bool,
    toggleFunction: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    // See https://github.com/facebook/react-native/commit/6a83ac3af62308e4c286ca169f4834b6d2c3fadd
    // onRequestClose only works on Android
    if (Platform.OS === 'ios') {
      this.props.toggleFunction();
    }
  }

  render () {
    return <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {this.props.toggleFunction}}>
        <View>
          <AddressBox saveUrl={"/ballot"} toggleFunction={() => {
            this.setModalVisible(!this.state.modalVisible) }} />
        </View>
      </Modal>
  }
}
