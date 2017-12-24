import React, { Component } from "react";
import { Image, ImageBackground, Linking, Text, TouchableOpacity, ScrollView, View, Webview } from "react-native";
import { Actions } from 'react-native-router-flux';

import styles from "../../stylesheets/components/baseStyles";
import RouteConst from "../RouteConst";
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

    // this._onVoterStoreChange();
    // this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    // AnalyticsActions.saveActionWelcomeVisit(VoterStore.election_id());
    // FacebookActions.facebookFriendsAction();
    // this._onFacebookStoreChange();
    // this.facebookStoreListener = FacebookStore.addListener(this._onFacebookStoreChange.bind(this));
    // let we_vote_branding_off_from_url = this.props.location.query ? this.props.location.query.we_vote_branding_off : 0;
    // let we_vote_branding_off_from_cookie = CookieStore.getItem("we_vote_branding_off");
    // this.setState({
    //   we_vote_branding_off: we_vote_branding_off_from_url || we_vote_branding_off_from_cookie,
    // });
  }

  componentWillUnmount () {
    console.log("Welcome ---- UN mount");
    // this.voterStoreListener.remove();
    // this.facebookStoreListener.remove();
  }

  // _toggleBallotFeature () {
  //   this.setState({ show_features_ballot: !this.state.show_features_ballot });
  // }
  //
  // _toggleOrganizationsFeature () {
  //   this.setState({ show_features_organizations: !this.state.show_features_organizations });
  // }
  //
  // _togglePositionsFeature () {
  //   this.setState({ show_features_positions: !this.state.show_features_positions });
  // }
  //
  // _toggleNetworkFeature () {
  //   this.setState({ show_features_network: !this.state.show_features_network });
  // }
  //
  // _toggleVisionFeature () {
  //   this.setState({ show_features_vision: !this.state.show_features_vision });
  // }
  //
  // _toggleVoteFeature () {
  //   this.setState({ show_features_vote: !this.state.show_features_vote });
  // }
  //
  // _onVoterStoreChange () {
  //   // console.log("is_verification_email_sent:  " + VoterStore.isVerificationEmailSent());
  //   this.setState({
  //     newsletter_opt_in_true: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN),
  //     // is_verification_email_sent: VoterStore.isVerificationEmailSent(),
  //     voter: VoterStore.getVoter(),
  //   });
  // }
  //
  // _onFacebookStoreChange () {
  //   this.setState({
  //     facebook_friends_using_we_vote_list: FacebookStore.facebookFriendsUsingWeVoteList(),
  //   });
  // }

  // updateVoterFullName (event) {
  //   this.setState({
  //     voter_full_name: event.target.value
  //   });
  // }

  // updateVoterEmailAddress (event) {
  //   let is_email_valid = validateEmail(event.target.value);
  //   let submit_enabled = false;
  //   if (is_email_valid) {
  //     submit_enabled = true;
  //   }
  //   this.setState({
  //     voter_email_address: event.target.value,
  //     submit_enabled: submit_enabled,
  //   });
  // }

  // voterEmailAddressSignUpSave (event) {
  //   // Only proceed after we have a valid email address, which will enable the submit
  //   if (this.state.submit_enabled) {
  //     event.preventDefault();
  //     let send_link_to_sign_in = true;
  //     VoterActions.voterEmailAddressSave(this.state.voter_email_address, send_link_to_sign_in);
  //     VoterActions.voterFullNameSoftSave("", "", this.state.voter_full_name);
  //     VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
  //     this.setState({loading: true});
  //   }
  // }

  // shareToFacebookButton () {
  //   window.FB.ui({
  //     display: "popup",
  //     redirect_uri: web_app_config.WE_VOTE_HOSTNAME + "/welcome",
  //     method: "share",
  //     mobile_iframe: true,
  //     href: web_app_config.WE_VOTE_HOSTNAME,
  //     quote: "Check out https://WeVote.US! View your ballot. Learn from friends. Share your vision. @WeVote #Voting #WeVote",
  //   }, function (response) {
  //     if ( response === undefined || response.error_code === 4201 ) {
  //       console.log("Voter Canceled the share request");
  //     } else if ( response ) {
  //       //console.log("Successfully Shared", response);
  //     }
  //   });
  // }

  // shareToTwitterButton () {
  //   let url = "https://twitter.com/share?url=https%3A%2F%2FWeVote.US%2F%20&text=Check%20out%20https%3A%2F%2FWeVote.US%2F!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20@WeVote&hashtags=Voting,WeVote";
  //   let title = "Share On Twitter";
  //   let default_width = 600;
  //   let default_height = 600;
  //   let half_screen_width = screen.width / 2;
  //   let half_default_width = default_width / 2;
  //   let half_screen_height = screen.height / 2;
  //   let half_default_height = default_height / 2;
  //   var left = half_screen_width - half_default_width;
  //   var top = half_screen_height - half_default_height;
  //   return window.open(url, title, "toolbar=no, width=" + default_width + ", height=" + default_height + ", top=" + top + " left=" + left);
  // }


  render () {
    // let actual_full_name = "";
    // let voter_signed_in = false;
    // let mailto_url = "mailto:" + "?subject=Check out We Vote" + "&body=I am using We Vote to discuss what is on my ballot. You can see it at https://WeVote.US too.";
    // if (this.state.voter) {
    //   voter_signed_in = this.state.voter.is_signed_in;
    //   if (this.state.voter.first_name || this.state.voter.last_name) {
    //     actual_full_name = this.state.voter.full_name;
    //     if (actual_full_name.startsWith("voter")) {
    //       actual_full_name = "";
    //     }
    //   }
    // }

    // let local_counter = 0;
    // const facebook_friends_using_we_vote_list_for_display = this.state.facebook_friends_using_we_vote_list.map( (friend) => {
    //   local_counter++;
    //   if (friend.facebook_profile_image_url_https && local_counter <= this.state.maximum_friends_display) {
    //     const friendName = friend.facebook_user_name ? <Tooltip id="tooltip">{friend.facebook_user_name}</Tooltip> : <span />;
    //     return <OverlayTrigger key={friend.facebook_user_id} placement="bottom" overlay={friendName} >
    //       <img className="friends-list__welcome-image"
    //            src={friend.facebook_profile_image_url_https}
    //            height={this.state.facebook_friends_image_height}
    //            width={this.state.facebook_friends_image_width} />
    //     </OverlayTrigger>;
    //   } else {
    //     return null;
    //   }
    // });

    let twitterURL = "https://twitter.com/share?url=https%3A%2F%2FWeVote.US%2F%20&text=Check%20out%20https%3A%2F%2FWeVote.US%2F!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20@WeVote&hashtags=Voting,WeVote";
    // TODO: 12/14/17 The facebookURL needs improvement, if we are logged in, then we should be taken directly to a live share page in Facebook
    let facebookURL = "https://www.facebook.com/v2.8/dialog/share?app_id=1097389196952441&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Dffcd6ff839a1b%26domain%3Dwevote.us%26origin%3Dhttps%253A%252F%252Fwevote.us%252Ff7c991c11e2a64%26relation%3Dopener&display=popup&e2e=%7B%7D&href=wevote.us&locale=en_US&mobile_iframe=false&next=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Df31fc16ba0eb3f8%26domain%3Dwevote.us%26origin%3Dhttps%253A%252F%252Fwevote.us%252Ff7c991c11e2a64%26relation%3Dopener%26frame%3Df762c74dac8a08%26result%3D%2522xxRESULTTOKENxx%2522&quote=Check%20out%20https%3A%2F%2FWeVote.US!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20%40WeVote%20%23Voting%20%23WeVote&sdk=joey&version=v2.8";
    let donateURL = "https://wevote.us/more/donate";

    // TODO: 12/14/17 Almost all of these images need to become touchables that take you somewhere, skipped this for the first pass

    return <ScrollView>
        <ImageBackground source={require('../../../img/welcome/header-image-desktop.png')} style={welcomeStyles.backgroundImage}>
          <View style={welcomeStyles.centeredFlexColumn}>
            <Text style={[welcomeStyles.textH1, {paddingTop: 30}]}>View your ballot.</Text>
            <Text style={[welcomeStyles.textH1,{paddingTop: 10, paddingBottom: 25}]}>Learn from friends.</Text>

                      {/*{ this.state.facebook_friends_using_we_vote_list.length > 0 ?*/}
                        {/*<div className="u-flex-row friends-list__welcome">*/}
                          {/*{ facebook_friends_using_we_vote_list_for_display }*/}
                        {/*</div> :*/}
                        {/*null*/}
                      {/*}*/}

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
                        onPress={() => Linking.openURL(donateURL)}
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
            <TouchableOpacity onPress={() => Linking.openURL('https://wevote.us/more/tools')}>
              <Text style={styles.modalChoicesMediumWhite}>Tools For Your Website</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://wevote.us/more/elections')}>
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

