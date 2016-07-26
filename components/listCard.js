/**
 * These are organizational positions on specific candidates for display on the Organization's page
 * https://github.com/wevote/WeVoteReactNative
 * @WeVote
 */

import React, { Component,PropTypes } from 'react';
import { AppRegistry,StyleSheet,Navigator,TouchableHighlight, Image,View,Text } from 'react-native';

export default class ListCard extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  };

  constructor(props){
    super();

  }
  _onPressButton(we_vote_id){
    this.props.update(we_vote_id);
  }
  render() {
    let upVoteIcon = require('../assets/icons/up-arrow-color-icon@2x.png');
    let downVoteIcon = require('../assets/icons/down-arrow-color-icon@2x.png');
    let bookmark_empty = require('../assets/icons/bookmark-icon-empty.png');
    let bookmark_filled = require('../assets/icons/bookmark-icon-filled.png');
    let no_image = require('../assets/no-image.png');

    return (
      <TouchableHighlight onPress={()=> this._onPressButton(this.props.ballot_item_we_vote_id)}>
        <View style={styles.list}>
          <View>
              <Image style={styles.list_no_image} source={no_image}>
                <Image style={styles.list_photo} source={{uri: this.props.ballot_item_image_url_https }}></Image>
              </Image>
          </View>
          <View>
              <View>
                <Text style={styles.card_details_header}>{this.props.ballot_item_display_name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>{this.props.is_positive_rating}</Text>
                  <Image style={styles.ratings_icon} source={this.props.is_positive_rating==true ? upVoteIcon : downVoteIcon}/>
                  <Text style={styles.vote_smart_rating}>{this.props.vote_smart_rating} %</Text>
                  <Text style={styles.vote_smart_time_span}>rating in {this.props.vote_smart_time_span}</Text>
                </View>
              </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  list:{
    backgroundColor: '#F5F4F1',
    width:350,
    height:100,
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  list_photo:{
    width:60,
    height: 60
  },
  list_no_image:{
    width:60,
    height: 60,
    marginLeft:20,
    marginTop:20
  },
  card_details:{
    height:150
  },
  card_details_header:{
    fontSize:20,
    marginTop:15,
    marginLeft:20
  },
  card_details_content:{
    width:250
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  },
  ratings_icon:{
    width:20,
    height: 20,
    marginLeft:20,
    marginTop:20
  },
  vote_smart_rating:{
    fontSize: 18,
    marginLeft:20,
    marginTop:20
  },
  vote_smart_time_span:{
    fontSize: 14,
    marginLeft:5,
    marginTop:25
  }
});
