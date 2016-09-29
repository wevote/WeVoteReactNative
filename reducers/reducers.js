import {combineReducers} from 'redux'

const REQUEST_BALLOT = 'REQUEST_BALLOT';
const RECEIVE_BALLOT = 'RECEIVE_BALLOT';
const REQUEST_API_KEY = 'REQUEST_API_KEY';
const RECEIVE_API_KEY = 'RECEIVE_API_KEY';
const RECEIVE_STARRED_STATUS = 'RECEIVE_STARRED_STATUS';

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
  ballots: {},
  isFetchingBallot: false,
}, action) {
  switch(action.type) {
    case RECEIVE_BALLOT:
    ballot(state.ballots, action)
      return Object.assign({}, state, {
        ballots: ballot(state.ballots, action)
      });
    case REQUEST_BALLOT:
      return Object.assign({}, state, {
        isFetchingBallot: true
      });
    case RECEIVE_STARRED_STATUS:
      return Object.assign({}, state, {
        ballots: ballot(state.ballots, action)
      });
    default:
      return state;
  }
}

function ballot(state = {
  ballotItems: {},
  starred: {}
}, action) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      items = {};
      for(var i = 0; i < action.ballot.length; i++) {
        prevState = state.ballotItems;
        ind = action.ballot[i].we_vote_id;
        prevState = (state.ballotItems === undefined) ? {}: prevState[ind];
        items[action.ballot[i].we_vote_id] = ballotItem(prevState, action, action.ballot[i]);
      }
      return Object.assign({}, state, {ballotItems: items});
    case RECEIVE_STARRED_STATUS:
      prevState = state.starred;
      ind = action.we_vote_id;
      prevState = (state.starred === undefined) ? {}: prevState[ind];
      tempItem = ballotItemStarred(prevState, action)
      starObj = Object.assign({}, state.starred, {[action.we_vote_id]: tempItem})
      return Object.assign({}, state, {starred: starObj});
    /*case RECEIVE_BALLOT:
      ballot = action.ballot.map((item) => {
        currItem = state.find((prevItem) => prevItem.we_vote_id == item.we_vote_id);
        return ballotItem(currItem, action, item);
      });
      return Object.assign([],state,ballot);*/
    default:
      return state;
    }
}


function ballotItem(state = {
},action, item) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      return Object.assign({}, state, {item});
    default:
      return state;
  }

}


function ballotItemStarred(state = {
  isStarred: false
}, action) {
  switch(action.type) {
    case RECEIVE_STARRED_STATUS:
      return Object.assign({}, state, {
        isStarred: action.isStarred
      })
    default:
      return state;
  }


}





const app = combineReducers({
  user,ballotList
});

export default app;
