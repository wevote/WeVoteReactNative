import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux';

import BallotStore from "../../stores/BallotStore";
import BookmarkStore from "../../stores/BookmarkStore";
import FriendStore from "../../stores/FriendStore";
import OrganizationActions from "../../actions/OrganizationActions";
import RouteConst from "../routeConst";
import styles from "../../stylesheets/components/baseStyles";
import VoterGuideActions from "../../actions/VoterGuideActions";
import VoterSessionActions from "../../actions/VoterSessionActions";
const logging = require("../../utils/logging");


export default class AccountMenu extends Component {
  static propTypes = {
    location: PropTypes.object,
    voter: PropTypes.object,
    pathname: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
    this.hideAccountMenu = this.hideAccountMenu.bind(this);
    this.state = {
      about_menu_open: false,
      accountMenuOpen: false,
      isModalVisible:  false,
      bookmarks: [],
      friend_invitations_sent_to_me: FriendStore.friendInvitationsSentToMe()
    };
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to AccountMenu: currentScene = " + Actions.currentScene);
    // React Navigation / RNRF Tabs do not re-render when displayed, so we need this...
    // Actions.refesh() forces componentWillReceiveProps() to be executed
    Actions.refresh({
      entryTime: new Date()
    });
  };

  static onExit = () => {
    logging.rnrfLog("onExit from AccountMenu: currentScene = " + Actions.currentScene);
    Actions.refresh({came_from: RouteConst.KEY_BALLOT, forward_to_ballot: false})
  };

  componentWillReceiveProps () {
    this.setState({
      isModalVisible: true
     });
  }

  componentDidMount () {
    this.ballotStoreListener = BallotStore.addListener(this.onBallotStoreChange.bind(this));
    this.bookmarkStoreListener = BookmarkStore.addListener(this.onBallotStoreChange.bind(this));
    this.friendStoreListener = FriendStore.addListener(this._onFriendStoreChange.bind(this));
    this.onBallotStoreChange();

    // this.props.location &&
    // let we_vote_branding_off_from_url = this.props.location.query ? this.props.location.query.we_vote_branding_off : 0;
    // // let we_vote_branding_off_from_cookie = cookies.getItem("we_vote_branding_off");
    // this.setState({
    //   we_vote_branding_off: we_vote_branding_off_from_url || we_vote_branding_off_from_cookie,
    // });
  }

  componentWillUnmount (){
    this.ballotStoreListener.remove();
    this.bookmarkStoreListener.remove();
    this.friendStoreListener.remove();
  }

  onBallotStoreChange (){
    this.setState({bookmarks: BallotStore.bookmarks });
  }

  _onFriendStoreChange () {
    this.setState({
      friend_invitations_sent_to_me: FriendStore.friendInvitationsSentToMe()
    });
  }

  toggleAccountMenu () {
    this.setState({accountMenuOpen: !this.state.accountMenuOpen});
  }

  hideAccountMenu () {
    this.setState({accountMenuOpen: false});
  }

  signOutAndHideAccountMenu () {
    console.log("AccountMenu signOutAndHideAccountMenu() removing twitter and facebook authentication data");
    VoterSessionActions.voterSignOut();
    this._showModal();
  }

  transitionToYourVoterGuide () {
    // Positions for this organization, for this voter / election
    OrganizationActions.retrievePositions(this.props.voter.linked_organization_we_vote_id, true);
    // Positions for this organization, NOT including for this voter / election
    OrganizationActions.retrievePositions(this.props.voter.linked_organization_we_vote_id, false, true);
    OrganizationActions.organizationsFollowedRetrieve();
    VoterGuideActions.voterGuideFollowersRetrieve(this.props.voter.linked_organization_we_vote_id);
    VoterGuideActions.voterGuidesFollowedByOrganizationRetrieve(this.props.voter.linked_organization_we_vote_id);
    this.setState({accountMenuOpen: false});
  }

  imagePlaceholder (speaker_type) {
    let image_placeholder = "";
    if (speaker_type === "O") {
        image_placeholder = <div id= "anonIcon" className="header-nav__avatar"><Icon name="avatar-generic" width={34} height={34} /></div>;
    } else {
        image_placeholder = <div id= "anonIcon" className="header-nav__avatar"><Icon name="avatar-generic" width={34} height={34} /></div>;
    }
    return image_placeholder;
  }

  goToGetStarted () {
    var getStartedNow = "/ballot";
    browserHistory.push(getStartedNow);
  }

  _showModal = () => {
    if (this.state.isModalVisible) {
      logging.rnrfLog("AccountMenu  Actions.signIn({came_from: RouteConst.KEY_ACCOUNT_MENU})");
      Actions.signIn({
        came_from: RouteConst.KEY_ACCOUNT_MENU
      });

    }
    this.setState({ isModalVisible: true });
  }

  _hideModal = () => this.setState({ isModalVisible: false });


  render () {
    logging.renderLog("AccountMenu.js", "scene = " + Actions.currentScene);

    let { pathname } = this.props;
    // let { voter_photo_url_medium } = this.props.voter;
    let speaker_type = "V";  // TODO DALE make this dynamic
    // let { ballot, network, donate } = links;
    // let number_of_incoming_friend_requests = this.state.friend_invitations_sent_to_me.length;
    let voter_is_signed_in = this.props.voter && this.props.voter.is_signed_in;
    // let show_full_navigation = cookies.getItem("show_full_navigation") || voter_is_signed_in;
    let we_vote_branding_off = this.state.we_vote_branding_off;
    let in_network_section = pathname === "/more/network" || pathname === "/more/network/organizations" || pathname === "/more/network/issues" || pathname === "/more/network/friends";


//    var { is_signed_in, linked_organization_we_vote_id, signed_in_facebook, signed_in_twitter, twitter_screen_name } = this.props.voter;

    // let show_your_page_from_twitter = signed_in_twitter && twitter_screen_name;
let show_your_page_from_twitter = true
    // let show_your_page_from_facebook = signed_in_facebook && linked_organization_we_vote_id && !show_your_page_from_twitter;
let show_your_page_from_facebook = true
    // let accountMenuOpen = this.state.accountMenuOpen ? "account-menu--open" : "";
let accountMenuOpen = true;

    return (
      <Modal
        animationIn='fadeInDown'
        animationOut='fadeOut'
        isVisible={this.state.isModalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        backdropOpacity={1}
        style={{
          left: 20,
          top: 35,
          backgroundColor: 'white',
         }}
      >
        <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
          <View style={{padding: 10}}>
            <Text style={styles.grayPromise}>Our Promise: We'll never sell your email.</Text>
            <Text style={styles.modalChoiceDummy}>Your Voter Guide (Twitter)</Text>
            <Text style={styles.modalChoiceDummy}>Your Voter Guide (Facebook)</Text>
            <TouchableOpacity onPress={this._showModal}>
              <Text style={styles.modalChoices}>Your Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._showModal}>
              <Text style={styles.modalChoices}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signOutAndHideAccountMenu.bind(this)}>
              <Text style={styles.modalChoices}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={styles.modalChoiceDummy}>Your Bookmarked Items</Text>
            <Text style={styles.modalChoiceDummy}>Getting Started</Text>
            <Text style={styles.modalChoiceDummy}>About We Vote</Text>
            <Text style={styles.modalChoiceDummy}>Donate</Text>
            <Text style={styles.modalChoices}> </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={styles.grayPromise}>Terms of Service</Text>
              <Text style={styles.grayPromise}>Privacy Policy</Text>
            </View>
          </View>
        </View>
      </Modal>
  );
  }
}

