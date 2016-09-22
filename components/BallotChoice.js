import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet,Image, View, Text } from 'react-native';
let BallotChoiceInfo = require('./BallotChoiceInfo');
let BallotChoiceButtons = require('./BallotChoiceButtons').default;

const BallotChoice = (props) => <View>
                                <BallotChoiceInfo img={props.choice.candidate_photo_url} twitter={props.choice.twitter_followers_count} party={props.choice.party} name={(props.choice.measure_subtitle === undefined) ? props.choice.ballot_item_display_name: props.choice.measure_subtitle}/>
                                </View>;

module.exports = BallotChoice;
