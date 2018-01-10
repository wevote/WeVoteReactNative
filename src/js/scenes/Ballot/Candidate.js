import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import AnalyticsActions from "../../actions/AnalyticsActions";
import { Actions } from 'react-native-router-flux';
import CandidateActions from "../../actions/CandidateActions";
import CandidateItem from "../../components/Ballot/CandidateItem";
import CandidateStore from "../../stores/CandidateStore";
import { capitalizeString } from "../../utils/textFormat";
import LoadingWheel from "../../components/LoadingWheel";
import OrganizationActions from "../../actions/OrganizationActions";
import SupportActions from "../../actions/SupportActions";
//import PositionList from "../../components/Ballot/PositionList";
//import GuideList from "../../components/VoterGuide/GuideList";
//import ThisIsMeAction from "../../components/Widgets/ThisIsMeAction";
import VoterGuideActions from "../../actions/VoterGuideActions";
import VoterGuideStore from "../../stores/VoterGuideStore";
import VoterStore from "../../stores/VoterStore";
import SearchAllActions from "../../actions/SearchAllActions";
import styles from "../../stylesheets/components/baseStyles"


import { default as webAppConfig } from '../../config';
const logging = require("../../utils/logging");

export default class Candidate extends Component {
  static propTypes = {
    //params: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      candidate: {},
      waiting_for_candidate: false,
      candidate_we_vote_id: this.props.candidate_we_vote_id,
      position_list_from_advisers_followed_by_voter: [],
      // Eventually we could use this getVoterGuidesToFollowForBallotItemId with candidate_we_vote_id, but we can't now
      //  because we don't always have the ballot_item_we_vote_id for certain API calls like organizationFollow
      // guidesToFollowList: VoterGuideStore.getVoterGuidesToFollowForBallotItemId(this.props.candidate_we_vote_id)
      voter_guides_to_follow_for_latest_ballot_item: [],
    };
  }
  static onEnter = () => {
    logging.rnrfLog("onEnter to Candidate: currentScene = " + Actions.currentScene);
    // React Navigation / RNRF Tabs do not re-render when displayed, so we need this...
    // Actions.refesh() forces componentWillReceiveProps() to be executed
    // Actions.refresh({
    //   entryTime: new Date()
    // });
  };

  static onExit = () => {
    logging.rnrfLog("onExit from Candidate: currentScene = " + Actions.currentScene);
    //Actions.refresh({came_from: 'ballot', forward_to_ballot: false})
  };

  componentWillMount () {
    console.log("Candidate componentDidMount");
    this.candidateStoreListener = CandidateStore.addListener(this.onCandidateStoreChange.bind(this));
    CandidateActions.candidateRetrieve(this.props.candidate_we_vote_id);
    CandidateActions.positionListForBallotItem(this.props.candidate_we_vote_id);

    // Get the latest guides to follow for this candidate
    this.voterGuideStoreListener = VoterGuideStore.addListener(this.onVoterGuideStoreChange.bind(this));
    VoterGuideActions.voterGuidesToFollowRetrieveByBallotItem(this.props.candidate_we_vote_id, "CANDIDATE");

    // Make sure supportProps exist for this Candidate when browser comes straight to candidate page
    SupportActions.retrievePositionsCountsForOneBallotItem(this.props.candidate_we_vote_id);
    OrganizationActions.organizationsFollowedRetrieve();

    // Display the candidate's name in the search box
    var searchBoxText = this.state.candidate.ballot_item_display_name || "";  // TODO DALE Not working right now
    SearchAllActions.exitSearch(searchBoxText); // TODO: still not used :)
    AnalyticsActions.saveActionCandidate(VoterStore.election_id(), this.props.candidate_we_vote_id);
    console.log("Candidate componentDidMount end");
    this.setState({
      candidate_we_vote_id: this.props.candidate_we_vote_id,
      position_list_from_advisers_followed_by_voter: CandidateStore.getPositionList(this.props.candidate_we_vote_id),
      voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem(),
      waiting_for_candidate: true,
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log("Candidate componentWillReceiveProps");
    // When a new candidate is passed in, update this component to show the new data
    if (nextProps.candidate_we_vote_id !== this.state.candidate_we_vote_id) {
      CandidateActions.candidateRetrieve(nextProps.candidate_we_vote_id);
      CandidateActions.positionListForBallotItem(nextProps.candidate_we_vote_id);
      VoterGuideActions.voterGuidesToFollowRetrieveByBallotItem(nextProps.candidate_we_vote_id, "CANDIDATE");
      this.setState({
        candidate_we_vote_id: nextProps.candidate_we_vote_id,
        position_list_from_advisers_followed_by_voter: CandidateStore.getPositionList(nextProps.candidate_we_vote_id),
        voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem(),
      });
    }

    // Display the candidate's name in the search box
    // var { candidate } = this.state;
    // var searchBoxText = candidate.ballot_item_display_name || "";  // TODO DALE Not working right now
    // SearchAllActions.exitSearch("");
  }

  componentWillUnmount () {
    console.log("Candidate componentWillUnmount");
    this.candidateStoreListener.remove();
    this.voterGuideStoreListener.remove();
  }

  onCandidateStoreChange (){
    console.log("Candidate onCandidateStoreChange");
    this.setState({
      candidate: CandidateStore.getCandidate(this.state.candidate_we_vote_id),
      position_list_from_advisers_followed_by_voter: CandidateStore.getPositionList(this.state.candidate_we_vote_id),
      waiting_for_candidate: false,
    });
  }

  onVoterGuideStoreChange (){
    // console.log("Candidate onVoterGuideStoreChange");
    // When the voter_guides_to_follow_for_latest_ballot_item changes, trigger an update of the candidate so we can get an updated position_list
    // CandidateActions.candidateRetrieve(this.state.candidate_we_vote_id);
    // CandidateActions.positionListForBallotItem(this.state.candidate_we_vote_id);
    // // Also update the position count for *just* this candidate, since it might not come back with positionsCountForAllBallotItems
    // SupportActions.retrievePositionsCountsForOneBallotItem(this.state.candidate_we_vote_id);
    // // Eventually we could use this getVoterGuidesToFollowForBallotItemId with candidate_we_vote_id, but we can't now
    // //  because we don't always have the ballot_item_we_vote_id for certain API calls like organizationFollow
    this.setState({
      voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem(),
      // voter_guides_to_follow_for_this_ballot_item: VoterGuideStore.getVoterGuidesToFollowForBallotItemId(this.state.candidate_we_vote_id),
    });
  }

  render () {
    const electionId = VoterStore.election_id();
    const NO_VOTER_GUIDES_TEXT = "We could not find any more voter guides to follow about this candidate.";
    // console.log("Candidate render, this.state.position_list_from_advisers_followed_by_voter: ", this.state.position_list_from_advisers_followed_by_voter);

    if (!this.state.candidate || !this.state.candidate.ballot_item_display_name){
      // TODO DALE If the candidate we_vote_id is not valid, we need to update this with a notice
      // return <View className="container-fluid well u-stack--md u-inset--md">
      //           <View>{LoadingWheel}</View>
      //           <br />
      //       </View>;
      return <LoadingWheel text={'Waiting for Candidate Information'}/>
    }

    let candidate_name = this.state.candidate.ballot_item_display_name;
    let title_text = candidate_name + " - We Vote";
    let description_text = "Information about " + candidate_name + ", candidate for " + this.state.candidate.contest_office_name;
    let voter = VoterStore.getVoter();
    let candidate_admin_edit_url = webAppConfig.WE_VOTE_SERVER_ROOT_URL + "c/" + this.state.candidate.id + "/edit/?google_civic_election_id=" + VoterStore.election_id() + "&state_code=";

    return <View>
        <CandidateItem {...this.state.candidate}
                       position_list={this.state.position_list_from_advisers_followed_by_voter}
                       commentButtonHide
                       contest_office_name={this.state.candidate.contest_office_name}
                       hideOpinionsToFollow
                       showLargeImage
                       showPositionsInYourNetworkBreakdown />
    </View>;
  }
}
