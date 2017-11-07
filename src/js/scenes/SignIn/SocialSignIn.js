import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Platform } from 'react-native';
import styles from "../../stylesheets/BaseStyles"
import {Actions} from "react-native-router-flux";
import OAuthManager from 'react-native-oauth';
import TwitterActions from "../../actions/TwitterActions";
import FacebookActions from "../../actions/FacebookActions";
import VoterActions from "../../actions/VoterActions";
import VoterStore from "../../stores/VoterStore";

import FacebookStore from "../../stores/FacebookStore";
import {AccessToken} from "react-native-fbsdk";

const webAppConfig = require("../../config");
const lodash_get = require('lodash.get');
const logging = require("../../utils/logging");

let oauthManager = null;

// SocialSignIn was TwitterSignIn in the WebApp, but now handles both Twitter and Facebook signins in native
export default class SocialSignIn extends Component {
  static propTypes = {
    params: PropTypes.object,
    buttonText: PropTypes.string,
    authenticator:  PropTypes.string.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      hasMounted: false
    };
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to SocialSignIn: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from SocialSignIn: currentScene = " + Actions.currentScene);
  };


  componentWillMount () {
    console.log("Social Sign In ++++ MOUNT, hasMounted = " + this.state.hasMounted);
    if (!this.state.hasMounted) {
      this.setState({hasMounted: true});
    }

    if (oauthManager) {
      console.log("OAUTH oauthManager already initialized in componentWillMount, not adding potentially duplicate listeners");
    } else {
      console.log("OAUTH setting adding listeners in componentWillMount ()");

      this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
      this.facebookStoreListener = FacebookStore.addListener(this._onFacebookStoreChange.bind(this)); // Oct 13, 2017: Not sure this is need here, just to test the listener
      this.initializeOAuthManager();
    }
  }

  initializeOAuthManager() {
    if (!webAppConfig.SOCIAL_AUTH_TWITTER_KEY) {   // also known as the TWITTER_CONSUMER_KEY
      console.log("Missing SOCIAL_AUTH_TWITTER_KEY from src/js/config.js");
    }
    if (!webAppConfig.SOCIAL_AUTH_TWITTER_SECRET) {  // also known as the TWITTER_CONSUMER_SECRET
      console.log("Missing SOCIAL_AUTH_TWITTER_SECRET from src/js/config.js");
    }
    if (!webAppConfig.SOCIAL_AUTH_FACEBOOK_KEY) {
      console.log("Missing SOCIAL_AUTH_FACEBOOK_KEY from src/js/config.js");
    }
    if (!webAppConfig.SOCIAL_AUTH_FACEBOOK_SECRET) {
      console.log("Missing SOCIAL_AUTH_FACEBOOK_SECRET from src/js/config.js");
    }


    if (oauthManager) {
      console.log("OAUTH oauthManager already initialized in initializeOAuthManager()")
    } else {
      console.log("OAUTH initializing new OAuthManager() in initializeOAuthManager()");
      oauthManager = new OAuthManager('WeVoteReactNative');
      oauthManager.configure({
        twitter: {
          consumer_key: webAppConfig.SOCIAL_AUTH_TWITTER_KEY,
          consumer_secret: webAppConfig.SOCIAL_AUTH_TWITTER_SECRET,
          callback_url: (Platform.OS === 'ios') ? "wevotetwitterscheme://twitter_sign_in" : "http://localhost/twitter",
        },
        facebook: {
          client_id: webAppConfig.SOCIAL_AUTH_FACEBOOK_KEY,
          client_secret: webAppConfig.SOCIAL_AUTH_FACEBOOK_SECRET,
          //callback_url: (Platform.OS === 'ios') ? "http://localhost/fb" + webAppConfig.SOCIAL_AUTH_FACEBOOK_KEY  : "http://localhost/facebook",  //http://localhost:3000/  "://authorize"
          callback_url: (Platform.OS === 'ios') ? "fb" + webAppConfig.SOCIAL_AUTH_FACEBOOK_KEY + "://authorize" : "http://localhost/facebook",
        }
      });
    }
  }

  _onVoterStoreChange () {
    // We don't do anything with voter, but we do use this to detect when voter is updated with authentication data
    // Not sure if this is still necessary October 12, 2017
    let voter = VoterStore.getVoter();
   }

  _onFacebookStoreChange () {
    // We don't do anything with facebook store
    // Not sure if this is still necessary October 13, 2017
    let facebook = FacebookStore.getFacebookAuthResponse();
   }

  componentWillUnmount () {
    console.log("Social Sign In ---- UN mount");
    if (this.voterStoreListener)
      this.voterStoreListener.remove();
    if (this.facebookStoreListener)
      this.facebookStoreListener.remove();
  }

  didClickSocialSignInButton () {
    this.props.signIn ? this.twitterSignInStart() : this.SocialSignOut();
  }

  onKeyDown (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      this.didClickTSocialSignInButton();
    }
  }

  socialSignInStart () {
    let authenticator = this.props.authenticator;
    console.log("Attempting oAuth with \'" + authenticator + "\'" );

    oauthManager.authorize(authenticator) // Must be 'twitter' or 'facebook' or else
      .then(resp => {
        console.log("authManager.authorize(" + authenticator + ").then()");
        let authorized = (Platform.OS === 'ios') ? lodash_get(resp, "response.authorized") : lodash_get(resp, "authorized");
        if (authorized) {
          console.log(authenticator + " oAuth query returned authorized");
          if (this.props.authenticator === 'twitter') {
            let token = lodash_get(resp, "response.credentials.access_token");
            let secret = lodash_get(resp, "response.credentials.access_token_secret");
            if(!secret)
              secret = "null secret received in " + this.props.authenticator;
            let consumer = lodash_get(resp, "response.credentials.consumerKey");

            TwitterActions.twitterNativeSignInSave(token, secret);  // Save to postgres
            logging.rnrfLog("SocialSignIn  Actions.twitterSignInProcess({navigated_away: false})");
            Actions.twitterSignInProcess({came_from: 'socialSignIn'});
          } else {
            let accessToken = lodash_get(resp, "response.credentials.accessToken") || false;
            let clientID = lodash_get(resp, "response.credentials.clientID") || false;
            console.log("SocialSignIn oauthManager.authorize for Facebook DID DID DID succeed ");
            FacebookActions.voterFacebookSignInAuth({
              facebook_access_token: accessToken,
              facebook_user_id: clientID,
            });

            // October 19, 2017
            // For Android, initialize the Java side AccessToken so that when we get to
            // ./node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk/FBGraphRequestModule.java
            // private void setConfig(GraphRequest graphRequest, ReadableMap configMap) and try to set the new
            // AccessToken, based on the previous one (that you would have gotten if you used the FBSDK to authenticate)
            // there is a bare bones AccessToken in place to avoid crashing in kind of thoughtless lines like
            // AccessToken.getCurrentAccessToken().getApplicationId()
            AccessToken.setCurrentAccessToken({
              accessToken: accessToken,
              permissions: [],
              declinedPermissions: [],
              applicationID: clientID,
              accessTokenSource: "FACEBOOK_APPLICATION_NATIVE",
              userID: clientID,
              expirationTime: 0,
              lastRefreshTime: 0,
            });

            FacebookActions.getFacebookData(accessToken);
            if (!VoterStore.isVoterFound ())  {
              VoterActions.voterRetrieve();  // Load the voter, so they will be available on the Ballot tab, New October 26, 2017
            }
            logging.rnrfLog("SocialSignIn  Actions.signIn({came_from: 'socialSignIn'})");
            Actions.signIn({
              came_from: 'socialSignIn',
              forward_to_ballot: true
            });
          }
        } else {
          console.log(authenticator + ' oAuth query returned WAS NOT authorized!');
        }
      })
      .catch(err => {
        console.log('manager.authorize threw an error: ' + err.toString());
        console.log(err);
      });
    console.log('after manager.authorize ' + authenticator);
  }

   /*
  10/4/17: This was meant for debugging, but without it, all we do is a /src/js/actions/VoterSessionActions.js, which
  "signs out" by clearing the voter_device_id, which has the effect of signing out of WeVote (while still having an
   active authentication session with twitter).  The only way to really signout of twitter without this function,
  would be to delete the app from your phone, and re-install it.
   */
  socialSignOut () {
    oauthManager.deauthorize(this.props.authenticator)
      .then(resp => {
        // resp is ... deauthorize: {"status":"ok"}
        console.log("deauthorize: " + JSON.stringify(resp));
        console.log("Before deauthorizelodash");
        console.log(lodash_get(resp, "status"));
        console.log('after deauthorize lodash');
       })
      .catch(err => {
        // If not authorized, throws {status: "error", msg: "No account found for twitter"}
        console.log('manager.authorize threw an error: ...' );
        console.log(err);
      });
    console.log('after oauthManager.deauthorize social: ' + this.props.authenticator);
  }

  render () {
    if ( ( Actions.currentScene !== "socialSignIn") && ( Actions.currentScene !== "signIn") ) {
      logging.renderLog("SocialSignIn", "when NOT CURRENT, scene  = " + Actions.currentScene);
      return null;
    }
    logging.renderLog("SocialSignIn", "scene = " + Actions.currentScene + "  hasMounted = " + this.state.hasMounted);


    let onPressFunction = null;
    let button_text = null;
    if (this.props.signIn) {
      onPressFunction = this.socialSignInStart.bind(this);
      if (this.props.authenticator === 'twitter') {
         button_text = this.props.buttonText ? this.props.buttonText : "Twitter Sign In";
      } else {
        button_text = this.props.buttonText ? this.props.buttonText : "Facebook Sign In";
      }
    } else {
      onPressFunction = this.socialSignOut.bind(this);
      if (this.props.authenticator === 'twitter') {
        button_text = this.props.buttonText ? this.props.buttonText : "Twitter Sign Out";
      } else {
        button_text = this.props.buttonText ? this.props.buttonText : "Facebook Sign Out";
      }
    }

    return <TouchableOpacity style = {styles.button} onPress={onPressFunction}>
        <Text style = {styles.buttonText}>{ button_text }</Text>
      </TouchableOpacity>;
  }
}
