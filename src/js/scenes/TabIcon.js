import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";

import TwitterStore from "../stores/TwitterStore";
import FacebookStore from "../stores/FacebookStore";
import VoterStore from "../stores/VoterStore";
import tabStyles from "../stylesheets/tabBarStyles"
const logging = require("../utils/logging");


export default class TabIcon extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    tabBarLabel: PropTypes.string,
  };

  componentWillMount () {
    //console.log("TabIcon ++++ MOUNT");

    // VoterSessionActions.voterSignOut() removes both Facebook and Twitter auth data, so only one listener is needed
    this.twitterStoreListener = TwitterStore.addListener(this.onSocialAuthStoreChange.bind(this));
  }

  componentWillUnmount () {
    //console.log("TabIcon ---- UN mount ");
    this.twitterStoreListener.remove();
  }

  onSocialAuthStoreChange () {
    console.log("TabIcon onSocialAuthStoreChange()");
    this.forceUpdate();
  }

  getVoterImage() {
    let voterImage = VoterStore.getVoterPhotoUrlTiny();
    if (voterImage === "") {
      if (TwitterStore.get().twitter_sign_in_found) {
        voterImage = TwitterStore.get().we_vote_hosted_profile_image_url_medium;
      } else if (FacebookStore.getFacebookAuthResponse().facebook_sign_in_verified) {
        voterImage = FacebookStore.getFacebookAuthResponse().facebook_profile_image_url_https;
      }
    }
    return voterImage;
  }

  render() {
    // logging.renderLog("TabIcon");

    let voterImage = this.getVoterImage();
    return <View onPress={() => {
      console.log("You tapped the ICON ICON ICON!");
    }}>
      {(this.props.tabBarLabel === 'WV' ) ?
        <Text style={tabStyles.text_selected}>{this.props.tabBarLabel}</Text>
        : null}

      {(this.props.tabBarLabel === 'Network' ) ?
        <View style={tabStyles.ballot_button_container}>
          <Image style={tabStyles.networkImage}
                 source={require('../../img/global/svg-icons/network-iconHack.png')} />
          <Text style={tabStyles.ballotTextWide}>{this.props.tabBarLabel}</Text>
        </View>
        : null}

      {(this.props.tabBarLabel === 'Sign In' && voterImage === "") ?
          <Image style={tabStyles.image} source={require('../../img/global/icons/avatar-generic.png')} />
        : null}

      {(this.props.tabBarLabel === 'Sign In' && voterImage !== "") ?
          <Image style={tabStyles.image} source={{uri: voterImage}} />
        : null}

      {(this.props.tabBarLabel === 'Ballot' ) ?
        <View style={tabStyles.ballot_button_container}>
          <Icon name="list-alt" size={22} color="white" width={10} />
          <Text style={tabStyles.ballot_text}>{this.props.tabBarLabel}</Text>
        </View>
        : null}
    </View>
  }
}