import Dispatcher from "../dispatcher/Dispatcher";
import CookieStore from "../stores/CookieStore";

module.exports = {
  voterSignOut: function (){
    Dispatcher.loadEndpoint("voterSignOut", {sign_out_all_devices: false});
    CookieStore.removeItem("voter_device_id");
    CookieStore.removeItem("voter_orientation_complete");
  },

  setVoterDeviceIdCookie (id) {
    console.log("VoterSessionActions Setting new voter_device_id to ", id );
    CookieStore.setItem("voter_device_id", id);
  }
};
