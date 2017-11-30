import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux';

const logging = require("../../utils/logging");
import RouteConst  from "../RouteConst";
import styles from "../../stylesheets/components/baseStyles";
import VoterSessionActions from "../../actions/VoterSessionActions";

// import BallotStore from "../../stores/BallotStore";
// import BookmarkStore from "../../stores/BookmarkStore";
// import FriendStore from "../../stores/FriendStore";
// import OrganizationActions from "../../actions/OrganizationActions";
// import VoterGuideActions from "../../actions/VoterGuideActions";

export default class AccountMenu extends Component {
  static propTypes = {
    // location: PropTypes.object,
    // voter: PropTypes.object,
    // pathname: PropTypes.string
    toggleFunction:  PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    // this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
    // this.hideAccountMenu = this.hideAccountMenu.bind(this);
    this.state = {
      about_menu_open: false,
      accountMenuOpen: false,
      isModalVisible:  true,
      bookmarks: [],
      // friend_invitations_sent_to_me: FriendStore.friendInvitationsSentToMe()
    };
  }

  componentWillReceiveProps () {
    console.log("AccountMenu componentWillReceiveProps setting isModalVisible to true");
    this.setState({
      isModalVisible: true
    });
  }

  componentDidMount () {
    console.log("AccountMenu ++++ MOUNT ");

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
    console.log("AccountMenu ---- UNMOUNT ");

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

  hideModal = () => {
    console.log("AccountMenu on entry to hideModal this.state.isModalVisible: " + this.state.isModalVisible );
    this.setState({ isModalVisible: false });
    this.props.toggleFunction();
  }

  signOutAndHideAccountMenu () {
    console.log("AccountMenu signOutAndHideAccountMenu() removing twitter and facebook authentication data");
    VoterSessionActions.voterSignOut();
    this.hideModal();
  }

  routeToTermsOfService () {
    Actions.termsOfService({came_from: RouteConst.KEY_SIGNIN});
  }

  render () {
    logging.renderLog("AccountMenu scene = " + Actions.currentScene + ",  this.state.isModalVisible: " + this.state.isModalVisible);

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
      <View style={{flex: 0}}
      //       onLayout={(event) => {
      //         var {x, y, width, height} = event.nativeEvent.layout;
      //         console.log("Outermost View = " + Math.floor(x) + ", y = " + Math.floor(y) + ", width = " + Math.floor(width) + ", height = " + Math.floor(height));
      // }}
      >
        <Modal
          animationIn='fadeInDown'
          animationOut='fadeOut'
          hideOnBackdropPress
          visible={this.state.isModalVisible}
          onRequestClose={() => {() => this.props.toggleFunction}}
          backdropOpacity={1}
          style={{
            flex: 0,
            left: 18,
            top: 36,
            borderColor: 'rgba(0,0,0,0.2)', borderWidth: 2,
            backgroundColor: 'white',
          }}
        >
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
              <Text style={styles.modalChoiceDummy}>About We Vote</Text>
              <Text style={styles.modalChoiceDummy}>Donate</Text>
            </View>
            <View style={{flex: 0, flexDirection: 'row', paddingTop: 10}} >
              <TouchableOpacity onPress={this.routeToTermsOfService.bind(this)}>
                <Text style={styles.modalChoicesSmall}>Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {() => console.log("PRIVACY POLICY PRESSED")}} >
                <Text style={styles.modalChoicesSmall}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

