import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';
let BallotChoice = require('./BallotChoice').default;
let BallotItemHeader = require('./BallotItemHeader').default;
import styles from '../assets/styles/style';

export default class BallotItem extends Component {

  render() {
    console.log("In BallotItem");
    choiceView = {};
    if(this.props.ballotItem.kind_of_ballot_item == "MEASURE") {
       choiceView = <BallotChoice choice={this.props.ballotItem}/>;
     } else {
       choiceView = this.props.ballotItem.candidate_list.map((choice, i) =>{return <BallotChoice key={i} choice={choice}/>});
     }
    return ( <View style={styles.listItem}><BallotItemHeader title={this.props.ballotItem.ballot_item_display_name}/><View>{choiceView}</View></View>);

  }


}
