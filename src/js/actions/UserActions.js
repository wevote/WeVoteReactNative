export const ADD_SUPPORTED_ITEM = "ADD_SUPPORTED_ITEM";
export const REMOVE_SUPPORTED_ITEM = "REMOVE_SUPPORTED_ITEM";
export const ADD_OPPOSED_ITEM = "ADD_OPPOSED_ITEM";
export const  REMOVE_OPPOSED_ITEM = "REMOVE_OPPOSED_ITEM";
export const ADD_BOOKMARKED_ITEM = "ADD_BOOKMARKED_ITEM";
export const  REMOVE_BOOKMARKED_ITEM = "REMOVE_BOOKMARKED_ITEM";
export const USER_CREATED = "USER_CREATED";
import {RECEIVE_BALLOT} from './BallotActions';

import UserService from '../../services/UserService'
import AuthService from '../../services/AuthService'

export default saveAddress = (address) => {
  return (dispatch, state) => {
    UserService.saveAddress(address).then((data) => {
      dispatch(receiveBallot(data));
    });
  }
}

export const createUser = () => {
  return (dispatch, state) => {
    UserService.createUser().then((data) => {
      AuthService.setUserId(data.voter_device_id);
      dispatch(receiveUser(data));
    })
  }
}

const receiveUser = (data) => {
  return {type: USER_CREATED, data};
}

const receiveBallot = (data) => {
  return {type: RECEIVE_BALLOT, data};
}
