import React, { Component, PropTypes } from "react";
import { View, Text } from "react-native";
import { styles } from "../../scenes/More/SignIn";
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
    let address = this.props.address.text_for_map_search || "";
    let normalized_line1 = this.props.address.normalized_line1 || "";

    if (address.length) {
      return (
        <View className="ballot__date_location">
          <Text style={{ fontSize: 15 }}>{ address } &nbsp; (
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
