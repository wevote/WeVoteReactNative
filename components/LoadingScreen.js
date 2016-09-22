import React, { Component, } from 'react'
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native'
import styles from '../assets/styles/style';

const LoadingScreen = (props) =>
      <View style={styles.container}>
        <View style={[styles.loading_screen]}>
          <Text style={styles.loading_text}>WeVote</Text>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      </View>;

module.exports = LoadingScreen;
