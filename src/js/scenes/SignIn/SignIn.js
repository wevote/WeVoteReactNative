import React, { Component } from "react";
import {
  Switch,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoadingWheel from "../../components/LoadingWheel";
import SocialSignIn from "./SocialSignIn";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterSessionActions from "../../actions/VoterSessionActions";
import VoterStore from "../../stores/VoterStore";
import CookieStore from "../../stores/CookieStore";
import HeaderTitle from "../../components/Header/Header"
import styles from "../../stylesheets/BaseStyles"
const logging = require("../../utils/logging");

//import VoterEmailAddressEntry from "../../components/VoterEmailAddressEntry";
//import { browserHistory } from "react-router-native";
//import Helmet from "react-helmet";
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
//import FacebookActions from "../../actions/FacebookActions";
//import FacebookStore from "../../stores/FacebookStore";
//import FacebookSignIn from "../../components/Facebook/FacebookSignIn";
//import TwitterActions from "../../actions/TwitterActions";


const delay_before_user_name_update_api_call = 1200;


export default class SignIn extends Component {

  constructor (props) {
    super(props);
    this.state = {
      facebook_auth_response: {},
      voter: VoterStore.getVoter(),
      first_name: VoterStore.getFirstName(),
      last_name: VoterStore.getLastName(),
      initial_name_loaded: false,
      name_saved_status: "",
      show_twitter_disconnect: false,
      newsletter_opt_in: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN),
      notifications_saved_status: "",
      waiting_for_voter_device_id: true,
      initialized_voter_device_id: false,  // As of November 2017, This SignIn mounts multiple times
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateVoterName = this.updateVoterName.bind(this);
    this.getInitialDeviceId = this.getInitialDeviceId.bind(this);
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to SignIn: currentScene = " + Actions.currentScene);
    Actions.refresh({dummy: 'hello'});  // triggers componentWillReceiveProps
    // Actions.refs.signIn.forceUpdate();
  };

  static onExit = () => {
    logging.rnrfLog("onExit from SignIn: currentScene = " + Actions.currentScene);
  };

  componentWillReceiveProps(nextProps) {
    // October 9, 2017: This is hacky, we need a refresh when we come back from the ballot tab, not sure why.
    if( nextProps.came_from === "ballot") {
      logging.rnrfLog("componentWillReceiveProps, forcing update : currentScene = " + Actions.currentScene);
      // Nov 2, 2017, removed, this.forceUpdate();
    }
  }

  // Doesn't work in react-native? // componentDidMount () {
  componentWillMount () {
    console.log("SignIn ++++ MOUNT currentScene = " + Actions.currentScene);

    // TODO:  November 2017, This assumes that the signin tab is the initial tab, we should move this to a separate
    //    initialization route that sets up the cookies, we could even go back to Async storage if it would be easier
    this.setState({waiting_for_voter_device_id: true});
    this.getInitialDeviceId();

    this._onVoterStoreChange();
    //this.facebookListener = FacebookStore.addListener(this._onFacebookChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    const forward = this.props.forward_to_ballot || false;
    if( forward === true ) {
      logging.rnrfLog("SignIn received this.props.forward_to_ballot = " + this.props.forward_to_ballot);
      logging.rnrfLog("SignIn  Actions.ballot(}");
      Actions.ballot({came_from: 'signIn'});
    }
  }

  componentWillUnmount () {
    console.log("SignIn ---- UN mount");
    //this.facebookListener.remove();
    this.voterStoreListener.remove();
    this.timer = null;
  }

  _onVoterStoreChange () {
      this.setState({
        voter: VoterStore.getVoter(),
        newsletter_opt_in: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN),
    });
  }

  getInitialDeviceId () {
    if (CookieStore.getCurrentVoterDeviceId().length > 0) {
      this.setState({waiting_for_voter_device_id: false});
      this.setState({initialized_voter_device_id: true});
      console.log("SignIn getInitialDeviceId found cached voter_device_id ", CookieStore.getCurrentVoterDeviceId());
      return;
    }

    return CookieStore.getItem('voter_device_id').then(function (res) {
      this.setState({waiting_for_voter_device_id: false});
      this.setState({initialized_voter_device_id: true});
      console.log("SignIn getInitialDeviceId voter_device_id attempt prefetch", res);
    }.bind(this));
  }

  /*_onFacebookChange () {
    this.setState({
      facebook_auth_response: FacebookStore.getFacebookAuthResponse(),
    });
  }

  facebookLogOutOnKeyDown (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      FacebookActions.appLogout();
    }
  }

  twitterLogOutOnKeyDown (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      TwitterActions.appLogout();
    }
  }
  */
  toggleTwitterDisconnectOpen () {
    this.setState({show_twitter_disconnect: true});
  }

  toggleTwitterDisconnectClose () {
    this.setState({show_twitter_disconnect: false});
  }

  voterSplitIntoTwoAccounts () {
    VoterActions.voterSplitIntoTwoAccounts();
    this.setState({show_twitter_disconnect: false});
  }

  handleKeyPress () {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      VoterActions.voterNameSave(this.state.first_name, this.state.last_name);
      this.setState({name_saved_status: "Saved"});
    }, delay_before_user_name_update_api_call);
  }

  updateVoterName (event) {
    if (event.target.name === "first_name") {
      this.setState({
        first_name: event.target.value,
        name_saved_status: "Saving First Name..."
      });
    } else if (event.target.name === "last_name") {
      this.setState({
        last_name: event.target.value,
        name_saved_status: "Saving Last Name..."
      });
    }
  }

  updateNewsletterOptIn (value) {
    if (value) {
      VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
      this.setState({ newsletter_opt_in: true });
    } else {
      VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_ZERO, VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
      this.setState({ newsletter_opt_in: false });
    }
    this.setState({ notifications_saved_status: "Saved" });
  }


  render () {
    if (Actions.currentScene !== "signIn") {
      logging.renderLog("SignIn", "when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }

    logging.renderLog("SignIn", "scene = " + Actions.currentScene);

    if(this.state.waiting_for_voter_device_id  && ! this.state.initialized_voter_device_id) {
      return <View className="ballot">
        <View className="ballot__header">
          <Text>Waiting for device initialization</Text>
          <LoadingWheel/>
        </View>
      </View>;
    }

    if (!VoterStore.isVoterFound())  {
      console.log("SignIn.js, voterRetrieve in render()");
      VoterActions.voterRetrieve();
    }

    /*10/9/17 Steve, My theory on this react-native-router-flux (RNRF) work around:
    You can navigate around in the  Stack Container while doing the sign-in Actions, but to go to the other tab (ballot)
    you need to be in the signIn tab component.  If someone finds a simpler way to do this, please change over to your
    simpler way */

    if (!this.state.voter){
      return <LoadingWheel />;
    }

    // console.log("SignIn.jsx this.state.facebook_auth_response:", this.state.facebook_auth_response);
    if (!this.state.voter.signed_in_facebook && this.state.facebook_auth_response && this.state.facebook_auth_response.facebook_retrieve_attempted) {
      console.log("SignIn.jsx facebook_retrieve_attempted");
      // browserHistory.push("/facebook_sign_in");
      // return <Text>SignIn.jsx facebook_retrieve_attempted</Text>;
      return LoadingWheel;
    }

    let {width} = Dimensions.get('window');
    let page_title = "Sign In - We Vote";
    let your_account_title = "Your Account";
    let your_account_explanation = "";
    if (this.state.voter.is_signed_in) {
      page_title = "Your Account - We Vote";
      if (this.state.voter.signed_in_facebook && !this.state.voter.signed_in_twitter) {
        your_account_title = "Have Twitter Too?";
        your_account_explanation = "By adding your Twitter account to your We Vote profile, you get access to the this.state.voter guides of everyone you follow.";
      } else if (this.state.voter.signed_in_twitter && !this.state.voter.signed_in_facebook) {
        your_account_title = "Have Facebook Too?";
        your_account_explanation = "By adding Facebook to your We Vote profile, it is easier to invite friends.";
      }
    }

    let t = this.state.voter.signed_in_twitter;
    let f = this.state.voter.signed_in_facebook;

    return <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10 }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 20 }}>


          <View>
            {this.state.voter.is_signed_in ?
              <Text>{your_account_explanation}</Text> :
              <Text>Before you can share, either publicly or with friends, please sign in. Don't worry, we won't post
                anything automatically.</Text>
            }
          </View>
          {/* November 13, 2017
          We want to be able to respond to voter object indications of sign in here, but the data is not showing up in
          this.state.voter.signed_in_twitter || !this.state.voter.signed_in_facebook */}
          <View style={{flex: 1, flexDirection: 'column', paddingTop: 15}}>
            <View>
              <SocialSignIn signIn authenticator={'twitter'} buttonText={"Sign In"} />
              <SocialSignIn signIn authenticator={'facebook'} buttonText={"Sign In"} />
              {/* the two signOuts, may just be temporary for testing -- Oct 2017 */}
              <SocialSignIn signOut authenticator={'twitter'} buttonText={"Sign Out"} />
              <SocialSignIn signOut authenticator={'facebook'} buttonText={"Sign Out"} />
            </View>
          </View>
        </View>
    </View>;
  } // render
} // class
