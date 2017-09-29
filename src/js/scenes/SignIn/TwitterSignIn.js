import React, { Component, PropTypes } from "react";
import { $ajax_twitter_sign_in } from "../../utils/service";
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import {Actions} from "react-native-router-flux";
import {browserHistory} from "react-router"
import OAuthManager from 'react-native-oauth';
import TwitterActions from "../../actions/TwitterActions";
import VoterStore from "../../stores/VoterStore";
import VoterActions from "../../actions/VoterActions";
const web_app_config = require("../../config");
const _get = require('lodash.get');

let oauthManager = null;

export default class TwitterSignIn extends Component {
  static propTypes = {
    params: PropTypes.object,
    buttonText: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      callback_url: "wevotetwitterscheme://twitter_sign_in",
    };
  }

  componentWillMount () {
    console.log("Twitter Sign In, componentWillMount");
    this.initializeOAuthManager();
    // this.twitterStoreListener = TwitterStore.addListener(this._onTwitterStoreChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  initializeOAuthManager() {
    oauthManager = new OAuthManager('WeVoteReactNative');

    oauthManager.configure({
      twitter: {
        consumer_key: web_app_config.SOCIAL_AUTH_TWITTER_KEY,
        consumer_secret: web_app_config.SOCIAL_AUTH_TWITTER_SECRET,
        callback_url: this.state.callback_url,
      }
    });
  }

  _onVoterStoreChange () {
    let voter = VoterStore.getVoter();
    // if( voter.signed_in_twitter )
    //   this.props.navigator.redirect("/ballot");  // TODO: This is a test hack, don't check in
   }

  componentWillUnmount() {
    this.voterStoreListener.remove();
  }

  didClickTwitterSignInButton () {
    this.props.signIn ? this.twitterSignInStart() : this.twitterSignOut();
  }

  onKeyDown (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      this.didClickTwitterSignInButton();
    }
  }

  twitterSignInStart () {
    // TODO:  Move the Facebook part of this config to voterFacebookSignIn...
    if (!web_app_config.SOCIAL_AUTH_TWITTER_KEY) {   // also known as the TWITTER_CONSUMER_KEY
      console.log("Missing SOCIAL_AUTH_TWITTER_KEY from src/js/config.js");
    }
    if (!web_app_config.SOCIAL_AUTH_TWITTER_SECRET) {  // also known as the TWITTER_CONSUMER_SECRET
      console.log("Missing SOCIAL_AUTH_TWITTER_SECRET from src/js/config.js");
    }
    console.log("Attempting oAuth with twitter, callback_url = " + this.state.callback_url);

    oauthManager.authorize('twitter')
      .then(resp => {
        // console.log("Before lodash");
        // console.log(_get(resp, "status"));
        // console.log(_get(resp, "response.authorized"));
        // console.log(_get(resp, "response.credentials.access_token_secret"));
        // console.log(_get(resp, "response.credentials.access_token"));
        // console.log('afterlodash');
        if (_get(resp, "response.authorized")) {
          TwitterActions.twitterNativeSignInSave(_get(resp, "response.credentials.access_token"),
                                                 _get(resp, "response.credentials.access_token_secret"));
          console.log("Twitter oAuth query returned authorized");
          Actions.twitterSignInProcess();
        } else {
          console.log("Twitter oAuth query returned WAS NOT authorized!");
        }
      })
      .catch(err => {
        console.log('manager.authorize threw an error: ' + err.toString());
        console.log(err);
      });
    console.log('after manager.authorize twitter ');
  }

/*
  2017-09-21 17:50:33.549 [info][tid:com.facebook.React.JavaScript] resp =
  { status: 'ok',
   response:
   { authorized: true,
     identifier: '2EAF2219-4B2F-4907-95C6-BC46D950F58C',
     uuid: '2EAF2219-4B2F-4907-95C6-BC46D950F58C',
     credentials:
     { access_token_secret: 'BTViDMivqi48G38CPPBkZvEnjdpr1yzNvkWSNOvsSCEPq',
       access_token: '856525338557399042-XSBQshwmtjfbM0WEZ6Go5qekAR5XLhV'
     }
   },
   provider: 'twitter'
  }
*/

  /*
    September 2017:  Save for now, see the note in service.js
    twitterSignInStart () {
      let return_url = web_app_config.WE_VOTE_URL_PROTOCOL + web_app_config.WE_VOTE_HOSTNAME + "/twitter_sign_in";
      $ajax_twitter_sign_in({
        endpoint: "twitterSignInStart",
        data: { return_url: return_url },
      });
    }
  */

  // TODO: This is local only currently, have to communicate this to Postgres
  twitterSignOut () {
    oauthManager.deauthorize('twitter')
      .then(resp => {
        // deauthorize: {"status":"ok"}
        console.log("deauthorize: " + JSON.stringify(resp));
        console.log("Before deauthorizelodash");
        console.log(_get(resp, "status"));
        console.log('after deauthorize lodash');
       })
      .catch(err => {
        // If not authorized, throws {status: "error", msg: "No account found for twitter"}
        console.log('manager.authorize threw an error: ...' );
        console.log(err);
      });
    console.log('after manager.deauthorize twitter ');
  }

  render () {
    let button_text = "Twitter Sign In";
    if (this.props.buttonText) {
      button_text = this.props.buttonText;
    }

    return <TouchableOpacity style = {styles.button} onPress={this.props.signIn ? this.twitterSignInStart.bind(this) :
                                                                                  this.twitterSignOut.bind(this)}>
      <Text style = {styles.buttonText}>{ button_text }</Text>
    </TouchableOpacity>;
  }
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'baseline',
    justifyContent: 'center'
  },
});