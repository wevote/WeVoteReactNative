import {combineReducers} from 'redux'

const REQUEST_BALLOT = 'REQUEST_BALLOT';
const RECEIVE_BALLOT = 'RECEIVE_BALLOT';
const REQUEST_API_KEY = 'REQUEST_API_KEY';
const RECEIVE_API_KEY = 'RECEIVE_API_KEY';

function user(state = {apiKey: '', location: '', loggedIn: false, isLoggingIn: false}, action) {

  switch(action.type) {
    case RECEIVE_API_KEY:
      return Object.assign({}, state, {
        apiKey: action.apiKey,
        loggedIn: true,
        loggingIn: false
      });
    case REQUEST_API_KEY:
      return Object.assign({}, state, {
        loggingIn: true
      })
    default:
      return state;
  }
}



function ballotList(state = {
  ballots: [],
  isFetchingBallot: false,
}, action) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      return Object.assign({}, state, {
        ballots: ballot(state.ballots, action)
      });
    case REQUEST_BALLOT:
      return Object.assign({}, state, {
        isFetchingBallot: true
      });
    default:
      return state;
  }
}

function ballot(state = [], action) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      ballot = action.ballot.map((item) => {
        currItem = state.find((prevItem) => prevItem.we_vote_id == item.we_vote_id);
        return ballotItem(currItem, action, item);
      });
      return Object.assign([],state,ballot);
    default:
      return state;
    }
}


function ballotItem(state = {
  info: {},
  isBookmarked: false,
  support: undefined
},action, item) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      return Object.assign({}, state, {
        info: item
      });
    default:
      return state;
  }

}


const app = combineReducers({
  user,ballotList
});

export default app;
