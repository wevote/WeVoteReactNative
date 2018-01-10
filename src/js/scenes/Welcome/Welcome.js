import React, { Component } from "react";
import { Image, ImageBackground, Linking, Text, TouchableOpacity, ScrollView, View, WebView } from "react-native";
import { Actions } from 'react-native-router-flux';

import CookieStore from "../../stores/CookieStore";
import RouteConst from "../RouteConst";
import styles from "../../stylesheets/components/baseStyles";
import VoterActions from "../../actions/VoterActions";
import VoterStore from "../../stores/VoterStore";
import welcomeStyles from "../../stylesheets/components/welcomeStyles";
import WeVoteButton from "../../components/WeVoteButton";
const logging = require("../../utils/logging");

// the export line from the WebApp Welcome.jsx:  "export default class Intro extends Component { "

export default class Welcome extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newsletter_opt_in_true: false,
      voter: {},
      is_verification_email_sent: false,
      show_features_ballot: false,
      show_features_organizations: false,
      show_features_positions: false,
      show_features_network: false,
      show_features_vision: false,
      show_features_vote: false,
      facebook_friends_image_width: 60,
      facebook_friends_image_height: 60,
      maximum_friends_display: 5,
      //facebook_friends_using_we_vote_list: FacebookStore.facebookFriendsUsingWeVoteList(),
      submit_enabled: false,
      voter_email_address: "",
      voter_full_name: "",
    };
    // this._toggleBallotFeature = this._toggleBallotFeature.bind(this);
    // this._toggleOrganizationsFeature = this._toggleOrganizationsFeature.bind(this);
    // this._togglePositionsFeature = this._togglePositionsFeature.bind(this);
    // this._toggleNetworkFeature = this._toggleNetworkFeature.bind(this);
    // this._toggleVisionFeature = this._toggleVisionFeature.bind(this);
    // this._toggleVoteFeature = this._toggleVoteFeature.bind(this);
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to Welcome: currentScene = " + Actions.currentScene);
    Actions.refresh({dummy: 'hello'});  // triggers componentWillReceiveProps
  };

  static onExit = () => {
    Actions.refresh({came_from: RouteConst.KEY_WELCOME, forward_to_ballot: false});
    logging.rnrfLog("onExit from Welcome: currentScene = " + Actions.currentScene);
  };

  componentWillReceiveProps() {
    logging.rnrfLog("Welcome: componentWillReceiveProps ");
  }

  // Doesn't work in react-native? // componentDidMount () {
  componentWillMount () {
    console.log("Welcome ++++ MOUNT currentScene = " + Actions.currentScene);
    if (!VoterStore.isVoterFound())  {
      console.log("Welcome, voterRetrieve from componentWillMount");
      VoterActions.voterRetrieve();
    }
  }

  componentWillUnmount () {
    console.log("Welcome ---- UN mount");
    // this.voterStoreListener.remove();
    // this.facebookStoreListener.remove();
  }

  render () {

    let twitterURL = "https://twitter.com/share?url=https%3A%2F%2FWeVote.US%2F%20&text=Check%20out%20https%3A%2F%2FWeVote.US%2F!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20@WeVote&hashtags=Voting,WeVote";
    // TODO: 12/14/17 The facebookURL needs improvement, if we are logged in, then we should be taken directly to a live share page in Facebook
    let facebookURL = "https://www.facebook.com/v2.8/dialog/share?app_id=1097389196952441&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Dffcd6ff839a1b%26domain%3Dwevote.us%26origin%3Dhttps%253A%252F%252Fwevote.us%252Ff7c991c11e2a64%26relation%3Dopener&display=popup&e2e=%7B%7D&href=wevote.us&locale=en_US&mobile_iframe=false&next=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Df31fc16ba0eb3f8%26domain%3Dwevote.us%26origin%3Dhttps%253A%252F%252Fwevote.us%252Ff7c991c11e2a64%26relation%3Dopener%26frame%3Df762c74dac8a08%26result%3D%2522xxRESULTTOKENxx%2522&quote=Check%20out%20https%3A%2F%2FWeVote.US!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20%40WeVote%20%23Voting%20%23WeVote&sdk=joey&version=v2.8";

    // TODO: 12/14/17 Almost all of these images need to become touchables that take you somewhere, skipped this for the first pass

    return <ScrollView>
        <ImageBackground source={require('../../../img/welcome/header-image-desktop.png')} style={welcomeStyles.backgroundImage}>
          <View style={welcomeStyles.centeredFlexColumn}>
            <Text style={[welcomeStyles.textH1, {paddingTop: 30}]}>View your ballot.</Text>
            <Text style={[welcomeStyles.textH1,{paddingTop: 10, paddingBottom: 25}]}>Learn from friends.</Text>

            <TouchableOpacity onPress={() => Actions.ballot()} style={welcomeStyles.getStartedButton}>
              <Text style={welcomeStyles.bigButtonText}>Get Started</Text>
            </TouchableOpacity>

            <Text style={[welcomeStyles.textH1,{paddingTop: 40, paddingBottom: 40}]}>Share your vision.</Text>

            {/*<TouchableOpacity onPress = {() => Actions.ballot()} style={[welcomeStyles.getStartedButton, welcomeStyles.callToActionBlue]}>*/}
              {/*<Text style={welcomeStyles.bigButtonText}>Create Voter Guide</Text>*/}
            {/*</TouchableOpacity>*/}

            <Text style={{paddingBottom: 30}}/>
          </View>
        </ImageBackground>

        {/* Your Mission Section*/}
        <View style={[welcomeStyles.centeredFlexColumn, {backgroundColor: '#1c2f4b'}]}>
          <Text style={[welcomeStyles.textH1,{paddingTop: 40}]}>Your Mission:</Text>
          <Text style={welcomeStyles.textH3White}>Make the world a better place.</Text>

          <Image source={require('../../../img/welcome/benefits/viewYourBallot.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>View Your Ballot</Text>

          <Image source={require('../../../img/welcome/benefits/learnFromOrgs.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Learn From Organizations</Text>

          <Image source={require('../../../img/welcome/benefits/seePosition.png')} style={{width: 150, height: 50}}/>
          <Text style={welcomeStyles.textH3White}>See Your Network's Positions</Text>

          <Image source={require('../../../img/welcome/benefits/chooseFriends.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Invite Friends to Your We Vote Network</Text>

          <Image source={require('../../../img/welcome/benefits/shareVision.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Share Your Vision</Text>

          <Image source={require('../../../img/welcome/benefits/decideAndVote.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Decide & Vote</Text>
          <Text style={{paddingTop: 40, paddingBottom: 40}} />
          <TouchableOpacity onPress = {() => Actions.ballot()}
                            style={[welcomeStyles.getStartedButton, welcomeStyles.dangerRed]}>
              <Text style={welcomeStyles.bigButtonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={{paddingTop: 40, paddingBottom: 40}} />
        </View>

        {/* Our Network Section */}
        <View style={[welcomeStyles.centeredFlexColumn, {backgroundColor: 'white'}]}>
          <Text style={[welcomeStyles.textH3White,{color: 'black'}]}>Our Network</Text>
          <Image source={require('../../../img/welcome/partners/googleHack.png')} style={{width: 150, height: 50}}/>
          <Text style={{paddingBottom: 10}} />
          <Image source={require('../../../img/welcome/partners/center-for-technology.png')} style={{width: 200, height: 76}}/>
          <Text style={{paddingBottom: 10}} />
          <Image source={require('../../../img/welcome/partners/vote-org.png')} style={{width: 170, height: 40}}/>
          <Text style={{paddingBottom: 20}} />
          <Image source={require('../../../img/welcome/partners/voting-information-project.png')} style={{width: 193, height: 26}}/>
          <Text style={{paddingBottom: 30}} />
        </View>

        {/* Dark blue section with share buttons and footer links */}
        <View style={[welcomeStyles.centeredFlexColumn, welcomeStyles.callToActionBlue, {paddingTop: 40}]}>
          <View style={{paddingTop: 10, paddingRight: 10, paddingLeft: 10}}>
            <Text style={welcomeStyles.textH3White}>Please share or donate to help us reach more voters.</Text>
          </View>

          <WeVoteButton buttonLabel={'Facebook'} iconName={'facebook'}
                        opacityStyles={[styles.buttonBasics, styles.facebookColors]} trailingPadding={0}
                        onPress={() => Linking.openURL(facebookURL)}
          />
          <WeVoteButton buttonLabel={'Twitter'} iconName={'twitter'}
                        opacityStyles={[styles.buttonBasics, styles.twitterColors]} trailingPadding={0}
                        onPress={() => Linking.openURL(twitterURL)}
          />
          <WeVoteButton buttonLabel={'Email'} iconName={'envelope-o'}
                        opacityStyles={[styles.buttonBasics, styles.mailColors]} trailingPadding={0}
                        onPress={() => Linking.openURL('mailto:info@WeVote.US?subject=\'Check out We Vote\'&body=\'I am using We Vote to discuss what is on my ballot. You can see it at https://WeVote.US too.\'')}
          />
          {/* TODO: Implement donation in native */}
          <WeVoteButton buttonLabel={'Donate'} iconName={'heart'}
                        opacityStyles={[styles.buttonBasics, styles.donateColors]} trailingPadding={0}
                        onPress={() => Linking.openURL(CookieStore.getJumpURLWithCookie('https://wevote.us/more/donate'))}
          />

          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignSelf: 'center', paddingTop: 20, paddingRight: 20, paddingLeft: 20}}>

            <TouchableOpacity onPress={() => Actions.about()}>
              <Text style={styles.modalChoicesMediumWhite}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.ballot()}>
              <Text style={styles.modalChoicesMediumWhite}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.signIn()}>
              <Text style={styles.modalChoicesMediumWhite}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(CookieStore.getJumpURLWithCookie('https://wevote.us/more/tools'))}>
              <Text style={styles.modalChoicesMediumWhite}>Tools For Your Website</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(CookieStore.getJumpURLWithCookie('https://wevote.us/more/elections'))}>
              <Text style={styles.modalChoicesMediumWhite}>Supported Elections</Text>
            </TouchableOpacity>
          </View>
          <Text style={{padding: 5}}/>

          <View style={[welcomeStyles.centeredFlexColumn, {padding: 10}]}>
            <Text style={{color: 'white'}}>WeVote.US is brought to you by a partnership between two registered nonprofit organizations,
              one 501(c)(3) and one 501(c)(4){'\n'}{'\n'}We do not support or oppose any political candidate or party.{'\n'}</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity onPress = {() => Linking.openURL('http://WeVoteTeam.org/volunteer')}>
              <Text style={[welcomeStyles.hyperLinkOnBlue, {padding: 5}]}>The software that powers We Vote is open source and built by volunteers.</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 0, flexDirection: 'row', paddingTop: 20, paddingBottom: 40}} >
            <TouchableOpacity onPress={() => Actions.termsOfService()}>
              <Text style={welcomeStyles.horizontalChoices}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.privacy()} >
              <Text style={welcomeStyles.horizontalChoices}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://help.wevote.us/hc/en-us/requests/new')}>
              <Text style={welcomeStyles.horizontalChoices}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>;
  } // render
} // class

