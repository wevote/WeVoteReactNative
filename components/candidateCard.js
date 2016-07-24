import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';

export default class candidateCard extends Component {
  static propTypes = {
    ballot_item_display_name: PropTypes.string.isRequired,
    candidate_photo_url: PropTypes.string.isRequired,
    twitter_description: PropTypes.string.isRequired
  };

  constructor (props){
    super(props);
    this.state={
    };
  }
  onButtonPress(){
    this.props.update_organization(we_vote_id);
  }
  render() {
    return <TouchableHighlight onPress={()=> this._onPressButton(this.props.ballot_item_we_vote_id)}>
        <View>
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
        </View>
    </TouchableHighlight>
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
