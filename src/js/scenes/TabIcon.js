import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";
import TwitterStore from "../stores/TwitterStore";
import FacebookStore from "../stores/FacebookStore";
import VoterStore from "../stores/VoterStore";
import tabStyles from "../stylesheets/TabBarStyles"


export default class TabIcon extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    tabBarLabel: PropTypes.string,
  };


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
    let voterImage = this.getVoterImage();
    return <View>
      {(this.props.tabBarLabel === 'WV' ) ?
        <Text style={tabStyles.textSelected}>{this.props.tabBarLabel}</Text>
        : null}
      {(this.props.tabBarLabel === 'Sign In' && voterImage === "") ?
        <Image style={tabStyles.image} source={require('../../img/global/icons/avatar-generic.png')}/> : null}
      {(this.props.tabBarLabel === 'Sign In' && voterImage !== "") ?
        <Image style={tabStyles.image} source={{uri: voterImage}}/> : null}
      {(this.props.tabBarLabel === 'Ballot' ) ?
        <View style={tabStyles.ballotButtonContainer}>
          <Icon name="list-alt" size={22} color="white" width={10}/>
          <Text style={tabStyles.ballotText}>{this.props.tabBarLabel}</Text>
        </View>
        : null}
    </View>
  }
}