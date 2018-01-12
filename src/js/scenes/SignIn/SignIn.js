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
import Icon from "react-native-vector-icons/FontAwesome";

import AccountMenuModal from "./AccountMenuModal";
import AnalyticsActions from "../../actions/AnalyticsActions";
import CookieStore from "../../stores/CookieStore";
import FacebookStore from "../../stores/FacebookStore";
import LoadingWheel from "../../components/LoadingWheel";
import RouteConst from "../RouteConst"
import SocialSignIn from "./SocialSignIn";
import styles from "../../stylesheets/components/baseStyles"
import TabStore from "../../stores/TabStore";
import TwitterStore from "../../stores/TwitterStore";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterSessionActions from "../../actions/VoterSessionActions";
import VoterStore from "../../stores/VoterStore";
import WeVoteButton from "../../components/WeVoteButton"

const logging = require("../../utils/logging");
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
      showAccountMenuModal: false,
      newsletter_opt_in: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN),
      notifications_saved_status: "",
      waiting_for_voter_device_id: true,
      initialized_voter_device_id: false,
      dummy: false,
      signedInTwitter: null,
      signedInFacebook: null,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getInitialDeviceId = this.getInitialDeviceId.bind(this);
    this.updateNewsletterOptIn = this.updateNewsletterOptIn.bind(this);
    this.updateVoterName = this.updateVoterName.bind(this);
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to SignIn: currentScene = " + Actions.currentScene);
    // this 'Actions.refresh' triggers componentWillReceiveProps
    if (Actions.prevScene === "") {
      Actions.refresh({
        firstTimeToSignInTab: true
      });
    } else {
      Actions.refresh({
        firstTimeToSignInTab: false
      });
    }
  };

  static onExit = () => {
    logging.rnrfLog("onExit from SignIn: currentScene = " + Actions.currentScene);
  };

  // Set up this component upon first entry
  // componentDidMount is used in WebApp
  componentWillMount () {
    console.log("SignIn ++++ MOUNT currentScene = " + Actions.currentScene);

    // November 2017, This assumes that the signin tab is the initial tab.
    // Jan 2018, but still works when welcome is initial, since all root tab classes get initialized on startup
    this.setState({waiting_for_voter_device_id: true});
    this.getInitialDeviceId();
    this._onVoterStoreChange();
    this.tabStoreListener = TabStore.addListener(this.onTabStoreChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    AnalyticsActions.saveActionAccountPage(VoterStore.election_id());
  }

  componentWillReceiveProps(nextProps) {
    console.log("SignIn componentWillReceiveProps");

    if (! this.props.firstTimeToSignInTab) {
      // Show the AccountMenuModal first, every time you come to SignIn, except the first time
      this.setState({showAccountMenuModal: true});
    }

    const isTwitterSignedIn = TwitterStore.get().twitter_sign_in_verified === true;

    console.log("SignIn componentWillReceiveProps twitter = " + isTwitterSignedIn +
                ", facebook = " + FacebookStore.loggedIn);
    this.setState( {
      signedInTwitter: isTwitterSignedIn,
      signedInFacebook: FacebookStore.getLoggedIn(),
    });
  }

  componentWillUnmount () {
    console.log("SignIn ---- UN mount");
    this.tabStoreListener.remove();
    this.voterStoreListener.remove();
    this.timer = null;
  }

  _onVoterStoreChange () {
    // console.log("SignIn _onVoterStoreChange");
    if (VoterStore.isVoterFound() && !this.state.initial_name_loaded) {
      this.setState({
        first_name: VoterStore.getFirstName(),
        last_name: VoterStore.getLastName(),
        initial_name_loaded: true,
        voter: VoterStore.getVoter(),
        newsletter_opt_in: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN)
      });
    } else {
      this.setState({voter: VoterStore.getVoter()});
    }
  }

  onTabStoreChange () {
    // console.log("SignIn, onTabStoreChange currentScene: " + Actions.currentScene +", prevScene: " + Actions.prevScene);

    if( Actions.currentScene === Actions.prevScene &&
        Actions.currentScene === RouteConst.KEY_SIGNIN &&
        this.state.showAccountMenuModal === false ) {
      // console.log("SignIn, onTabStoreChange setting showAccountMenuModal true");
      this.setState({
        showAccountMenuModal: true
      });
    }
  }

  getInitialDeviceId () {
    console.log("SignIn getInitialDeviceId");
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

  updateNewsletterOptIn (newsletter_opt_in) {
    if (newsletter_opt_in) {
      VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
      this.setState({ newsletter_opt_in: true });
    } else {
      VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_ZERO, VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
      this.setState({ newsletter_opt_in: false });
    }
    this.setState({ notifications_saved_status: "Saved" });
  }

  signedOut () {
    console.log("signedOut --------------------");
    VoterSessionActions.voterSignOut();
    this.setState({
      signedInTwitter: false,
      signedInFacebook: false,
    });
  }

  toggleAccountMenuModal () {
    let show = this.state.showAccountMenuModal;
    console.log("ballot toggleAccountMenuModal called with show = " + show + "  and mounted = " + this.state.mounted);

    this.setState({
      signedInTwitter: TwitterStore.get().twitter_sign_in_verified === true,
      signedInFacebook: FacebookStore.loggedIn,
      showAccountMenuModal: !this.state.showAccountMenuModal
    });
  }

  render () {
    if (Actions.currentScene !== RouteConst.KEY_SIGNIN) {
      logging.renderLog("SignIn when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }

    logging.renderLog("SignIn  scene = " + Actions.currentScene);

    const isAuthenticatedTwitter = TwitterStore.get().twitter_sign_in_found || false;
    const isAuthenticatedFacebook = FacebookStore.getFacebookAuthResponse().facebook_sign_in_verified || false;
    const isAuthenticated = isAuthenticatedTwitter || isAuthenticatedFacebook;
    const hasDeviceId = CookieStore.getCurrentVoterDeviceId().length > 0;

    if(this.state.waiting_for_voter_device_id  && ! this.state.initialized_voter_device_id && ! hasDeviceId) {
      return <LoadingWheel text={'Device is initializing'}/>;
    }

    if (this.state.showAccountMenuModal) {
      logging.rnrfLog("Tabbed to SignIn, isAuthenticatedTwitter: " + isAuthenticatedTwitter +
        ", isAuthenticatedFacebook: " + isAuthenticatedFacebook +
        ", current = " + Actions.currentScene);

      return <AccountMenuModal toggleFunction={this.toggleAccountMenuModal.bind(this)} showModal={this.state.showAccountMenuModal} />;
    }


    if (!VoterStore.isVoterFound())  {
      console.log("SignIn.js, voterRetrieve in render()");
      VoterActions.voterRetrieve();
    }

    if (!this.state.voter){
      return <LoadingWheel text={'Loading your information'}/>;
    }

    // console.log("SignIn.jsx this.state.facebook_auth_response:", this.state.facebook_auth_response);
    if (!isAuthenticated && this.state.facebook_auth_response.facebook_retrieve_attempted) {
      console.log("SignIn.jsx facebook_retrieve_attempted");
      // browserHistory.push("/facebook_sign_in");
      // return <Text>SignIn.jsx facebook_retrieve_attempted</Text>;
      return <LoadingWheel text={['Waiting for your information to arrive ','from the We Vote cloud.']}/>;
    }

    let {width} = Dimensions.get('window');
    let page_title = "Sign In - We Vote";
    let your_account_title = "Your Account";
    let your_account_explanation = "";
    if (isAuthenticated) {
      page_title = "Your Account - We Vote";
      if (isAuthenticatedFacebook && !isAuthenticatedTwitter) {
        your_account_title = "Have Twitter Too?";
        your_account_explanation = "By adding your Twitter account to your We Vote profile, you get access to the voter guides of everyone you follow.";
      } else if (isAuthenticatedTwitter && !isAuthenticatedFacebook) {
        your_account_title = "Have Facebook Too?";
        your_account_explanation = "By adding Facebook to your We Vote profile, it is easier to invite friends.";
      }
    }

    return <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <Text style={styles.title}>{page_title}</Text>
          <View>
            {isAuthenticated ?
              <Text>Before you can share, either publicly or with friends, please sign in. Don't worry, we won't post anything automatically.</Text>
              :
              <Text>{your_account_explanation}</Text>
            }
          </View>
          <View style={{flex: 1, flexDirection: 'column', paddingTop: 15}}>
            {!isAuthenticatedTwitter && <SocialSignIn signIn isButton authenticator={'twitter'} buttonText={"Sign In"} />}
            {!isAuthenticatedFacebook && <SocialSignIn signIn isButton authenticator={'facebook'} buttonText={"Sign In"} />}
            {isAuthenticated &&
              <WeVoteButton buttonLabel={'Sign Out'} opacityStyles={[styles.buttonBasics, styles.signOutColors]} onPress={this.signedOut.bind(this)}/>
            }
            {isAuthenticated && <Text style = {[styles.title,{paddingTop: 10}]}>Currently Signed In</Text>}
            {isAuthenticatedTwitter &&
              <View style={[styles.buttonBasics, styles.twitterColors, {width: 250}]} >
                <View style={styles.flexRowSpaced}>
                  <View style={{paddingTop: 5}}>
                    <Icon name={"twitter"} size={24} color="white" paddingTop={10}/>
                  </View>
                  <Text style={styles.button_text}>@{TwitterStore.getTwitterHandle()}</Text>
                </View>
              </View>
            }
            {isAuthenticatedFacebook &&
              <View style={[styles.buttonBasics, styles.facebookColors, {width: 250}]} >
                <View style={styles.flexRowSpaced}>
                  <View style={{paddingTop: 5}}>
                    <Icon name={"twitter"} size={24} color="white" paddingTop={10}/>
                  </View>
                  <Text style={styles.button_text}>FB Signed In</Text>
                </View>
              </View>
            }

            {/* Please save these for testing, they send s a hard de-authenticate to the auth provider
            <SocialSignIn signOut isButton authenticator={'twitter'} buttonText={"Sign Out"} />
            <SocialSignIn signOut isButton authenticator={'facebook'} buttonText={"Sign Out"} />
            */}
          </View>
        </View>
    </View>;
  } // render
} // class
