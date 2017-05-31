import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';

export default CandidateInfo = ({we_vote_id, ballot_item_display_name, party, candidate_photo_url_medium, navigation, kind_of_ballot_item}) => {
    let no_image = require('../../../img/global/images/no-image.png');
    let image = {uri: candidate_photo_url_medium};
    return (<TouchableHighlight onPress={() => navigation.navigate('BallotDetails', {title: ballot_item_display_name, type:kind_of_ballot_item, id: we_vote_id})}>
            <View style={styles.ballotItemInfo}>
              <View style={styles.photoContainer}>
                  <Image style={styles.photo} source={(candidate_photo_url_medium !== null)?image:no_image}></Image>
              </View>
              <View style={styles.candidateTextInfo}>
                <Text>{ballot_item_display_name}</Text>
                <Text>{party}</Text>
              </View>
            </View>
          </TouchableHighlight>);
  };

const styles = StyleSheet.create({
  ballotItemInfo: {
      padding:4,
      flexDirection: 'row',
      alignItems: 'center',
  },
  candidateInfo:{
      paddingTop:4
  },
  photoContainer: {
    paddingRight:4,
    paddingLeft:4
  },
  candidateTextInfo: {
    flexDirection:'column',
    paddingRight:4,
    paddingLeft:4
  },
  photo:{
    width:60,
    height: 60,
    borderRadius: 30,
  },
})
