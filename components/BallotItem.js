import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, Image, View, Text } from 'react-native';
let BallotChoice = require('./BallotChoice');
let BallotItemHeader = require('./BallotItemHeader').default;
import styles from '../assets/styles/style';

const BallotItem = (props) => {
    choiceView = {};
    if(props.ballotItem.kind_of_ballot_item == "MEASURE") {
       choiceView = <BallotChoice choice={props.ballotItem}/>;
     } else {
       choiceView = props.ballotItem.candidate_list.map((choice, i) =>{return <BallotChoice key={i} choice={choice}/>});
     }
    return ( <TouchableNativeFeedback onPress={props.onClick}  background={TouchableNativeFeedback.SelectableBackground()}><View style={styles.itemContainer}><BallotItemHeader title={props.ballotItem.ballot_item_display_name}/><View>{choiceView}</View></View></TouchableNativeFeedback>);

  }

module.exports = BallotItem;
