import Dispatcher from "../dispatcher/Dispatcher";
import VoterActions from "../actions/VoterActions";
import VoterSessionActions from "../actions/VoterSessionActions";

export default class TwitterActions {

  static twitterSignInForget () {
    Dispatcher.dispatch({
      type: "twitterSignInForget",
      data: true
    });
  }

  static appLogout (){
    VoterSessionActions.voterSignOut();
    VoterActions.voterRetrieve();
  }

  static twitterIdentityRetrieve (new_twitter_handle) {
    Dispatcher.loadEndpoint("twitterIdentityRetrieve",
      {
        twitter_handle: new_twitter_handle
      });
  }

  static twitterNativeSignInSave (twitter_access_token, twitter_access_token_secret) {
    Dispatcher.loadEndpoint("twitterNativeSignInSave",
      {
        twitter_access_token: twitter_access_token,
        twitter_access_token_secret: twitter_access_token_secret
      });
  }

  static twitterSignInRetrieve () {
    Dispatcher.loadEndpoint("twitterSignInRetrieve", {
    });
  }
}
