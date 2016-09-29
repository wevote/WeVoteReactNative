const REQUEST_BALLOT = 'REQUEST_BALLOT';

const REQUEST_STARRED_STATUS = 'REQUEST_STARRED_STATUS';

const REQUEST_API_KEY = 'REQUEST_API_KEY';

const BASE_URL = "https://api.wevoteusa.org/apis/v1/";

const SET_STARRED_STATUS = "SET_STARRED_STATUS";

var baseGetFetchObj = {
  method: 'GET',
  headers: {
    'ACCEPT': 'application/json',
    'Content-Type': 'application/json',
    'Host': 'api.wevoteusa.org',
    'Authorization': ''
  }
}


export function getFetch(action, apiKey, item){

  switch(action) {
    case REQUEST_BALLOT:
      return fetch(BASE_URL + "voterAddressSave?voter_device_id=" + apiKey + "&text_for_map_search=" + "Palo Alto", baseGetFetchObj);
    case REQUEST_API_KEY:
      return fetch(BASE_URL + 'voterRetrieve', baseGetFetchObj);
    case REQUEST_STARRED_STATUS:
      return fetch(BASE_URL + "voterStarStatusRetrieve?voter_device_id=" + apiKey + "&kind_of_ballot_item=" + item.kind_of_ballot_item + "&ballot_item_we_vote_id=" + item.we_vote_id, baseGetFetchObj);
    case SET_STARRED_STATUS:
      var api = (item.isStarred)? "voterStarOffSave": "voterStarOnSave";
      return fetch(BASE_URL + api + "?voter_device_id=" + apiKey + "&kind_of_ballot_item=" + item.kind_of_ballot_item + "&ballot_item_we_vote_id=" + item.we_vote_id, baseGetFetchObj);
    default:
      return null;
  }

}
