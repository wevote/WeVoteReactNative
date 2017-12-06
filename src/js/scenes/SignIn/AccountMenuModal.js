import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux';

const logging = require("../../utils/logging");
import styles from "../../stylesheets/components/baseStyles";
import VoterSessionActions from "../../actions/VoterSessionActions";

// import BallotStore from "../../stores/BallotStore";
// import BookmarkStore from "../../stores/BookmarkStore";
// import FriendStore from "../../stores/FriendStore";
// import OrganizationActions from "../../actions/OrganizationActions";
// import VoterGuideActions from "../../actions/VoterGuideActions";

export default class AccountMenu extends Component {
  static propTypes = {
    showModal:  PropTypes.bool.isRequired,
    toggleFunction:  PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    // this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
    // this.hideAccountMenu = this.hideAccountMenu.bind(this);
    this.state = {
      about_menu_open: false,
      accountMenuOpen: false,
      bookmarks: [],
      // friend_invitations_sent_to_me: FriendStore.friendInvitationsSentToMe()
    };
  }

  componentWillReceiveProps () {
    console.log("AccountMenuModal componentWillReceiveProps showModal = " + this.props.showModal);
  }

  componentDidMount () {
    console.log("AccountMenuModal ++++ MOUNT ");

    // this.ballotStoreListener = BallotStore.addListener(this.onBallotStoreChange.bind(this));
    // this.bookmarkStoreListener = BookmarkStore.addListener(this.onBallotStoreChange.bind(this));
    // this.friendStoreListener = FriendStore.addListener(this._onFriendStoreChange.bind(this));
    //this.onBallotStoreChange();

    // this.props.location &&
    // let we_vote_branding_off_from_url = this.props.location.query ? this.props.location.query.we_vote_branding_off : 0;
    // // let we_vote_branding_off_from_cookie = cookies.getItem("we_vote_branding_off");
    // this.setState({
    //   we_vote_branding_off: we_vote_branding_off_from_url || we_vote_branding_off_from_cookie,
    // });
  }

  componentWillUnmount (){
    console.log("AccountMenuModal ---- UNMOUNT ");

    // this.ballotStoreListener.remove();
    // this.bookmarkStoreListener.remove();
    // this.friendStoreListener.remove();
  }

  // onBallotStoreChange (){
  //   this.setState({bookmarks: BallotStore.bookmarks });
  // }
  //
  // _onFriendStoreChange () {
  //   this.setState({
  //     friend_invitations_sent_to_me: FriendStore.friendInvitationsSentToMe()
  //   });
  // }
  //
  // toggleAccountMenu () {
  //   this.setState({accountMenuOpen: !this.state.accountMenuOpen});
  // }
  //
  // hideAccountMenu () {
  //   this.setState({accountMenuOpen: false});
  // }
  //
  // transitionToYourVoterGuide () {
  //   // Positions for this organization, for this voter / election
  //   OrganizationActions.retrievePositions(this.props.voter.linked_organization_we_vote_id, true);
  //   // Positions for this organization, NOT including for this voter / election
  //   OrganizationActions.retrievePositions(this.props.voter.linked_organization_we_vote_id, false, true);
  //   OrganizationActions.organizationsFollowedRetrieve();
  //   VoterGuideActions.voterGuideFollowersRetrieve(this.props.voter.linked_organization_we_vote_id);
  //   VoterGuideActions.voterGuidesFollowedByOrganizationRetrieve(this.props.voter.linked_organization_we_vote_id);
  //   this.setState({accountMenuOpen: false});
  // }
  //
  // imagePlaceholder (speaker_type) {
  //   let image_placeholder = "";
  //   if (speaker_type === "O") {
  //       image_placeholder = <div id= "anonIcon" className="header-nav__avatar"><Icon name="avatar-generic" width={34} height={34} /></div>;
  //   } else {
  //       image_placeholder = <div id= "anonIcon" className="header-nav__avatar"><Icon name="avatar-generic" width={34} height={34} /></div>;
  //   }
  //   return image_placeholder;
  // }
  //
  // goToGetStarted () {
  //   var getStartedNow = "/ballot";
  //   browserHistory.push(getStartedNow);
  // }

  hideModal () {
    console.log("AccountMenuModal on entry to hideModal this.state.isModalVisible: " + this.state.isModalVisible );
    // this.setState({ isModalVisible: false });
    this.props.toggleFunction();
  }

  signOutAndHideAccountMenu () {
    console.log("AccountMenuModal signOutAndHideAccountMenu() removing twitter and facebook authentication data");
    VoterSessionActions.voterSignOut();
    this.hideModal();
  }

  render () {
    logging.renderLog("AccountMenuModal scene = " + Actions.currentScene + ",  this.state.isModalVisible: " + this.state.isModalVisible);

    // let { pathname } = this.props;
    // let { voter_photo_url_medium } = this.props.voter;
    // let speaker_type = "V";  // TODO DALE make this dynamic
    // let { ballot, network, donate } = links;
    // let number_of_incoming_friend_requests = this.state.friend_invitations_sent_to_me.length;
    // let voter_is_signed_in = this.props.voter && this.props.voter.is_signed_in;
    // let show_full_navigation = cookies.getItem("show_full_navigation") || voter_is_signed_in;
    // let we_vote_branding_off = this.state.we_vote_branding_off;
    // let in_network_section = pathname === "/more/network" || pathname === "/more/network/organizations" || pathname === "/more/network/issues" || pathname === "/more/network/friends";
    // var { is_signed_in, linked_organization_we_vote_id, signed_in_facebook, signed_in_twitter, twitter_screen_name } = this.props.voter;
    // let show_your_page_from_twitter = signed_in_twitter && twitter_screen_name;
    // let show_your_page_from_facebook = signed_in_facebook && linked_organization_we_vote_id && !show_your_page_from_twitter;
    // let accountMenuOpen = this.state.accountMenuOpen ? "account-menu--open" : "";


    return (

      <View style={{flex: 0}}>
          <Modal
            animationIn='fadeInDown'
            animationOut='fadeOut'
            onBackdropPress={() => this.props.toggleFunction}
            visible={this.props.showModal}
            onRequestClose={() => this.props.toggleFunction}
            backdropOpacity={1}
            style={{
              flex: 0,
              left: 18,
              top: 36,
              borderColor: 'rgba(0,0,0,0.2)', borderWidth: 2,
              backgroundColor: 'white',
            }}
          >
            <TouchableWithoutFeedback onPress={this.hideModal.bind(this)}>
              <View style={{padding: 10}}>
                <View>
                  <Text style={styles.grayPromise}>Our Promise: We'll never sell your email.</Text>
                  <Text style={styles.modalChoiceDummy}>Your Voter Guide (Twitter)</Text>
                  <Text style={styles.modalChoiceDummy}>Your Voter Guide (Facebook)</Text>
                  <TouchableOpacity onPress={this.hideModal.bind(this)}>
                    <Text style={styles.modalChoices}>Your Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.hideModal.bind(this)}>
                    <Text style={styles.modalChoices}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.signOutAndHideAccountMenu.bind(this)}>
                    <Text style={styles.modalChoices}>Sign Out</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalChoiceDummy}>Your Bookmarked Items</Text>
                  <Text style={styles.modalChoiceDummy}>Getting Started</Text>
                  <TouchableOpacity onPress={() => {Actions.about({came_from: 'AccountMenuModal'})}} >
                    <Text style={styles.modalChoices}>About We Vote</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalChoiceDummy}>Donate</Text>
                </View>
                <View style={{flex: 0, flexDirection: 'row', paddingTop: 10}} >
                  <TouchableOpacity onPress={() => {Actions.termsOfService({came_from: 'AccountMenuModal'})}}>
                    <Text style={styles.modalChoicesSmall}>Terms of Service</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {Actions.privacy({came_from: 'AccountMenuModal'})}} >
                    <Text style={styles.modalChoicesSmall}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
  }
}

