import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';

export default class organizationalCard extends Component {
  static propTypes = {
    organization_name: PropTypes.string.isRequired,
    organization_photo_url: PropTypes.string.isRequired,
    twitter_description: PropTypes.string.isRequired,
  };

  constructor (props){
    super(props);
    this.state={
    };
  }
  onButtonPress(){
    this.props.navigator.push({
      id:'Second'
    })
  }
  render() {
    return (
      <View style={styles.card}>
        <View>
            <Image style={styles.card_photo} source={{uri: this.props.organization_photo_url}}/>
        </View>
        <View style={styles.card_details}>
            <Text style={styles.card_details_header}>{this.props.organization_name}</Text>
            <Text style={styles.card_details_content}>{this.props.twitter_description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    margin:0,
    width:350,
    marginTop:20,
    flexDirection: 'row'
  },
  card_photo:{
    width:100,
    height:80,
    marginLeft:20
  },
  card_details:{
    height:150
  },
  card_details_header:{
    fontSize:18,
    marginLeft:5,
    fontWeight:'bold'
  },
  card_details_content:{
    width:220,
    marginLeft:5
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  }
});
