import BallotService from '../services/BallotService'
export const RECEIVE_BALLOT = "RECEIVE_BALLOT";
export const RECEIVE_BALLOT_ITEM_INFO = "RECEIVE_BALLOT_ITEM_INFO";

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
