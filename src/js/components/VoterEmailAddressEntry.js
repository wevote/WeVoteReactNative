import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { FormInput } from 'react-native-elements'
import LoadingWheel from "../components/LoadingWheel";
import VoterActions from "../actions/VoterActions";
import VoterStore from "../stores/VoterStore";

export default class VoterEmailAddressEntry extends Component {
  static propTypes = {
  };

  constructor (props) {
      super(props);
      this.state = {
        loading: true,
        email_address_status: {
          email_address_already_owned_by_other_voter: false,
          email_address_created: false,
          email_address_deleted: false,
          verification_email_sent: false,
          link_to_sign_in_email_sent: false
        },
        edit_verified_emails_on: false,
        edit_emails_to_verify_on: false,
        voter: VoterStore.getVoter(),
        voter_email_address: "",
        voter_email_address_list: []
      };
  }

  componentDidMount () {
    //console.log("VoterEmailAddressEntry componentDidMount");
    VoterActions.voterRetrieve();
    VoterActions.voterEmailAddressRetrieve();
    this._onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  componentWillUnmount (){
    this.voterStoreListener.remove();
  }

  _onVoterStoreChange () {
    this.setState({
        voter: VoterStore.getVoter(),
        voter_email_address_list: VoterStore.getEmailAddressList(),
        email_address_status: VoterStore.getEmailAddressStatus(),
        loading: false
    });
  }

  _ballotLoaded (){
    // browserHistory.push(this.props.saveUrl);
  }

  editVerifiedEmailsOn () {
    this.setState({edit_verified_emails_on: true});
  }

  editVerifiedEmailsOff () {
    this.setState({edit_verified_emails_on: false});
  }

  editEmailsToVerifyOn () {
    this.setState({edit_emails_to_verify_on: true});
  }

  editEmailsToVerifyOff () {
    this.setState({edit_emails_to_verify_on: false});
  }

  removeVoterEmailAddress (email_we_vote_id) {
    VoterActions.removeVoterEmailAddress(email_we_vote_id);
  }

  resetEmailForm () {
    this.setState({
      email_address_status: {
        email_address_already_owned_by_other_voter: false,
        email_address_created: false,
        email_address_deleted: false,
        verification_email_sent: false,
        link_to_sign_in_email_sent: false
      },
      loading: false
    });
  }

  sendSignInLinkEmail (event) {
    event.preventDefault();
    VoterActions.sendSignInLinkEmail(this.state.voter_email_address);
    this.setState({
      email_address_status: {
        email_address_already_owned_by_other_voter: false,
      },
      loading: true
    });
  }

  sendVerificationEmail (email_we_vote_id) {
    VoterActions.sendVerificationEmail(email_we_vote_id);
    this.setState({loading: true});
  }

  setAsPrimaryEmailAddress (email_we_vote_id) {
    VoterActions.setAsPrimaryEmailAddress(email_we_vote_id);
  }

  updateVoterEmailAddress (e) {
    this.setState({
      voter_email_address: e.target.value
    });
  }

  voterEmailAddressSave (event) {
    event.preventDefault();
    let send_link_to_sign_in = true;
    VoterActions.voterEmailAddressSave(this.state.voter_email_address, send_link_to_sign_in);
    this.setState({loading: true});
  }

  render () {
      if (!this.state.voter){
          return <LoadingWheel text={'Loading your information'}/>;
      }
    //console.log("Entering VoterEmailAddressEntry.jsx");

    const email_address_status_html = <View>
      { this.state.email_address_status.email_address_already_owned_by_other_voter &&
        !this.state.email_address_status.link_to_sign_in_email_sent ?
// Need to find substitute for Alert in react-native
//        <Alert bsStyle="warning">
//          That email is already being used by another account.<br />
//          <br />
//          Please click "Send Login Link in an Email" below to sign into that account.
//        </Alert>
        null :
        null }
      { this.state.email_address_status.email_address_created ||
        this.state.email_address_status.email_address_deleted ||
        this.state.email_address_status.email_ownership_is_verified ||
        this.state.email_address_status.verification_email_sent ||
        this.state.email_address_status.link_to_sign_in_email_sent ?
//        <Alert bsStyle="success">
//          { this.state.email_address_status.email_address_created &&
//            !this.state.email_address_status.verification_email_sent ? <span>Your email address was saved. </span> : null }
//          { this.state.email_address_status.email_address_deleted ? <span>Your email address was deleted. </span> : null }
//          { this.state.email_address_status.email_ownership_is_verified ? <span>Your email address was verified. </span> : null }
//          { this.state.email_address_status.verification_email_sent ? <span>Please check your email. A verification email was sent. </span> : null }
//          { this.state.email_address_status.link_to_sign_in_email_sent ? <span>Please check your email. A sign in link was sent. </span> : null }
//        </Alert>
        null :
        null }
      </View>;

    let enter_email_title = "Sign In With Email";
    let enter_email_explanation = "You will receive a magic link in your email inbox. Click that link to be signed into your We Vote account.";
    if (this.state.voter && this.state.voter.is_signed_in) {
      enter_email_title = "Add New Email";
      enter_email_explanation = "You will receive a magic link in your email inbox. Click that link to verify this new email.";
    }
    var {height, width} = Dimensions.get('window');
    const enter_email_html = <View>
      <Text style={styles.title}>{enter_email_title}</Text>
      <Text>{enter_email_explanation}</Text>
        <FormInput style={{height: 40, width: width-100, borderColor: 'lightgray', borderWidth: 0.3}}
          onChangeText={(value) => this.setState({voter_email_address: value})}
          onSubmitEditing={this.voterEmailAddressSave}
          value={this.state.voter_email_address}
          placeholder="Email Address"/>
        <TouchableOpacity style = {styles.button} onPress={this.voterEmailAddressSave.bind(this)}>
           <Text style = {styles.button_text}>Send Verification Link</Text>
        </TouchableOpacity>
      </View>;

    // const send_link_to_login_html = <div>
    //     <form onSubmit={this.sendSignInLinkEmail.bind(this)} className="u-stack--md">
    //       <input
    //         type="text"
    //         onChange={this.updateVoterEmailAddress.bind(this)}
    //         name="voter_email_address"
    //         value={this.state.voter_email_address}
    //         className="form-control text-center"
    //         placeholder="Sign in with email address"
    //       />
    //     </form>
    //
    //     <div className="u-stack--md">
    //       <Button onClick={this.resetEmailForm.bind(this)}
    //               bsStyle="default"
    //               bsSize="small">
    //         Cancel
    //       </Button>
    //       <Button onClick={this.sendSignInLinkEmail.bind(this)}
    //               bsStyle="primary">
    //         Send Sign In Link in an Email</Button>
    //     </div>
    //   </div>;

    let allow_remove_email;
    let email_ownership_is_verified;
    let is_primary_email_address;

    // ///////////////////////////////////
    // LIST OF VERIFIED EMAILS
    let verified_emails_found = false;
    let verified_email_exists_that_is_not_primary = false;
    const verified_email_list_html = this.state.voter_email_address_list.map( (voter_email_address_from_list) => {
      email_ownership_is_verified = voter_email_address_from_list.email_ownership_is_verified ? true : false;
      if (email_ownership_is_verified) {
        verified_emails_found = true;
        allow_remove_email = voter_email_address_from_list.primary_email_address !== true;
        is_primary_email_address = voter_email_address_from_list.primary_email_address === true;
        if (!is_primary_email_address) {
          verified_email_exists_that_is_not_primary = true;
        }
        return <View key={voter_email_address_from_list.email_we_vote_id} style={styles.container}>
          <Text style={styles.title_text}>{voter_email_address_from_list.normalized_email_address }
              {is_primary_email_address ?
                <Text>&nbsp;&nbsp;&nbsp;Primary email</Text>
                : null }
          </Text>
          {this.state.edit_verified_emails_on && !is_primary_email_address ?
            <View>
              <Text>&nbsp;&nbsp;&nbsp;</Text>
              {is_primary_email_address ?
                null :
                <Text onPress={this.setAsPrimaryEmailAddress.bind(this, voter_email_address_from_list.email_we_vote_id)}>
                      Make Primary &nbsp;&nbsp;&nbsp;
                </Text>
              }
              <Text>&nbsp;&nbsp;&nbsp;</Text>
              {allow_remove_email ?
                <Text onPress={this.removeVoterEmailAddress.bind(this, voter_email_address_from_list.email_we_vote_id)}>
                  Remove Email</Text> :
                null }
            </View> :
            null }
        </View>;
      } else {
        return null;
      }
    });
    // ////////////////////////////////////
    // LIST OF EMAILS TO VERIFY
    let unverified_emails_found = false;
    const to_verify_email_list_html = this.state.voter_email_address_list.map( (voter_email_address_from_list) => {
      email_ownership_is_verified = voter_email_address_from_list.email_ownership_is_verified ? true : false;
      if (!email_ownership_is_verified) {
        unverified_emails_found = true;
        allow_remove_email = voter_email_address_from_list.primary_email_address ? false : true;
        is_primary_email_address = voter_email_address_from_list.primary_email_address ? true : false;
        return <View>
          <View>
            <Text>{voter_email_address_from_list.normalized_email_address}
              <Text>&nbsp;&nbsp;&nbsp;</Text>
              To Be Verified
             </Text>
          </View>
          {this.state.edit_emails_to_verify_on ?
            <View>
              <Text>&nbsp;&nbsp;&nbsp;</Text>
              {voter_email_address_from_list.email_ownership_is_verified ?
                null :
                <Text onPress={this.sendVerificationEmail.bind(this, voter_email_address_from_list.email_we_vote_id)} >
                  Send Verification Again
                </Text>}

              <Text>&nbsp;&nbsp;&nbsp;</Text>
              {allow_remove_email ?
                <Text onPress={this.removeVoterEmailAddress.bind(this, voter_email_address_from_list.email_we_vote_id)} >
                  Remove Email
                </Text> :
                null }
            </View> :
            null }
          </View>;
      } else {
        return null;
      }
    });

    return (
    <View>
      <View>

          {email_address_status_html}
          {verified_emails_found ?
            <View>
                <Text style={styles.title}>Your Emails</Text>
                { this.state.edit_verified_emails_on ?
                  <View>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={{alignSelf: 'flex-end'}} onPress={this.editVerifiedEmailsOff.bind(this)} >
                      stop editing
                    </Text>
                  </View> :
                  <View>
                    { verified_email_exists_that_is_not_primary ? <View>
                      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                      <Text style={{alignSelf: 'flex-end'}} onPress={this.editVerifiedEmailsOn.bind(this)} >
                        edit
                      </Text>
                    </View> :
                    null }
                  </View>
                }
                <View>
                  {verified_email_list_html}
                </View>
            </View> :
          null }

          {unverified_emails_found ?
            <View>
              <Text style={styles.title}>Emails to Verify</Text>
              { this.state.edit_emails_to_verify_on ?
                <View>
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text style={{alignSelf: 'flex-end'}} onPress={this.editEmailsToVerifyOff.bind(this)} >
                    stop editing
                  </Text>
                </View> :
                <View>
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text style={{alignSelf: 'flex-end'}} onPress={this.editEmailsToVerifyOn.bind(this)} >
                    edit
                  </Text>
                </View> }
              <br />
              <View>
                {to_verify_email_list_html}
              </View>
            </View> :
            null }

        <View>{ enter_email_html }</View>
      </View>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
    marginBottom: 10
  },
  baseText: {
	  fontFamily: 'sans-serif',
  },
  titleText: {
	fontFamily: 'sans-serif',
	fontSize: 15,
	fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginBottom: 10
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
    alignSelf: 'baseline',
    justifyContent: 'center'
  },
});