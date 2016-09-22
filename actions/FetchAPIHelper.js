const REQUEST_BALLOT = 'REQUEST_BALLOT';
const RECEIVE_BALLOT = 'RECEIVE_BALLOT';

const REQUEST_API_KEY = 'REQUEST_API_KEY';
const RECEIVE_API_KEY = 'RECEIVE_API_KEY';
const BASE_URL = "https://api.wevoteusa.org/apis/v1/";

var baseGetFetchObj = {
  method: 'GET',
  headers: {
    'ACCEPT': 'application/json',
    'Content-Type': 'application/json',
    'Host': 'api.wevoteusa.org',
    'Authorization': ''
  }
}


export function getFetch(action, apiKey){

  switch(action) {
    case REQUEST_BALLOT:
      return fetch(BASE_URL + "voterAddressSave?voter_device_id=" + apiKey + "&text_for_map_search=" + "Palo Alto", baseGetFetchObj);
    case REQUEST_API_KEY:
      return fetch(BASE_URL + 'voterRetrieve', baseGetFetchObj);
    default:
      return null;
  }

}
