import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';

export default class candidateCard extends Component {
  static propTypes = {
    ballot_item_display_name: PropTypes.string.isRequired,
    candidate_photo_url: PropTypes.string.isRequired,
    twitter_description: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
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
    return <View>
      <View style={styles.card, {flexDirection: 'row'}}>
        <View style={styles.card_photo}>
            <Image source={{uri: this.props.candidate_photo_url}}
              style={{width: 80, height: 80}} />
        </View>
        <View style={styles.card_details}>
            <Text style={styles.card_details_header}>{this.props.ballot_item_display_name}</Text>
            <Text style={styles.card_details_content}>{this.props.twitter_description}</Text>
        </View>
      </View>
      <TouchableHighlight onPress={this.props.onForward}>
        <Text>Tap me to load the next scene</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.props.onBack}>
        <Text>Tap me to go back</Text>
      </TouchableHighlight>
    </View>;
  }
}

const styles = StyleSheet.create({
  card:{
    margin:0
  },
  card_photo:{
    width:100,
    height:100
  },
  card_details:{
    height:150
  },
  card_details_header:{
    fontSize:20
  },
  card_details_content:{
    width:250
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  }
});
