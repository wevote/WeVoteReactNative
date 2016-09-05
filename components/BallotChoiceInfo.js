import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';
import styles from '../assets/styles/style';

export default class BallotChoiceInfo extends Component {



  constructor(props) {
    super(props);
    this.state = {saved: this.props.saved};
  }




  render() {
    let no_image = require('../assets/no-image.png');
    let twitter = require('../assets/icons/twitter.png');

    console.log("In BallotChoiceINfo");
        console.log("Image", this.props.img);
    return ( <View style={styles.ballotItemInfo}>


                <View style={styles.photoContainer}>
                  <Image style={styles.photo} source={(this.props.img == "") ? no_image : {uri: this.props.img}}></Image>
                </View>

                <View style={styles.candidateTextInfo}>

                  <Text numberOfLines={1}>{this.props.name}</Text>

                  <Text>{this.props.party} </Text>

                    <View style={styles.twitterInfo}><Image source={twitter}/>
                    <Text>{this.props.twitter}</Text></View>
                </View>


             </View>

            );


  }


}
