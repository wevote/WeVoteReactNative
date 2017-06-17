import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
//import Helmet from "react-helmet";
import { browserHistory } from "react-router-native";
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
//import FacebookActions from "../../actions/FacebookActions";
//import FacebookStore from "../../stores/FacebookStore";
//import FacebookSignIn from "../../components/Facebook/FacebookSignIn";
import LoadingWheel from "../../components/LoadingWheel";
//import TwitterActions from "../../actions/TwitterActions";
//import TwitterSignIn from "../../components/Twitter/TwitterSignIn";
import VoterActions from "../../actions/VoterActions";
import VoterEmailAddressEntry from "../../components/VoterEmailAddressEntry";
import VoterSessionActions from "../../actions/VoterSessionActions";
import VoterStore from "../../stores/VoterStore";

var t = require('tcomb-form-native');
var Form = t.form.Form;

const debug_mode = false;
const delay_before_user_name_update_api_call = 1200;
class SignIn extends Component {

  constructor (props) {
    super(props);
    this.state = {
      facebook_auth_response: {},
      first_name: "",
      last_name: "",
      initial_name_loaded: false,
      name_saved_status: ""
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateVoterName = this.updateVoterName.bind(this);
  }

  componentDidMount () {
    // console.log("SignIn componentDidMount");
    this._onVoterStoreChange();
    //this.facebookListener = FacebookStore.addListener(this._onFacebookChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  componentWillUnmount () {
    //this.facebookListener.remove();
    this.voterStoreListener.remove();
    this.timer = null;
  }

  _onVoterStoreChange () {
    if (VoterStore.isVoterFound() && !this.state.initial_name_loaded) {
      this.setState({
        first_name: VoterStore.getFirstName(),
        last_name: VoterStore.getLastName(),
        initial_name_loaded: true,
        voter: VoterStore.getVoter()
      });
    } else {
      this.setState({voter: VoterStore.getVoter()});
    }
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



  // getFacebookAuthResponse () {
  //   return {
  //     accessToken: FacebookStore.accessToken,
  //     facebookIsLoggedIn: FacebookStore.loggedIn,
  //     userId: FacebookStore.userId,
  //     facebookPictureStatus: FacebookStore.facebookPictureStatus,
  //     facebookPictureUrl: FacebookStore.facebookPictureUrl
  //   };
  // }



  render () {
    var voter = this.state;

    var FormField = t.struct({
      name: t.String,
      surname: t.String,
      rememberMe: t.Boolean
    });

    if (!voter){
      return LoadingWheel;
    }

    // console.log("SignIn.jsx this.state.facebook_auth_response:", this.state.facebook_auth_response);
    if (!voter.signed_in_facebook && this.state.facebook_auth_response && this.state.facebook_auth_response.facebook_retrieve_attempted) {
      console.log("SignIn.jsx facebook_retrieve_attempted");
      browserHistory.push("/facebook_sign_in");
      // return <Text>SignIn.jsx facebook_retrieve_attempted</Text>;
      return LoadingWheel;
    }

    let your_account_title = "Your Account";
    let your_account_explanation = "";
    if (voter.is_signed_in) {
      if (voter.signed_in_facebook && !voter.signed_in_twitter) {
        your_account_title = "Have Twitter Too?";
        your_account_explanation = "By adding your Twitter account to your We Vote profile, you get access to the voter guides of everyone you follow.";
      } else if (voter.signed_in_twitter && !voter.signed_in_facebook) {
        your_account_title = "Have Facebook Too?";
        your_account_explanation = "By adding Facebook to your We Vote profile, it is easier to invite friends.";
      }
    }

    return( 
    <View>
      <View >
      <View >
        {voter.is_signed_in ?
          <View >
            <Text >Your Account</Text>
              <View style={styles.container}>
                <Form
                ref="form"
                type={FormField}
                />
                <TouchableOpacity style={styles.button} onPress={this.onPress} >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>              
                <Text>{this.state.name_saved_status}</Text>
          </View> :null
          }

          <View>
              <View>
                <Text >Currently Signed In</Text>

                <TouchableOpacity style = {styles.button} onPress={VoterSessionActions.voterSignOut}>
                  <Text style = {styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                </View> 
              </View>      
            <VoterEmailAddressEntry />
          </View>
      </View>
    </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
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
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default SignIn;