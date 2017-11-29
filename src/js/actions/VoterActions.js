import Dispatcher from "../dispatcher/Dispatcher";

export default class VoterActions {

  static organizationSuggestionTasks (kind_of_suggestion_task, kind_of_follow_task) {
    Dispatcher.loadEndpoint("organizationSuggestionTasks",
      {
        kind_of_suggestion_task: kind_of_suggestion_task,
        kind_of_follow_task: kind_of_follow_task
      });
  }

  static positionListForVoter (show_only_this_election, show_all_other_elections) {
    Dispatcher.loadEndpoint("positionListForVoter",
      {
        show_only_this_election: show_only_this_election,
        show_all_other_elections: show_all_other_elections
      });
  }

  static removeVoterEmailAddress (email_we_vote_id){
    Dispatcher.loadEndpoint("voterEmailAddressSave", {
      email_we_vote_id: email_we_vote_id,
      delete_email: true
    });
  }

  // Send the sign in link to their email address
  sendSignInLinkEmail (voter_email_address){
    Dispatcher.loadEndpoint("voterEmailAddressSave", {
      text_for_email_address: voter_email_address,
      send_link_to_sign_in: true,
      make_primary_email: true
    });
  }

  static sendVerificationEmail (voter_email_we_vote_id){
    Dispatcher.loadEndpoint("voterEmailAddressSave", {
      email_we_vote_id: voter_email_we_vote_id,
      resend_verification_email: true
    });
  }

  static setAsPrimaryEmailAddress (email_we_vote_id){
    Dispatcher.loadEndpoint("voterEmailAddressSave", {
      email_we_vote_id: email_we_vote_id,
      make_primary_email: true
    });
  }

  static twitterRetrieveIdsIfollow () {
    Dispatcher.loadEndpoint("twitterRetrieveIdsIFollow", {});
  }

  static voterAddressRetrieve (id){
    // console.log("VoterActions, voterAddressRetrieve");
    Dispatcher.loadEndpoint("voterAddressRetrieve", { voter_device_id: id});
  }

  static voterEmailAddressRetrieve (){
    Dispatcher.loadEndpoint("voterEmailAddressRetrieve", {});
  }

  static voterAddressSave (text, simple_save = false, google_civic_election_id = 0){
    Dispatcher.loadEndpoint("voterAddressSave", { text_for_map_search: text, simple_save: simple_save, google_civic_election_id: google_civic_election_id});
  }

  static voterEmailAddressSave (voter_email_address, send_link_to_sign_in = false){
    Dispatcher.loadEndpoint("voterEmailAddressSave", {
      text_for_email_address: voter_email_address,
      send_link_to_sign_in: send_link_to_sign_in,
      make_primary_email: true
    });
  }

  static voterEmailAddressSignIn (email_secret_key){
    Dispatcher.loadEndpoint("voterEmailAddressSignIn", {
      email_secret_key: email_secret_key
    });
  }

  static voterEmailAddressSignInConfirm (email_secret_key){
    Dispatcher.loadEndpoint("voterEmailAddressSignIn", {
      email_secret_key: email_secret_key,
      yes_please_merge_accounts: true
    });
  }

  static voterEmailAddressVerify (email_secret_key){
    Dispatcher.loadEndpoint("voterEmailAddressVerify", {
      email_secret_key: email_secret_key
    });
  }

  static voterFacebookSaveToCurrentAccount () {
    Dispatcher.loadEndpoint("voterFacebookSaveToCurrentAccount", {
    });
  }

  static voterTwitterSaveToCurrentAccount () {
    Dispatcher.loadEndpoint("voterTwitterSaveToCurrentAccount", {
    });
  }

  static voterMergeTwoAccountsByEmailKey (email_secret_key) {
    Dispatcher.loadEndpoint("voterMergeTwoAccounts",
      {
        email_secret_key: email_secret_key,
        facebook_secret_key: "",
        invitation_secret_key: "",
        twitter_secret_key: "",
      });
  }

  static voterMergeTwoAccountsByFacebookKey (facebook_secret_key) {
    // console.log("VoterActions, voterMergeTwoAccountsByFacebookKey");
    Dispatcher.loadEndpoint("voterMergeTwoAccounts",
      {
        email_secret_key: "",
        facebook_secret_key: facebook_secret_key,
        invitation_secret_key: "",
        twitter_secret_key: "",
      });
  }

  static voterMergeTwoAccountsByInvitationKey (invitation_secret_key) {
    Dispatcher.loadEndpoint("voterMergeTwoAccounts",
      {
        email_secret_key: "",
        facebook_secret_key: "",
        invitation_secret_key: invitation_secret_key,
        twitter_secret_key: "",
      });
  }

  static voterMergeTwoAccountsByTwitterKey (twitter_secret_key) {
    Dispatcher.loadEndpoint("voterMergeTwoAccounts",
      {
        email_secret_key: "",
        facebook_secret_key: "",
        invitation_secret_key: "",
        twitter_secret_key: twitter_secret_key,
      });
  }

  static voterRetrieve () {
    Dispatcher.loadEndpoint("voterRetrieve");
  }

  static voterNameSave (first_name, last_name) {
    Dispatcher.loadEndpoint("voterUpdate",
      {
        first_name: first_name,
        last_name: last_name
      });
  }

  // Tell the server to only save this name if a name does not currently exist
  static voterFullNameSoftSave (first_name, last_name, full_name = "") {
    Dispatcher.loadEndpoint("voterUpdate",
      {
        first_name: first_name,
        last_name: last_name,
        full_name: full_name,
        name_save_only_if_no_existing_names: true,
      });
  }

  static voterUpdateInterfaceStatusFlags (flag_integer_to_set) {
    Dispatcher.loadEndpoint("voterUpdate",
      {
        flag_integer_to_set: flag_integer_to_set,
      });
  }

  static voterUpdateNotificationSettingsFlags (flag_integer_to_set, flag_integer_to_unset = "") {
    Dispatcher.loadEndpoint("voterUpdate",
      {
        notification_flag_integer_to_set: flag_integer_to_set,
        notification_flag_integer_to_unset: flag_integer_to_unset,
      });
  }

  static voterUpdateRefresh () {
    // Just make sure we have the latest voter data
    Dispatcher.loadEndpoint("voterUpdate",
      {
      });
  }

  static voterRefreshDonations () {
    Dispatcher.loadEndpoint("voterUpdate",
      {
        send_journal_list: true
      });
  }

  static voterSplitIntoTwoAccounts () {
    Dispatcher.loadEndpoint("voterSplitIntoTwoAccounts",
      {
        split_off_twitter: true
      });
  }
}
