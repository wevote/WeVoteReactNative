import React, { Component, PropTypes } from "react";
import { $ajax_twitter_sign_in } from "../../utils/service";
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
// import TwitterActions from "../../actions/TwitterActions";
const web_app_config = require("../../config");

export default class TwitterSignIn extends Component {
  static propTypes = {
    params: PropTypes.object,
    buttonText: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  didClickTwitterSignInButton () {
    // We search for ":twitter_secret_key" and replace it with the actual TwitterLinkToVoter twitter_secret_key
    //  at the end of the sign in process.
    let return_url = web_app_config.WE_VOTE_URL_PROTOCOL + web_app_config.WE_VOTE_HOSTNAME + "/twitter_sign_in";
    this.twitterSignInStart(return_url);
  }

  onKeyDown (event) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(event.keyCode)) {
      this.didClickTwitterSignInButton();
    }
  }

  twitterSignInStart () {
    let return_url = web_app_config.WE_VOTE_URL_PROTOCOL + web_app_config.WE_VOTE_HOSTNAME + "/twitter_sign_in";
    $ajax_twitter_sign_in({
      endpoint: "twitterSignInStart",
      data: { return_url: return_url },
    });
   }

  render () {
    let button_text = "Twitter Sign In";
    if (this.props.buttonText) {
      button_text = this.props.buttonText;
    }

    return <TouchableOpacity style = {styles.button} onPress={this.twitterSignInStart}>
      <Text style = {styles.buttonText}>{ button_text }</Text>
     </TouchableOpacity>;

//    <a tabIndex="0" onKeyDown={this.onKeyDown.bind(this)}
//              className="btn btn-social btn-lg btn-twitter"
//              onClick={this.twitterSignInStart} >
//      <i className="fa fa-twitter" />{ button_text }
//    </a>;

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