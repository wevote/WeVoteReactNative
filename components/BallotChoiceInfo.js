import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';
import styles from '../assets/styles/style';

const BallotChoiceInfo = (props) => {
    let no_image = require('../assets/no-image.png');
    let twitter = require('../assets/icons/twitter.png');

    info = (props.img) ? <View><Text>{props.party}</Text><View style={styles.twitterInfo}><Image source={twitter}/>
                                  <Text>{props.twitter}</Text></View></View> : undefined;

    return (
                <View style={styles.ballotItemInfo}>


                <View style={styles.photoContainer}>
                  <Image style={styles.photo} source={(props.img == "") ? no_image : {uri: props.img}}></Image>
                </View>

                <View style={styles.candidateTextInfo}>

                  <Text>{props.name}</Text>
                    {info}

                </View>


             </View>

            );


  };

module.exports = BallotChoiceInfo;
