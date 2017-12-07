import React, { Component } from "react";
import { Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions } from 'react-native-router-flux';

import styles from "../../stylesheets/components/baseStyles"
import TabStore from "../../stores/TabStore";
import { teamOfVolunteers, organizationalDonors } from "./team";
const logging = require("../../utils/logging");


export default class Credits extends Component {
  constructor (props) {
    super(props);
  }

  static getProps () {
    return {};
  }

  componentWillMount () {
    console.log("Credits ++++ MOUNT currentScene = " + Actions.currentScene);
    this.tabStoreListener = TabStore.addListener(this.onTabStoreChange.bind(this));
  }

  componentWillUnmount () {
    console.log("Credits ---- UN mount");
    this.tabStoreListener.remove();
  }

  // Scenes on the SignIn stack, respond to clicking the SignIn tab icon, by toggling the AccountMenuModal
  onTabStoreChange () {
    Actions.signIn();  //Move to the top of the stack
  }

  render () {
    logging.renderLog("Credits  scene = " + Actions.currentScene);

    return  <ScrollView>
      <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <Text style={styles.title}>Credits</Text>

          <Text style={styles.title}>We are grateful for these organizations that are critical to our work.</Text>

          <View>
            { organizationalDonors.map( (item) => <View style={{flexDirection: 'row'}} key={item.name}>
                <Text style={[styles.bold, styles.indent]}>{`\u2022  `}{item.name}</Text>
                <Text>- {item.title}</Text>
              </View>)
            }
          </View>

        <Text style={styles.title}>{'\n'}Special thanks to our team of volunteers.</Text>
        <Text >You are the best! {'\n'}</Text>
          <Text >(This is a list of volunteers who have contributed 10 or more hours, in rough order of hours contributed.){'\n'}</Text>
          <View>
            { teamOfVolunteers.map( (item) => <View style={{flexDirection: 'row'}} key={item.name}>
                <Text style={[styles.bold, styles.indent]}>{`\u2022  `}{item.name}</Text>
                <Text>- {item.title}</Text>
              </View>)
            }
          </View>

          <Text style={styles.title}>{'\n'}Join Us!</Text >
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text>{'\n'}We couldn’t do what we do without volunteers and donors. Please sign up to volunteer at</Text>
            <TouchableOpacity onPress = {() => Linking.openURL('http://WeVoteTeam.org/volunteer')}>
              <Text style={styles.hyperLink}>http://WeVoteTeam.org/volunteer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>;
  }
}
