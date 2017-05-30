import {combineReducers} from 'redux'
import UserSupportedBallotItem, {UserBookmarkedItems, UserOpposedBallotItem, User} from './UserInfo'
import Ballots, {BallotItemInfo} from './BallotItem'

const reducers = combineReducers({
 UserSupportedBallotItem, UserOpposedBallotItem, Ballots, User, UserBookmarkedItems, BallotItemInfo
});

export default reducers;
