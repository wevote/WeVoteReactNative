import Dispatcher from "../dispatcher/Dispatcher";
import FriendActions from "../actions/FriendActions";
import VoterActions from "../actions/VoterActions";
import VoterSessionActions from "../actions/VoterSessionActions";
import FacebookConstants from "../constants/FacebookConstants";
const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
const web_app_config = require("../config");
// Including FacebookStore causes problems in the WebApp, and again in the Native App


module.exports = {
  // TODO Convert this to sign out of just Facebook
  appLogout: function (){
    VoterSessionActions.voterSignOut();  // This deletes the device_id cookie
    VoterActions.voterRetrieve();
    VoterActions.voterEmailAddressRetrieve();
  },

  disconnectFromFacebook: function () {
      // Removing connection between We Vote and Facebook
      Dispatcher.dispatch({
          type: FacebookConstants.FACEBOOK_SIGN_IN_DISCONNECT,
          data: true
      });
  },

  facebookDisconnect: function (){
    Dispatcher.loadEndpoint("facebookDisconnect");
  },

  facebookFriendsAction: function () {
    Dispatcher.loadEndpoint("facebookFriendsAction", {});
    FriendActions.suggestedFriendList();
  },

  getFacebookData: function (accessToken) {
    Dispatcher.dispatch({
      type: FacebookConstants.FACEBOOK_ACCESS_TOKEN,
      data: accessToken
    });

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name,cover,picture'
          }
        }
      },
      this.facebookApiCallbackData
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  },

  facebookApiCallbackData (error: ?Object, response: ?Object) {
    if (error) {
      console.log('facebookApiCallbackData returned an error: ' + error.message);
    } else {
      Dispatcher.dispatch({
        type: FacebookConstants.FACEBOOK_RECEIVED_DATA,
        data: response
      });
    }
  },

  // Save incoming data from Facebook
  // For offsets, see https://developers.facebook.com/docs/graph-api/reference/cover-photo/
  voterFacebookSignInData: function (data) {
    console.log("FacebookActions voterFacebookSignInData, data:", data);
    let background = false;
    let offset_x = false;
    let offset_y = false;
    let profile_image = false;
    if (data.cover && data.cover.source) {
      background = data.cover.source;
      offset_x = data.cover.offset_x;  // zero is a valid value so can't use the short-circuit operation " || false"
      offset_y = data.cover.offset_y;  // zero is a valid value so can't use the short-circuit operation " || false"
    }
    if (data.picture && data.picture.data && data.picture.data.url ) {
      profile_image = data.picture.data.url
    }

    Dispatcher.loadEndpoint("voterFacebookSignInSave", {
      facebook_user_id: data.id || false,
      facebook_email: data.email || false,
      facebook_first_name: data.first_name || false,
      facebook_middle_name: data.middle_name || false,
      facebook_last_name: data.last_name || false,
      facebook_profile_image_url_https: profile_image,
      facebook_background_image_url_https: background,
      facebook_background_image_offset_x: offset_x,
      facebook_background_image_offset_y: offset_y,
      save_auth_data: false,
      save_profile_data: true,
    });
  },

  // October 2017, not yet ported to native way of doing it.  See getFacebookData
  getFacebookInvitableFriendsList: function (picture_width, picture_height) {
    let fb_api_for_invitable_friends = `/me?fields=invitable_friends.limit(1000){name,id,picture.width(${picture_width}).height(${picture_height})}`;
    window.FB.api(fb_api_for_invitable_friends, (response) => {
      console.log("getFacebookInvitableFriendsList", response);
      Dispatcher.dispatch({
          type: FacebookConstants.FACEBOOK_RECEIVED_INVITABLE_FRIENDS,
          data: response
      });
    });
  },

  // October 2017, not yet ported to native way of doing it.  See getFacebookData
  readFacebookAppRequests: function () {
    let fb_api_for_reading_app_requests = "me?fields=apprequests.limit(10){from,to,created_time,id}";
    window.FB.api(fb_api_for_reading_app_requests, (response) => {
      console.log("readFacebookAppRequests", response);
      Dispatcher.dispatch({
          type: FacebookConstants.FACEBOOK_READ_APP_REQUESTS,
          data: response
      });
    });
  },

  // October 2017, not yet ported to native way of doing it.  See getFacebookData
  deleteFacebookAppRequest: function (requestId) {
    console.log("deleteFacebookAppRequest requestId: ", requestId);
    window.FB.api(requestId, "delete", (response) => {
      console.log("deleteFacebookAppRequest response", response);
       Dispatcher.dispatch({
          type: FacebookConstants.FACEBOOK_DELETE_APP_REQUEST,
          data: response
       });
    });
  },

  // Save incoming auth data from Facebook
  voterFacebookSignInAuth: function (data) {
    console.log("FacebookActions voterFacebookSignInAuth");
    Dispatcher.loadEndpoint("voterFacebookSignInSave", {
      facebook_access_token: data.facebook_access_token || false,
      facebook_user_id: data.userId || false,
      facebook_expires_in: data.expiresIn || false,
      facebook_signed_request: "Native App Authentication",
      save_auth_data: true,
      save_profile_data: false
    });
  },

  voterFacebookSignInRetrieve: function (){
    Dispatcher.loadEndpoint("voterFacebookSignInRetrieve", {
    });
  },

  voterFacebookSignInConfirm: function (){
    Dispatcher.loadEndpoint("voterFacebookSignInRetrieve", {
    });
  },
};

export default [];