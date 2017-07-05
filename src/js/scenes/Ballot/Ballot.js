import React, { Component, PropTypes } from "react";
import {Text,View, Modal, Slider} from 'react-native';
//import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { browserHistory, Link } from "react-router-native";
//import AddressBox from "../../components/AddressBox";
import BallotActions from "../../actions/BallotActions";
//import BallotElectionList from "../../components/Ballot/BallotElectionList";
//import BallotItemCompressed from "../../components/Ballot/BallotItemCompressed";
//import BallotItemReadyToVote from "../../components/Ballot/BallotItemReadyToVote";
//import BallotIntroMission from "../../components/Ballot/BallotIntroMission";
//import BallotIntroFollowIssues from "../../components/Ballot/BallotIntroFollowIssues";
//import BallotIntroFollowAdvisers from "../../components/Ballot/BallotIntroFollowAdvisers";
//import BallotIntroPositionBar from "../../components/Ballot/BallotIntroPositionBar";
import BallotStore from "../../stores/BallotStore";
//import BallotFilter from "../../components/Navigation/BallotFilter";
//import BrowserPushMessage from "../../components/Widgets/BrowserPushMessage";
import GuideActions from "../../actions/GuideActions";
//import GuideList from "../../components/VoterGuide/GuideList";
import GuideStore from "../../stores/GuideStore";
//import Helmet from "react-helmet";
//import ItemSupportOpposeCounts from "../../components/Widgets/ItemSupportOpposeCounts";
//import ItemTinyPositionBreakdownList from "../../components/Position/ItemTinyPositionBreakdownList";
import LoadingWheel from "../../components/LoadingWheel";
//import Slider from "react-slick";
import SupportActions from "../../actions/SupportActions";
import SupportStore from "../../stores/SupportStore";
import VoterStore from "../../stores/VoterStore";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";

const web_app_config = require("../../config");

export default class Ballot extends Component {
  static propTypes = {
      location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {
      candidate_for_modal: {
        guides_to_follow_list: [],
        position_list: []
      },
      measure_for_modal: {
        guides_to_follow_list: [],
        position_list: []
      },
      showCandidateModal: false,
      showBallotIntroModal: false,
      showMeasureModal: false,
      showSelectBallotModal: false,
      showSelectAddressModal: false,
      ballot_election_list: [],
    };
  }

  componentDidMount () {
    if (BallotStore.ballot_properties && BallotStore.ballot_properties.ballot_found === false){ // No ballot found
      browserHistory.push("settings/location");
    } else {
      //if ballot is found
      let ballot = this.getBallot(this.props);
      // console.log(ballot);
      if (ballot != undefined) {
        let ballot_type = this.props.location.query ? this.props.location.query.type : "all";
        this.setState({ballot: ballot, ballot_type: ballot_type});
      }

      // We need a ballotStoreListener here because we want the ballot to display before positions are received
      this.ballotStoreListener = BallotStore.addListener(this._onBallotStoreChange.bind(this));
      // NOTE: voterAllPositionsRetrieve and positionsCountForAllBallotItems are also called in SupportStore when voterAddressRetrieve is received,
      // so we get duplicate calls when you come straight to the Ballot page. There is no easy way around this currently.
      this._toggleCandidateModal = this._toggleCandidateModal.bind(this);
      this._toggleMeasureModal = this._toggleMeasureModal.bind(this);
      this._toggleSelectBallotModal = this._toggleSelectBallotModal.bind(this);
      this._toggleSelectAddressModal = this._toggleSelectAddressModal.bind(this);
      this._next = this._next.bind(this);
      SupportActions.voterAllPositionsRetrieve();
      SupportActions.positionsCountForAllBallotItems();
      BallotActions.voterBallotListRetrieve();
      this.guideStoreListener = GuideStore.addListener(this._onGuideStoreChange.bind(this));
      this.supportStoreListener = SupportStore.addListener(this._onBallotStoreChange.bind(this));
      this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    }
  }

  componentWillUnmount (){
    if (BallotStore.ballot_properties && BallotStore.ballot_properties.ballot_found === false){
      // No ballot found
    } else {
      this.ballotStoreListener.remove();
      this.guideStoreListener.remove();
      this.supportStoreListener.remove();
      this.voterStoreListener.remove();
    }
  }

  componentWillReceiveProps (nextProps){
    let ballot_type = nextProps.location.query ? nextProps.location.query.type : "all";
    this.setState({ballot: this.getBallot(nextProps), ballot_type: ballot_type });
  }

  _onVoterStoreChange () {
    this.setState({
      voter: VoterStore.getVoter(),
      showBallotIntroModal: !VoterStore.getInterfaceFlagState(VoterConstants.BALLOT_INTRO_MODAL_SHOWN),
    });
  }

  _toggleCandidateModal (candidateForModal) {
    if (candidateForModal) {
      GuideActions.retrieveGuidesToFollowByBallotItem(candidateForModal.we_vote_id, "CANDIDATE");
      candidateForModal.guides_to_follow_list = GuideStore.toFollowListForBallotItemById(candidateForModal.we_vote_id);
    }

    this.setState({
      candidate_for_modal: candidateForModal,
      showCandidateModal: !this.state.showCandidateModal
    });
  }

  _toggleBallotIntroModal () {
    if (this.state.showBallotIntroModal) {
      // Saved to the voter record that the ballot introduction has been seen
      VoterActions.voterUpdateStatusFlags(VoterConstants.BALLOT_INTRO_MODAL_SHOWN);
    }
    this.setState({ showBallotIntroModal: !this.state.showBallotIntroModal });
  }

  _toggleMeasureModal (measureForModal) {
    if (measureForModal) {
      GuideActions.retrieveGuidesToFollowByBallotItem(measureForModal.measure_we_vote_id, "MEASURE");
    }
    this.setState({
      measure_for_modal: measureForModal,
      showMeasureModal: !this.state.showMeasureModal
    });
  }

  _toggleSelectBallotModal () {
    this.setState({
      showSelectBallotModal: !this.state.showSelectBallotModal
    });
  }

  _toggleSelectAddressModal () {
    this.setState({
      showSelectAddressModal: !this.state.showSelectAddressModal
    });
  }

  _onBallotStoreChange (){
    if (BallotStore.ballot_properties && BallotStore.ballot_properties.ballot_found && BallotStore.ballot && BallotStore.ballot.length === 0){ // Ballot is found but ballot is empty
      browserHistory.push("ballot/empty");
      console.log("_onBallotStoreChange: ballot is empty");
    } else {
      let ballot_type = this.props.location.query ? this.props.location.query.type : "all";
      this.setState({ballot: this.getBallot(this.props), ballot_type: ballot_type });
    }
    this.setState({ ballot_election_list: BallotStore.ballotList() });
  }

  _onGuideStoreChange (){
    // Update the data for the modal to include the position of the organization related to this ballot item
    if (this.state.candidate_for_modal) {
      this.setState({
        candidate_for_modal: {
          ...this.state.candidate_for_modal,
          guides_to_follow_list: GuideStore.toFollowListForBallotItem()
        }
      });
    } else if (this.state.measure_for_modal) {
      this.setState({
        measure_for_modal: {
          ...this.state.measure_for_modal,
          guides_to_follow_list: GuideStore.toFollowListForBallotItem()
        }
      });
    }
  }

  _next () {
    this.refs.slider.slickNext();
  }

  componentDidUpdate (){
    this.hashLinkScroll();
  }

  //Needed to scroll to anchor tags based on hash in url(as done for bookmarks)
  hashLinkScroll () {
    const { hash } = window.location;
    if (hash !== "") {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        var id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  }

  getBallot (props){
    let ballot_type = props.location.query ? props.location.query.type : "all";
    switch (ballot_type) {
      case "filterRemaining":
        return BallotStore.ballot_remaining_choices;
      case "filterSupport":
        return BallotStore.ballot_supported;
      case "filterReadyToVote":
        return BallotStore.ballot;
      default :
        return BallotStore.ballot;
    }
  }

  getBallotType (){
    switch (this.state.ballot_type) {
      case "filterRemaining":
        return "CHOICES_REMAINING";
      case "filterSupport":
        return "WHAT_I_SUPPORT";
      case "filterReadyToVote":
        return "READY_TO_VOTE";
      default :
        return "ALL_BALLOT_ITEMS";
    }
  }

  getFilterType (){
    switch (this.state.ballot_type) {
      case "filterRemaining":
        return "filterRemaining";
      case "filterSupport":
        return "filterSupport";
      case "filterReadyToVote":
        return "filterReadyToVote";
      default :
        return "none";
    }
  }

  emptyMsg (){
    switch (this.state.ballot_type) {
      case "filterRemaining":
        return "You already chose a candidate or position for each ballot item";
      case "filterSupport":
        return "You haven't supported any candidates or measures yet.";
      default :
        return "";
    }
  }

  render () {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      accessibility: true,
      //react-slick default left & right nav arrows
      arrows: true,
    };

/*
    // This Modal is shown to the user, when user visits the ballot page for first time only
    const BallotIntroModal = <Modal show={this.state.showBallotIntroModal} onHide={()=>{this._toggleBallotIntroModal(null);}}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Slider ref="slider" {...settings}>
          <View key={1}><BallotIntroMission next={this._next}/></View>
          <View key={2}><BallotIntroFollowIssues next={this._next}/></View>
          <View key={3}><BallotIntroFollowAdvisers next={this._next}/></View>
          <View key={4}><BallotIntroPositionBar next={this._next}/></View>
        </Slider>
      </Modal.Body>
    </Modal>;
*/

    let ballot = this.state.ballot;
    var voter_address = VoterStore.getAddress();
    if (!ballot) {
      if (voter_address.length === 0) {
        return <View className="ballot">
          <View className="ballot__header">
            
            <Text>
              Your ballot could not be found. Please change your address.
            </Text>
          </View>
        </View>;
      } else {
        // console.log("Loading Wheel " + "voter_address " + voter_address + " ballot " + ballot + " location " + this.props.location);
        return <View className="ballot">
            <View className="ballot__header">
              <Text>
                Your ballot could not be found. Please change your address.
              </Text>
              {LoadingWheel}
            </View>
          </View>;
      }
    }
    const missing_address = this.props.location === null;
    // const ballot_caveat = BallotStore.ballot_properties.ballot_caveat;
    const election_name = BallotStore.currentBallotElectionName;
    const election_date = BallotStore.currentBallotElectionDate;
    const polling_location_we_vote_id_source = BallotStore.currentBallotPollingLocationSource;
    let ballot_returned_admin_edit_url = web_app_config.WE_VOTE_SERVER_ROOT_URL + "b/" + polling_location_we_vote_id_source + "/list_edit_by_polling_location/?google_civic_election_id=" + VoterStore.election_id() + "&state_code=";

    const emptyBallotButton = this.getFilterType() !== "none" && !missing_address ?
        <Text>
            <Button>View Full Ballot</Button>
        </Text> :
        <Text>
              <Button>Enter a Different Address</Button>
        </Text>;

    const emptyBallot = ballot.length === 0 ?
      <View className="container-fluid well u-stack--md u-inset--md">
        {emptyBallotButton}
      </View> :
      null;

    const electionTooltip = election_date ? <Text> Tooltip to election Date</Text> : <Text />;

    let in_ready_to_vote_mode = this.getFilterType() === "filterReadyToVote";

    return <View className="ballot">
      { this.state.showBallotIntroModal ? BallotIntroModal : null }
      { this.state.showMeasureModal ? MeasureModal : null }
      { this.state.showCandidateModal ? CandidateModal : null }
      { this.state.showSelectBallotModal ? SelectBallotModal : null }
      { this.state.showSelectAddressModal ? SelectAddressModal : null }
      <View className="ballot__heading u-stack--lg">
        <Text>
        OverlayTrigger
        </Text>
        <View className="ballot__date_location">
          {voter_address}
          <Text className="hidden-print"> (<TouchableOpacity> onPress={this._toggleSelectAddressModal}</TouchableOpacity>)</Text>
        </View>
        <View className="ballot__filter hidden-print"><BallotFilter ballot_type={this.getBallotType()} /></View>
      </View>
      {/* TO BE DISCUSSED ballot_caveat !== "" ?
        <View className="alert alert alert-info alert-dismissible" role="alert">n
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {ballot_caveat}
        </View> : null
      */}
      {emptyBallot}
        <View className="BallotList">
        { in_ready_to_vote_mode ?
          ballot.map( (item) => <BallotItemReadyToVote key={item.we_vote_id} {...item} />) :
          ballot.map( (item) => <BallotItemCompressed _toggleCandidateModal={this._toggleCandidateModal}
                                                      _toggleMeasureModal={this._toggleMeasureModal}
                                                      key={item.we_vote_id}
                                                      {...item} />)
        }
        </View>
        {/* Show links to this candidate in the admin tools */}
        { this.state.voter && polling_location_we_vote_id_source && (this.state.voter.is_admin || this.state.voter.is_verified_volunteer) ?
          <Text>Admin: 
              Ballot copied from polling location </Text> :
          null
        }
      </View>;
  }
}
