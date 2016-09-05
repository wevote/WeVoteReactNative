import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
let BallotChoiceInfo = require('./BallotChoiceInfo').default;
let BallotChoiceButtons = require('./BallotChoiceButtons').default;
export default class BallotChoices extends Component {

  render() {
    console.log("In BallotChoices");

    return ( <TouchableNativeFeedback  background={TouchableNativeFeedback.SelectableBackground()}><View><BallotChoiceInfo img={this.props.choice.candidate_photo_url} twitter={this.props.choice.twitter_followers_count} party={this.props.choice.party} name={(this.props.choice.measure_subtitle === undefined) ? this.props.choice.ballot_item_display_name: this.props.choice.measure_subtitle}/>
             <BallotChoiceButtons/></View></TouchableNativeFeedback>
            );
  }


}
