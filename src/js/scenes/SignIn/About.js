import React, { Component } from "react";
import { Image, Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/FontAwesome";

import AnalyticsActions from "../../actions/AnalyticsActions";
import styles from "../../stylesheets/components/baseStyles"
import TabStore from "../../stores/TabStore";
import {weVoteBoard, weVoteStaff} from "./team";
import VoterStore from "../../stores/VoterStore";
const logging = require("../../utils/logging");

//import ImageHandler from "../../components/ImageHandler";
//import ReactPlayer from "react-player";

//import RouteConst  from "../RouteConst";


export default class About extends Component {
  constructor (props) {
    super(props);
  }

  static getProps () {
    return {};
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to About: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from About: currentScene = " + Actions.currentScene);
    // For an explanation see "0mkara commented on Jun 10" at https://github.com/aksonov/react-native-router-flux/issues/1801
    // First saveoff the destination scene (which is actually the tab that was just clicked)
    let destinationScene = Actions.currentScene;
    // Second navigate to the bottom of this rnrf stack
    Actions.signIn();
    // Then navigate to the destinationScene, on another tab
    Actions.push(destinationScene);
  };

  componentDidMount (){
    AnalyticsActions.saveActionAboutMobile(VoterStore.election_id());
  }

  componentWillMount () {
    console.log("About.js ++++ MOUNT currentScene = " + Actions.currentScene);
    this.tabStoreListener = TabStore.addListener(this.onTabStoreChange.bind(this));
  }

  componentWillUnmount () {
    console.log("About.js ---- UN mount");
    this.tabStoreListener.remove();
  }

  // Scenes on the SignIn stack, respond to clicking the SignIn tab icon, by toggling the AccountMenuModal
  onTabStoreChange () {
    Actions.signIn();  //Move to the top of the stack
  }


  render () {
    logging.renderLog("About  scene = " + Actions.currentScene);

    return  <ScrollView>
      <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <Text style={styles.title}>About We Vote</Text>
          <View style={{flex: 0, flexDirection: 'row', paddingTop: 10}} >
            <TouchableOpacity style = {[styles.small_button, styles.twitter_color]}
                              onPress = {() => Linking.openURL('https://twitter.com/WeVote')}>
              <Icon name={"twitter"} size={24} color="white" style={{textAlign: 'center'}} />
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.small_button, styles.facebook_color]}
                              onPress = {() => Linking.openURL('https://www.facebook.com/WeVoteUSA')}>
              <Icon name={"facebook"} size={24} color="white" style={{textAlign: 'center'}} />
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.button, styles.mail_chimp ]}
                              onPress = {() => Linking.openURL('http://eepurl.com/cx_frP')}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{paddingTop:5}} >
                  <Icon name={'envelope-o'} size={24} color="white" paddingTop={10} />
                </View>
                <Text style = {styles.button_text}>Join Newsletter</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.small_button, styles.medium_color]}
                              onPress = {() => Linking.openURL('https://medium.com/@WeVote')}>
              <Icon name={"medium"} size={24} color="rgb(0, 116, 158)" style={{textAlign: 'center'}} />
            </TouchableOpacity>
          </View>

          {/*https://github.com/react-native-community/react-native-video*/}
          {/* TODO: <ReactPlayer url="https://player.vimeo.com/video/121315141" width="300px" height="231px"/>*/}


          <Text style={styles.titleSpaceAbove}>A Nonprofit Startup</Text>
          <Text>
            We Vote is made of two 501(c)(3) and 501(c)(4) nonpartisan nonprofit organizations based in Oakland, California.
            This site is managed by the 501(c)(4), We Vote USA. Our software is open source, and our work is driven by the nearly 100 volunteers who have contributed so far.
            Inspired by groups like  http://codeforsanfrancisco.org/ Code for America and the https://www.mozilla.org/en-US/foundation/ Mozilla Foundation
            we use technology to make democracy stronger by increasing voter turnout.
          </Text>

          <Text style={styles.titleSpaceAbove}>Our Team</Text>
          <Text style={styles.titleSpaceAbove}>We Vote Board Members & Advisers</Text>
          <View style={styles.aboutPersonContainer}>
          {
            weVoteBoard.map( (item) => <View key={item.name}>
              <View style={{flexDirection: 'column', width: 85 }} >
                <Image source={item.image} style={styles.aboutImage} />
                <Text style={styles.aboutPersonName}>{item.name}</Text>
                <Text style={styles.aboutPersonTitle}>{item.title[0]}</Text>
              </View>
            </View>)
          }
          </View>

          <Text style={styles.titleSpaceAbove}>We Vote Staff</Text>
          <View style={styles.aboutPersonContainer}>
            {
              weVoteStaff.map( (item) => <View key={item.name}>
                <View style={{flexDirection: 'column', width: 85 }} >
                  <Image source={item.image} style={styles.aboutImage} />
                  <Text style={styles.aboutPersonName}>{item.name}</Text>
                  <Text style={styles.aboutPersonTitle}>{item.title[0]}</Text>
                </View>
              </View>)
            }
          </View>

          <Text style={styles.titleSpaceAbove}>Our Story</Text>
          <Text>
            After meeting in Oakland in the spring of 2013, We Vote co-founders Dale McGrew, Jenifer Fernandez Ancona,
            Dan Ancona, and their families became fast friends and bought a home together, forming an intentional community.
            Through daily conversations, the idea of a nonprofit social voter network was born.
            &quot;We&#39;re living our values,&quot; says Jenifer. We Vote would be a community for voters, they
            decided, created from a communal home of people concerned about where this country is heading. Being an open
            source, volunteer-driven project means anyone can contribute. Kind of like democracy.
          </Text>
          <Text style={styles.titleSpaceAbove}>Credits & Gratitude</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity onPress = {() => Actions.credits({came_from: 'About'}) }>
              <Text style={styles.hyperLink}> We are thankful for our volunteers, our board of directors, and the organizations</Text>
            </TouchableOpacity>
            <Text>that are critical to our work.</Text>
          </View>

          <Text>{'\n'}</Text>
          <TouchableOpacity onPress = {() => Linking.openURL('https://help.wevote.us/hc/en-us/articles/115000500868-What-is-We-Vote-')}>
            <Text style={styles.hyperLink}>Visit our help center to learn more about We Vote.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>;
  }
}


