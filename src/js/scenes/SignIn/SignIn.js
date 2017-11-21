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

import AccountMenu from "./AccountMenu";
import AnalyticsActions from "../../actions/AnalyticsActions";
import CookieStore from "../../stores/CookieStore";
import LoadingWheel from "../../components/LoadingWheel";
import RouteConst from "../routeConst"
import SocialSignIn from "./SocialSignIn";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterStore from "../../stores/VoterStore";
import TwitterStore from "../../stores/TwitterStore";
import FacebookStore from "../../stores/FacebookStore";
import styles from "../../stylesheets/components/baseStyles"
const logging = require("../../utils/logging");
// import HeaderTitle from "../../components/Header/Header"
// import VoterEmailAddressEntry from "../../components/VoterEmailAddressEntry";
// import VoterSessionActions from "../../actions/VoterSessionActions";

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
    this.getInitialDeviceId = this.getInitialDeviceId.bind(this);
    this.updateNewsletterOptIn = this.updateNewsletterOptIn.bind(this);
    this.updateVoterName = this.updateVoterName.bind(this);
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to SignIn: currentScene = " + Actions.currentScene);
    // this 'Actions.refresh' triggers componentWillReceiveProps
    if (Actions.hasOwnProperty("firstTimeToSignInTab")) {
      Actions.refresh({
        dummy: 'hello',
        firstTimeToSignInTab: true
      });
    } else {
      Actions.refresh({
        dummy: 'hello',
        firstTimeToSignInTab: false
      });

    }
    Actions.refs.signIn.forceUpdate();
  };

  static onExit = () => {
    logging.rnrfLog("onExit from SignIn: currentScene = " + Actions.currentScene);
  };

  // Set up this component upon first entry
  // componentDidMount is used in WebApp
  componentWillMount () {
    console.log("SignIn ++++ MOUNT currentScene = " + Actions.currentScene);

    // TODO:  November 2017, This assumes that the signin tab is the initial tab, we should move this to a separate
    //    initialization route that sets up the cookies, we could even go back to Async storage if it would be easier
    this.setState({waiting_for_voter_device_id: true});
    this.getInitialDeviceId();

    this._onVoterStoreChange();
    //this.facebookListener = FacebookStore.addListener(this._onFacebookChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    AnalyticsActions.saveActionAccountPage(VoterStore.election_id());

    const forward = this.props.forward_to_ballot || false;
    if( forward === true ) {
      logging.rnrfLog("SignIn received this.props.forward_to_ballot = " + this.props.forward_to_ballot);
      logging.rnrfLog("SignIn  Actions.ballot(}");
      Actions.ballot({came_from: RouteConst.KEY_SIGNIN});
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("SignIn componentWillReceiveProps");
    // October 9, 2017: This is hacky, we need a refresh when we come back from the ballot tab, not sure why.
    if( nextProps.came_from === RouteConst.KEY_BALLOT) {
      logging.rnrfLog("componentWillReceiveProps, forcing update : currentScene = " + Actions.currentScene);
      // Nov 2, 2017, removed, this.forceUpdate();
    }
  }

  componentWillUnmount () {
    console.log("SignIn ---- UN mount");
    //this.facebookListener.remove();
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

  /*
  _onFacebookChange () {
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


  render () {
    if (Actions.currentScene !== "signIn") {
      logging.renderLog("SignIn when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }

    logging.renderLog("SignIn  scene = " + Actions.currentScene);

    let signedInTwitter = TwitterStore.get().twitter_sign_in_found;
    let signedInFacebook = FacebookStore.getFacebookAuthResponse().facebook_sign_in_verified;


    if (this.props.came_from !== RouteConst.KEY_ACCOUNT_MENU && ( signedInTwitter || signedInFacebook) ) {
      logging.rnrfLog("Tabbed to SignIn, signedInTwitter: " + signedInTwitter +
        ", signedInFacebook: " + signedInFacebook + ",  current = " + Actions.currentScene);

      return <AccountMenu />;
    }

    if(this.state.waiting_for_voter_device_id  && ! this.state.initialized_voter_device_id) {
      return <LoadingWheel text={'Waiting for device initialization'}/>;

      // return <View className="ballot">
      //   <View className="ballot__header">
      //     <Text>Waiting for device initialization</Text>
      //     <LoadingWheel text={'Waiting for device initialization'}/>
      //   </View>
      // </View>;
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
      return <LoadingWheel text={'Loading your information'}/>;
    }

    // console.log("SignIn.jsx this.state.facebook_auth_response:", this.state.facebook_auth_response);
    if (!this.state.voter.signed_in_facebook && this.state.facebook_auth_response && this.state.facebook_auth_response.facebook_retrieve_attempted) {
      console.log("SignIn.jsx facebook_retrieve_attempted");
      // browserHistory.push("/facebook_sign_in");
      // return <Text>SignIn.jsx facebook_retrieve_attempted</Text>;
      return <LoadingWheel text={'Waiting for your information to arrive'}/>;
    }

    let {width} = Dimensions.get('window');
    let page_title = "Sign In - We Vote";
    let your_account_title = "Your Account";
    let your_account_explanation = "";
    if (this.state.voter.is_signed_in) {
      page_title = "Your Account - We Vote";
      if (this.state.voter.signed_in_facebook && !this.state.voter.signed_in_twitter) {
        your_account_title = "Have Twitter Too?";
        your_account_explanation = "By adding your Twitter account to your We Vote profile, you get access to the voter guides of everyone you follow.";
      } else if (this.state.voter.signed_in_twitter && !this.state.voter.signed_in_facebook) {
        your_account_title = "Have Facebook Too?";
        your_account_explanation = "By adding Facebook to your We Vote profile, it is easier to invite friends.";
      }
    }

    return <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
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
              {!signedInTwitter ?
                <SocialSignIn signIn isButton authenticator={'twitter'} buttonText={"Sign In"} />
              : null
              }
              {!signedInFacebook ?
                <SocialSignIn signIn isButton authenticator={'facebook'} buttonText={"Sign In"} />
              : null
              }
              {signedInTwitter || signedInFacebook ?
                <SocialSignIn signOut isButton authenticator={'both'} buttonText={"Sign Out"}/>
                : null
              }
              {/* Please save these for testing
              <SocialSignIn signOut isButton authenticator={'twitter'} buttonText={"Sign Out"} />
              <SocialSignIn signOut isButton authenticator={'facebook'} buttonText={"Sign Out"} />
              */}
            </View>
          </View>
        </View>
    </View>;
  } // render
} // class
