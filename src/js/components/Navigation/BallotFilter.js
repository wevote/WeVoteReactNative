import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-native";
import { View, Text, StyleSheet } from "react-native";

export default class BallotFilter extends Component {
  static propTypes = {
    params: PropTypes.object,
    ballot_type: PropTypes.string,
    _toggleBallotIntroModal: PropTypes.func.isRequired,
  };


  render () {
    const {ballot_type} = this.props;

    return <View className="btn-group" style={{padding: 10, flexDirection: 'row'}}>
      <Link to="/ballot" style={styles.button} className={ ballot_type === "ALL_BALLOT_ITEMS" ? "active btn btn-default" : "btn btn-default"}>
        <Text style={styles.buttonText}> All Items </Text>

      </Link>
      <Text> &nbsp;</Text>
      <Link to={{ pathname: "/ballot", query: { type: "filterRemaining" } }} style={styles.button} className={"hidden-xs " + (ballot_type === "CHOICES_REMAINING" ? "active btn btn-default" : "btn btn-default")}>
        <Text style={styles.buttonText}> Remaining Decisions </Text>
      </Link>
      <Text> &nbsp;</Text>
      <Link to={{ pathname: "/ballot", query: { type: "filterReadyToVote" } }} style={styles.button} className={ ballot_type === "READY_TO_VOTE" ? "active btn btn-default" : "btn btn-default"}>
        <Text style={styles.buttonText}> Vote! </Text>
      </Link>
      <Text> &nbsp; (
        <Text style = {{color: '#48BBEC'}} onPress={this.props._toggleBallotIntroModal}>show intro</Text>)
      </Text>
    </View>;
  }
}

var styles = StyleSheet.create({

  buttonText: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 30,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
});
