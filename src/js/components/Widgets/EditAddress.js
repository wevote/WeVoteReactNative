import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text } from "react-native";
import { styles } from "../../stylesheets/BaseStyles"
//import EditAddressPopover from "./EditAddressPopover";

export default class EditAddress extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    _toggleSelectAddressModal: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    let normalized_line1 = this.props.address.normalized_line1 || "";

    let addressString = this.props.address.text_for_map_search || "";
    if (addressString.length === 0) {
      let addressObj = this.props.address || {};
      if (addressObj !== {} && (typeof addressObj.voterAddressSave != "undefined")) {
        addressString = addressObj.voterAddressSave;
      }
    }

    if (addressString.length) {
      return (
        <View className="ballot__date_location">
          <Text style={{ fontSize: 15 }}>{ addressString } &nbsp; (
            <Text style = {{color: '#48BBEC'}} onPress={this.props._toggleSelectAddressModal}>Edit</Text>)
          </Text>
          {/* normalized_line1.length ? <Text>&nbsp;</Text> : <EditAddressPopover popover_off={false} placement={"bottom"} onClick={this.props._toggleSelectAddressModal} /> */}
        </View>
      );
    } else {
      return (
        <View className="ballot__date_location">
          <Text> In order to see your ballot, please enter your address. </Text>
          <Text className="hidden-print" onPress={this.props._toggleSelectAddressModal}>nbsp; Add Your Address</Text>
        </View>
      );
    }
  }
}
