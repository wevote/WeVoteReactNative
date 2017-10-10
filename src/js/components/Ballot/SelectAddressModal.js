import React, { Component, PropTypes } from "react";
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import {Actions} from "react-native-router-flux";
import AddressBox from "../../components/AddressBox";
import styles from "../../stylesheets/BaseStyles"

export default class SelectAddressModal extends Component {
  // This modal will allow users to change their addresses

  static propTypes = {
    show: PropTypes.bool,
    //toggleFunction: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render () {
    return <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {this.props.toggleFunction}}
    >
      <View style={{marginTop: 22}}>
        <View>
          <Text>Enter address where you are registered to vote</Text>
{/*
          <TouchableOpacity style = {styles.button} onPress={() => {
            this.setModalVisible(!this.state.modalVisible) }}>
            <Text style = {styles.buttonText}>{ button_text }</Text>
          </TouchableOpacity>;
*/}
          <AddressBox saveUrl={"/ballot"} _toggleSelectAddressModal={() => {
            this.setModalVisible(!this.state.modalVisible) }} />
        </View>
      </View>
    </Modal>
{/*
    return <Modal show onHide={this.props.toggleFunction} className="ballot-election-list ballot-election-list__modal ballot-election-list__modal-mobile" >
      <Modal.Header closeButton onHide={this.props.toggleFunction}>
        <Modal.Title className="ballot-election-list__h1">Enter address where you are registered to vote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddressBox saveUrl={"/ballot"} _toggleSelectAddressModal={this.props.toggleFunction} />
        <br/>
        <br/>
      </Modal.Body>
    </Modal>;
*/}
  }
}
