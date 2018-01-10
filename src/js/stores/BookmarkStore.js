import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';

class BookmarkStore extends ReduceStore {

  getInitialState () {
    return {
      success: true,
    };
  }

  getBookmark (ballot_item_we_vote_id) {
    // console.log("getBookmark, getState: ", this.getState());
    return this.getState()[ballot_item_we_vote_id];
  }

  reduce (state, action) {
    // Exit if we don't have a successful response (since we expect certain variables in a successful response below)
    if (!action.res || !action.res.success) {
      return {
        ...state
      };
    }

    let ballot_item_we_vote_id = action.res.ballot_item_we_vote_id;

    switch (action.type) {

      case "voterAllBookmarksStatusRetrieve":
        console.log("BookmarkStore::voterAllBookmarksStatusRetrieve, action.res: ", action.res);
        action.res.bookmark_list.forEach(one_bookmark =>{
          console.log("one_bookmark: ", one_bookmark);
          if (one_bookmark) {
            state.set(one_bookmark.ballot_item_we_vote_id, one_bookmark.bookmark_on);
          }
        });
        return {
          ...state
        };

      case "voterBookmarkOnSave":
        console.log("BookmarkStore::voterBookmarkOnSave");
        state.set(ballot_item_we_vote_id, true);
        return {
          ...state
        };

      case "voterBookmarkOffSave":
        console.log("BookmarkStore::voterBookmarkOffSave");
        state.set(ballot_item_we_vote_id, false);
        return {
          ...state
        };

      case "error-BookmarkRetrieve" || "error-voterBookmarkOnSave" || "error-voterBookmarkOnSave":
        console.log("BookmarkStore::error-BookmarkRetrieve");
        console.log(action.res);
        return {
          ...state
        };

      default:
        // console.log("BookmarkStore::default");
        return {
          ...state
        };
    }
  }
}

export default new BookmarkStore(Dispatcher);
