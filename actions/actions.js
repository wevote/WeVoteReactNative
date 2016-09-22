import {getFetch} from './FetchAPIHelper'

const REQUEST_BALLOT = 'REQUEST_BALLOT';
const RECEIVE_BALLOT = 'RECEIVE_BALLOT';

const REQUEST_API_KEY = 'REQUEST_API_KEY';
const RECEIVE_API_KEY = 'RECEIVE_API_KEY';

export function requestVoterID() {

  return {
    type: REQUEST_API_KEY
  }
}
export function fetchVoterID() {
    return (dispatch, getState) => {
      dispatch(requestVoterID());
      return getFetch(REQUEST_API_KEY,'')
        .then(response => response.json())
        .then(json => dispatch(receiveVoterID(json)));
    }
}

export function receiveVoterID(json) {

  return {
    type: RECEIVE_API_KEY,
    apiKey: json.voter_device_id
  }


}

export function requestBallot() {
  console.log("REQUEST_BALLOT");
  return {
    type: REQUEST_BALLOT
  }
}

export function fetchBallot(apiKey) {

  return (dispatch, getState) => {
    console.log("fetchBallot");
    dispatch(requestBallot());
    return getFetch(REQUEST_BALLOT, apiKey)
      .then(response => response.json())
      .then(json => dispatch(receiveBallot(json)))
  }

}



export function receiveBallot(json) {
  return {
    type: RECEIVE_BALLOT,
    ballot: json.ballot_item_list
  }
}

export function shouldRequestBallot(state) {

  const ballot = state.ballotList.ballots;
  console.log(ballot.length);
  if(ballot.length == 0) {
    console.log("true");
    return true;
  } else if(state.ballotList.isFetchingBallot) {

       return false;
  } else {
    console.log("false");
    return false;
  }
}

export function requestBallotIfNeeded(){
  console.log("getState()");
  return (dispatch, getState) => {
    if(shouldRequestBallot(getState())){
      console.log("shouldRequestBallot");
        return dispatch(fetchBallot(getState().user.apiKey));
    }

  }


}
