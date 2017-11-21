import Dispatcher from "../dispatcher/Dispatcher";
import CookieStore from "../stores/CookieStore";
import TwitterActions from "../actions/TwitterActions"
import FacebookActions from "../actions/FacebookActions"

export default class VoterSessionActions {

  static voterSignOut (){
    // Deleting cookies in native takes a long time, too long to delete and assume it is gone, so we just remove the
    // authentication data from the twitter and facebook stores.
    // CookieStore.removeItem("voter_device_id");
    // Dispatcher.loadEndpoint("voterSignOut", {sign_out_all_devices: false});
    console.log("Signing out of Twitter and Facebook from VoterSessionActions.voterSignOut()");
    FacebookActions.facebookSignInForget();
    TwitterActions.twitterSignInForget();
    CookieStore.removeItem("voter_orientation_complete");  // Not time sensitive, so ok to remove the cookie
  }

  static setVoterDeviceIdCookie (id) {
    console.log("VoterSessionActions Setting new voter_device_id to ", id );
    CookieStore.setItem("voter_device_id", id);
  }
}
