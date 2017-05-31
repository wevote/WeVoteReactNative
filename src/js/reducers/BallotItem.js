import {RECEIVE_BALLOT, RECEIVE_BALLOT_ITEM_INFO} from '../actions/BallotActions'

export default function Ballots(state = {ballotList: null, error: null, fetching: false}, action) {
  switch(action.type) {
    case RECEIVE_BALLOT:
      return {...state, ballotList: action.data.ballot_item_list};
    default:
      return state;
  }
}

export function BallotItemInfo(state = {ballotItems: null, fetching: false}, action) {
  switch(action.type) {
    case RECEIVE_BALLOT_ITEM_INFO:
      return {...state, ballotItems: {...state.ballotItems, [action.data.we_vote_id]: action.data}, fetching:false};
    default:
      return state;
  }
}
