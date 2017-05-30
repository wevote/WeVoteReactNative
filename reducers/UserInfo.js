import {ADD_SUPPORTED_ITEM, REMOVE_SUPPORTED_ITEM, ADD_OPPOSED_ITEM, REMOVE_OPPOSED_ITEM, ADD_BOOKMARKED_ITEM, REMOVE_BOOKMARKED_ITEM, USER_CREATED} from '../actions/UserActions'

export default function UserSupportedBallotItem(state = {supportedItems: []}, action){
  switch(action.type) {
    case ADD_SUPPORTED_ITEM:
      return {...state, supportedItems: [...state.supportedItems, action.data.id]};
    case REMOVE_SUPPORTED_ITEM:
      let arr = this.state.supportedItems.filter((item) => item !== action.data.id);
      return {...state, supportedItems: arr};
   default:
      return state;
  }
}


export function UserOpposedBallotItem(state = {opposedItems: []}, action){
  switch(action.type) {
    case ADD_OPPOSED_ITEM:
      return {...state, opposedItems: [...state.supportedItems, action.data.id]}
    case REMOVE_OPPOSED_ITEM:
      let arr = this.state.opposedItems.filter((item) => item !== action.data.id);
      return {...state, opposedItems: arr}
    default:
      return state;
  }
}


export function UserBookmarkedItems(state = {bookmarkedItems: []}, action){
  switch(action.type) {
    case ADD_BOOKMARKED_ITEM:
      return {...state, bookmarkedItems: [...state.bookmarkedItems, action.data.id]};
    case REMOVE_BOOKMARKED_ITEM:
      let arr = this.state.bookmarkedItems.filter((item) => item !== action.data.id);
      return {...state, bookmarkedItems: arr};
    default:
      return state;
  }
}

export function User(state = {userId: "", loggedIn: false, error: null}, action) {
  switch(action.type) {
    case USER_CREATED:
      return {...state, userId: action.data.voter_device_id, loggedIn: true}
    default:
      return state;
  }
}
