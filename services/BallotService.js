import HTTPService from './HTTPService';


class BallotService {
  OFFICE = "OFFICE";
  MEASURE = "MEASURE";

  getBallotItemInfo(type, itemId){
      const params = {
        kind_of_ballot_item: type,
        ballot_item_we_vote_id: itemId,
      };
      return HTTPService.get("ballotItemRetrieve", params).then((response) => {
        return response.json();
      });
  }

  isOffice(item) {
    return item === this.OFFICE;
  }

getOpinionsForBallotItem(type, itemId) {
  const params = {
    kind_of_ballot_item: type,
    ballot_item_we_vote_id: itemId,
  };
  return HTTPService.get("ballotItemRetrieve", params).then((response) => {
    return response.json();
  });

}
}

export default ballotService = new BallotService();
