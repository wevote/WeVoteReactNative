import BallotService from '../../services/BallotService'
export const RECEIVE_BALLOT = "RECEIVE_BALLOT";
export const RECEIVE_BALLOT_ITEM_INFO = "RECEIVE_BALLOT_ITEM_INFO";
import Dispatcher from "../dispatcher/Dispatcher";

export default fetchBallotItemInfo = (type, id) => {
  return (dispatch, state) => {
    BallotService.getBallotItemInfo(type, id).then((data) => {
      dispatch(receiveBallotItemInfo(data));
    });
  };
}

export const receiveBallotItemInfo = (data) => {
  return {
    type: RECEIVE_BALLOT_ITEM_INFO,
    data
  };
}

module.exports = {

  voterBallotItemsRetrieve: function (google_civic_election_id = 0) {
    Dispatcher.loadEndpoint("voterBallotItemsRetrieve", { use_test_election: false, google_civic_election_id: google_civic_election_id });
  },

  voterBallotListRetrieve: function () {
    Dispatcher.loadEndpoint("voterBallotListRetrieve");
  }
};