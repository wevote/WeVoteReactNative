import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import CandidateActions from "../actions/CandidateActions";
import OrganizationActions from "../actions/OrganizationActions";
import TwitterActions from "../actions/TwitterActions";
import VoterActions from "../actions/VoterActions";

export default class TwitterStore extends ReduceStore {

  getInitialState () {
    return {
      success: true,
    };
  }

  get () {
    return {
      kind_of_owner: this.getState().kind_of_owner || "",
      owner_we_vote_id: this.getState().owner_we_vote_id || "",
      twitter_handle: this.getState().twitter_handle || "",
      twitter_description: this.getState().twitter_description || "",
      twitter_followers_count: this.getState().twitter_followers_count || "",
      twitter_name: this.getState().twitter_name || "",
      twitter_photo_url: this.getState().twitter_photo_url || "",
      twitter_user_website: this.getState().twitter_user_website || "",
      status: this.status || "",
      voter_device_id: this.getState().voter_device_id || "",
      twitter_handle_found: this.getState().twitter_handle_found || "",
      twitter_secret_key: this.getState().twitter_secret_key || "",
      existing_twitter_account_found: this.getState().existing_twitter_account_found || "",
      twitter_profile_image_url_https: this.getState().twitter_profile_image_url_https || "",
      twitter_retrieve_attempted: this.getState().twitter_retrieve_attempted || "",
      twitter_sign_in_failed: this.getState().twitter_sign_in_failed || "",
      twitter_sign_in_found: this.getState().twitter_sign_in_found || "",
      twitter_sign_in_verified: this.getState().twitter_sign_in_verified || "",
      voter_has_data_to_preserve: this.getState().voter_has_data_to_preserve || "",
      voter_we_vote_id: this.getState().voter_we_vote_id || "",
      voter_we_vote_id_attached_to_twitter: this.getState().voter_we_vote_id_attached_to_twitter || "",
      we_vote_hosted_profile_image_url_large: this.getState().we_vote_hosted_profile_image_url_large || "",
      we_vote_hosted_profile_image_url_medium: this.getState().we_vote_hosted_profile_image_url_medium || "",
      we_vote_hosted_profile_image_url_tiny: this.getState().we_vote_hosted_profile_image_url_tiny || "",
    };
  }

  get kindOfOwner (){
    return this.getState().kind_of_owner;
  }

  get ownerWeVoteId (){
    return this.getState().owner_we_vote_id;
  }

  get twitterHandle (){
    return this.getState().twitter_handle;
  }

  getTwitterHandle (){
    return this.getState().twitter_handle;
  }

  get status (){
    return this.getState().status;
  }

  getTwitterAuthResponse () {
    return {
      twitter_retrieve_attempted: this.getState().twitter_retrieve_attempted,
      twitter_sign_in_found: this.getState().twitter_sign_in_found,
      twitter_sign_in_verified: this.getState().twitter_sign_in_verified,
      twitter_sign_in_failed: this.getState().twitter_sign_in_failed,
      twitter_secret_key: this.getState().twitter_secret_key,
      twitter_profile_image_url_https: this.getState().twitter_profile_image_url_https,
      voter_has_data_to_preserve: this.getState().voter_has_data_to_preserve,
      existing_twitter_account_found: this.getState().existing_twitter_account_found,
      voter_we_vote_id_attached_to_twitter: this.getState().voter_we_vote_id_attached_to_twitter,
    };
  }

  reduce (state, action) {
    // Exit if we don't have a successful response (since we expect certain variables in a successful response below)
    // if (!action.res || !action.res.success) {
    //   console.log("exited in twitter store: " + action.type + " : " + action.res.status);
    //   if(action.type === "twitterSignInRetrieve" )
    //     console.log("BAD!  Í exited in twitter store: " + action.type + " : " + action.res.status);
    //   return state;
    // }

    switch (action.type) {

      case "twitterIdentityRetrieve":
        console.log("TwitterStore::twitterIdentityRetrieve, action.res:", action.res);
        if (action.res.kind_of_owner === "ORGANIZATION") {
          OrganizationActions.organizationRetrieve(action.res.owner_we_vote_id);
        } else if (action.res.kind_of_owner === "CANDIDATE") {
          CandidateActions.candidateRetrieve(action.res.owner_we_vote_id);
          CandidateActions.positionListForBallotItem(action.res.owner_we_vote_id);
        }

        state.kind_of_owner = action.res.kind_of_owner;
        state.owner_we_vote_id = action.res.owner_we_vote_id;
        state.twitter_handle = action.res.twitter_handle;
        state.twitter_description = action.res.twitter_description;
        state.twitter_followers_count = action.res.twitter_followers_count;
        state.twitter_name = action.res.twitter_name;
        state.twitter_photo_url = action.res.twitter_photo_url;
        state.twitter_user_website = action.res.twitter_user_website;
        state.status = action.res.status;
        return {
          ...state
        };

      case "twitterNativeSignInSave":
        console.log("TwitterStore::twitterNativeSignInSave, action.res:", action.res);
        if (action.res.success) {
          TwitterActions.twitterSignInRetrieve();
        }

        return {
          //...state,
          voter_device_id: action.res.voter_device_id,
          twitter_handle: action.res.twitter_handle,
          twitter_handle_found: action.res.twitter_handle_found,
          twitter_secret_key: action.res.twitter_secret_key,
        };

        // state.voter_device_id = action.res.voter_device_id;
        // state.twitter_handle = action.res.twitter_handle;
        // state.twitter_handle_found = action.res.twitter_handle_found;
        // state.twitter_secret_key = action.res.twitter_secret_key;
        // return state;

      case "twitterSignInRetrieve":
        console.log("TwitterStore::twitterSignInRetrieve, action.res:", action.res);
        if (action.res.twitter_sign_in_verified) {
          VoterActions.voterRetrieve();
          VoterActions.twitterRetrieveIdsIfollow();
        }
        state.existing_twitter_account_found = action.res.existing_twitter_account_found;
        state.twitter_profile_image_url_https = action.res.twitter_profile_image_url_https;
        state.twitter_retrieve_attempted = action.res.twitter_retrieve_attempted;
        state.twitter_secret_key = action.res.twitter_secret_key;
        state.twitter_sign_in_failed = action.res.twitter_sign_in_failed;
        state.twitter_sign_in_found = action.res.twitter_sign_in_found;
        state.twitter_sign_in_verified = action.res.twitter_sign_in_verified;
        state.voter_device_id = action.res.voter_device_id;
        state.voter_has_data_to_preserve = action.res.voter_has_data_to_preserve;
        state.voter_we_vote_id = action.res.voter_we_vote_id;
        state.voter_we_vote_id_attached_to_twitter = action.res.voter_we_vote_id_attached_to_twitter;
        state.we_vote_hosted_profile_image_url_large = action.res.we_vote_hosted_profile_image_url_large;
        state.we_vote_hosted_profile_image_url_medium = action.res.we_vote_hosted_profile_image_url_medium;
        state.we_vote_hosted_profile_image_url_tiny = action.res.we_vote_hosted_profile_image_url_tiny;
        return {
          ...state
        };

      case "twitterSignInForget":
        // console.log("TwitterStore::twitterSignInForget");
        state.existing_twitter_account_found = false;
        state.twitter_profile_image_url_https = '';
        state.twitter_retrieve_attempted = false;
        state.twitter_secret_key = '';
        state.twitter_sign_in_failed = false;
        state.twitter_sign_in_found = false;
        state.twitter_sign_in_verified = false;
        state.voter_device_id = '';
        state.voter_has_data_to_preserve = false;
        state.voter_we_vote_id = '';
        state.voter_we_vote_id_attached_to_twitter = false;
        state.we_vote_hosted_profile_image_url_large = '';
        state.we_vote_hosted_profile_image_url_medium = '';
        state.we_vote_hosted_profile_image_url_tiny = '';
        return {
          ...state
        };


      default:
        return {
          ...state
        };
    }
  }
}

module.exports = new TwitterStore(Dispatcher);
