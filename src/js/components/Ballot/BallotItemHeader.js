import React, { Component, PropTypes } from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Image} from 'react-native';
export default class BallotItemHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let bookmark = require('../../../img/global/icons/bookmark-icon-filled.png');
    let notBookmark = require('../../../img/global/icons/bookmark-icon-empty.png');
    const {title} = this.props;
    return (
      <View style={styles.header}>
          <Text style={styles.text}>
            {title}
          </Text>
          <TouchableHighlight>
            <View>
              <Image source={notBookmark}/>
            </View>
          </TouchableHighlight>
        </View>);
  }
}


const styles = StyleSheet.create({
  text:{
      fontWeight: 'bold',
      fontSize:20,
      color: '#337ab7'
  },
  header: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    shadowColor:"rgba(0, 0, 0, 0.12)",
    shadowRadius: 5,
    shadowOffset: {width:0, height:2},
  }
})
