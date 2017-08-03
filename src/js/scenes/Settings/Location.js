import React, { Component, PropTypes } from "react";
import AddressBox from "../../components/AddressBox";
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
//import Helmet from "react-helmet";
import { Text, View } from 'react-native';

export default class Location extends Component {
  static propTypes = {
      location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {};
  }

  render () {
    // console.log("Settings/Location");
    return <View>
      /*<BrowserPushMessage incomingProps={this.props} />*/
      <Text>
        Enter address where you are registered to vote
      </Text>
      <View>
        <AddressBox {...this.props} saveUrl="/ballot" />
      </View>
    </View>;
  }
}