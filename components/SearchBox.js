import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableNativeFeedback, TextInput, View} from 'react-native';
import styles from '../assets/styles/style';

export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {text: 'Enter Your Address!'};
  }
  render() {

    return ( <View style={styles.search}><TextInput style={styles.searchBox} value={this.state.text} multiline= {false} onChange={(text)=>{this.setState({text})} }/></View>);

  }


}
