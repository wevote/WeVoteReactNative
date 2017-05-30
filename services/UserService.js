import HTTPService from './HTTPService'
import AuthService from './AuthService'

class UserService {

  createUser() {
      return HTTPService.get("voterRetrieve").then((response) => {
        return response.json();
      });
  }

  saveAddress(address) {
      return AuthService.getUserId().then((data) => {
        const params = {
          text_for_map_search: address,
          voter_device_id: data
        }
        return HTTPService.get("voterAddressSave", params).then((response) => {
          return response.json();
        });
    });
  }

  saveBookmark(type, itemId) {
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterBookmarkOnSave", params).then((response) => {
      return response.json();
    });
  }

  removeBookmark(type, itemId) {
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterBookmarkOffSave", params).then((response) => {
      return response.json();
    });
  }

  checkBookmarkStatus(type, itemId) {
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterBookmarkStatusRetrieve", params).then((response) => {
      return response.json();
    });
  }

  addSupport(type, itemId){
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterSupportingSave", params).then((response) => {
      return response.json();
    });
  }

  removeSupport(type, itemId){
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterStopSupportingSave", params).then((response) => {
      return response.json();
    });
  }

  addOpposition(type, itemId){
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterOpposingSave", params).then((response) => {
      return response.json();
    });
  }

  removeOpposition(type, itemId){
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
    };
    return HTTPService.get("voterStopOpposingSave", params).then((response) => {
      return response.json();
    });
  }

  getPositions(){
    return HTTPService.get("voterAllPositionsRetrieve").then((response) => {
      return response.json();
    });
  }

  addComment(type, itemId, comment){
    const params = {
      kind_of_ballot_item: type,
      ballot_item_we_vote_id: itemId,
      statement: comment,
    };
    return HTTPService.get("voterPositionCommentSave", params).then((response) => {
      return response.json();
    });
  }

}

export default userService = new UserService();
