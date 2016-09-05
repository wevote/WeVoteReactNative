import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight,View } from 'react-native';
let BallotItem = require('./BallotItem').default;

export default class Ballot extends Component {



  constructor(props) {
    super(props);
    this.state = {ballot: this.props.ballot};

  }




  render() {
    console.log("In Ballot");
    console.log("Ballot:", this.props.ballot);
    test = this.props.ballot.map((ballotItem, i) => { return <BallotItem key={i} ballotItem={ballotItem} />});
    console.log("Ballot:", test);
    return (<View>{test}</View>);



  }


}
