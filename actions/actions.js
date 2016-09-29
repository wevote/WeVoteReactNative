import {getFetch} from './FetchAPIHelper'

const REQUEST_BALLOT = 'REQUEST_BALLOT';
const RECEIVE_BALLOT = 'RECEIVE_BALLOT';

const REQUEST_API_KEY = 'REQUEST_API_KEY';
const RECEIVE_API_KEY = 'RECEIVE_API_KEY';

const REQUEST_STARRED_STATUS = 'REQUEST_STARRED_STATUS';
const RECEIVE_STARRED_STATUS = 'RECEIVE_STARRED_STATUS';
const SET_STARRED_STATUS = 'SET_STARRED_STATUS';

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
  return {
    type: REQUEST_BALLOT
  }
}

export function fetchBallot(apiKey) {

  return (dispatch, getState) => {
    dispatch(requestBallot());
    return getFetch(REQUEST_BALLOT, apiKey)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveBallot(json));
        dispatch(getStarredStatus(json));
      })
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
  if(ballot.length == 0 || Object.getOwnPropertyNames(ballot).length == 0) {
    return true;
  } else if(state.ballotList.isFetchingBallot) {
       return false;
  } else {
    return false;
  }
}

export function requestBallotIfNeeded(){
  return (dispatch, getState) => {
    if(shouldRequestBallot(getState())){
        return dispatch(fetchBallot(getState().user.apiKey));
    }

  }
}



export function fetchBallotStarredStatus(apiKey, item) {
  return (dispatch, getState) => {
    return getFetch(REQUEST_STARRED_STATUS, apiKey, item)
      .then(response => response.json())
      .then(json => dispatch(receiveStarredStatus(json)))
  }

}

export function requestBallotItemStarredStatus(item) {
  return (dispatch, getState) => {
      return dispatch(fetchBallotStarredStatus(getState().user.apiKey, item));
  }
}


export function receiveStarredStatus(json) {
  return {
    type: RECEIVE_STARRED_STATUS,
    we_vote_id: json.ballot_item_we_vote_id,
    isStarred: json.is_starred
  }
}

export function getStarredStatus(json) {
  return (dispatch, getState) => {
    ballot = json.ballot_item_list;
    for(var i = 0; i < ballot.length; i++) {
      dispatch(requestBallotItemStarredStatus(ballot[i]));
    }
  }
}


export function setStarredStatus(item, starred) {
  return(dispatch, getState) => {
    ballotItem = {
        starred,
        ...item,
    }
    return getFetch(SET_STARRED_STATUS, getState().user.apiKey, ballotItem)
      .then(response => response.json())
      .then(json => dispatch(receiveStarredStatus({ballot_item_we_vote_id:item.we_vote_id,is_starred:!starred})))
  }

}
