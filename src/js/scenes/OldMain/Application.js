import React, { Component, PropTypes } from "react";
import { View, Text } from "react-native";
//import BallotSideBar from "./components/Navigation/BallotSideBar";
import FriendActions from "../../actions/FriendActions";
//import HeaderBar from "./components/Navigation/HeaderBar";
//import HeaderGettingStartedBar from "./components/Navigation/HeaderGettingStartedBar";
//import Headroom from "headroom.js";
import BookmarkActions from "../../actions/BookmarkActions";
import VoterActions from "../../actions/VoterActions";
import VoterStore from "../../stores/VoterStore";
//const web_app_config = require("./config");

var loadingScreenStyles = {
  position: "fixed",
  height: "100vh",
  width: "100vw",
  display: "flex",
  top: 0,
  left: 0,
  backgroundColor: "#337ec9",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px",
  color: "#fff",
  flexDirection: "column"
};

export default class Application extends Component {
  static propTypes = {
    children: PropTypes.element,
    route: PropTypes.object,
    location: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = {};
    this.loadedHeader = false;
    this.initFacebook();
  }

//  initFacebook (){
//    window.fbAsyncInit = function () {
//      window.FB.init({
//        appId: web_app_config.FACEBOOK_APP_ID,
//        xfbml: true,
//        version: "v2.8",
//        status: true    // set this status to true, this will fixed popup blocker issue
//      });
//    };
//
//    (function (d, s, id){
//       var js;
//       var fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) {return;}
//       js = d.createElement(s); js.id = id;
//       js.src = "//connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, "script", "facebook-jssdk"));
//  }

  componentDidMount () {
    let voter_device_id = VoterStore.voterDeviceId();
    VoterActions.voterRetrieve();
    // console.log("Application, componentDidMount, voter_device_id:", voter_device_id);
    if (voter_device_id && voter_device_id !== "") {
      VoterActions.voterEmailAddressRetrieve();
      BookmarkActions.voterAllBookmarksStatusRetrieve();
      FriendActions.friendInvitationsSentToMe();
    }
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.voterStoreListener.remove();
    this.loadedHeader = false;
  }

//  componentDidUpdate () {
//    if (this.loadedHeader) return;
//    if (!this.refs.pageHeader) return;
//
//    // Initialize headroom element
//    new Headroom(this.refs.pageHeader, {
//      "offset": 20,
//      "tolerance": 1,
//      "classes": {
//        "initial": "headroom--animated",
//        "pinned": "headroom--slide-down",
//        "unpinned": "headroom--slide-up"
//      }
//    }).init();
//
//    this.loadedHeader = true;
//  }

  _onVoterStoreChange () {
    this.setState({
      voter: VoterStore.getVoter(),
      text_for_map_search: VoterStore.getTextForMapSearch()
    });
  }

  render () {
      <View>
        <Text> -----------------Test----------------</Text>
      </View>
  }
}
