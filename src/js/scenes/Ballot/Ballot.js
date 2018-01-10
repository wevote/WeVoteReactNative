import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import ballotStyles from "../../stylesheets/components/ballotStyles";
import BallotActions from "../../actions/BallotActions";
import BallotItemCompressed from "../../components/Ballot/BallotItemCompressed";
import BallotStore from "../../stores/BallotStore";
import CandidateStore from "../../stores/CandidateStore";
import CandidateActions from "../../actions/CandidateActions";
import CandidateModal from "../../components/Ballot/CandidateModal";
import CookieStore from "../../stores/CookieStore";
import EditAddress from "../../components/Widgets/EditAddress";
import HeaderTitle from "../../components/Header/Header"
import LoadingWheel from "../../components/LoadingWheel";
import RouteConst from "../RouteConst";
import SelectAddressModal from "../../components/Ballot/SelectAddressModal";
import styles from "../../stylesheets/components/baseStyles";
import VoterActions from "../../actions/VoterActions";
import VoterGuideActions from "../../actions/VoterGuideActions";
import VoterGuideStore from "../../stores/VoterGuideStore";
import VoterStore from "../../stores/VoterStore";
import { default as webAppConfig } from '../../config';
import WeVoteButton from "../../components/WeVoteButton"
const logging = require("../../utils/logging");

export default class Ballot extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor (props){
    super(props);
    this.state = {
      candidate_for_modal: null,
      measure_for_modal: {
        voter_guides_to_follow_for_latest_ballot_item: [],
        position_list: []
      },
      // showBallotIntroModal: !VoterStore.getInterfaceFlagState(VoterConstants.BALLOT_INTRO_MODAL_SHOWN),
      showCandidateModal: false,
      showMeasureModal: false,
      showSelectBallotModal: false,
      showSelectAddressModal: false,
      showBallotSummaryModal: false,
      ballotElectionList: [],
      mounted: false,
      entryTime: null,
      waitingForBallot: false,
    };

    // this._toggleBallotIntroModal = this._toggleBallotIntroModal.bind(this);
    this._toggleCandidateModal = this._toggleCandidateModal.bind(this);
    this._toggleMeasureModal = this._toggleMeasureModal.bind(this);
    this._toggleSelectBallotModal = this._toggleSelectBallotModal.bind(this);
    this._toggleSelectAddressModal = this._toggleSelectAddressModal.bind(this);
    this._toggleBallotSummaryModal = this._toggleBallotSummaryModal.bind(this);
  }


  static onEnter = () => {
    logging.rnrfLog("onEnter to Ballot: currentScene = " + Actions.currentScene);
    // React Navigation / RNRF Tabs do not re-render when displayed, so we need this...
    // Actions.refesh() forces componentWillReceiveProps() to be executed
    Actions.refresh({
      entryTime: new Date()
    });
  };

  static onExit = () => {
    logging.rnrfLog("onExit from Ballot: currentScene = " + Actions.currentScene);
    Actions.refresh({came_from: RouteConst.KEY_BALLOT, forward_to_ballot: false})
  };

  // componentDidMount ()  Doesn't work in react-native?
  componentWillMount () {
    console.log("Ballot ++++ MOUNT, currentScene = " + Actions.currentScene);
    this.setState({mounted: true});
    if (Actions.currentScene === RouteConst.KEY_BALLOT) {
      if (typeof BallotStore.ballot_properties === "undefined" || BallotStore.ballot_properties.ballot_found === false) { // No ballot found
        logging.rnrfLog("Ballot had no voter so called  AddressSelectModal");
        this.setState({showBallotSummaryModal: true});
        //Actions.location({came_from: RouteConst.KEY_BALLOT});
        //browserHistory.push("settings/location");
      } else {
        let ballot_type = this.props.type ? this.props.type : "all";
        console.log("ballot = " + this.getBallotByBallotType(ballot_type));
        let ballot = this.getBallotByBallotType(ballot_type);
        if (ballot !== undefined) {
          this.setState({ballot: ballot, ballot_type: ballot_type});
        }
      }

      if (!this.ballotStoreListener) {
        logging.rnrfLog("ballot had no ballotStoreListener so added listeners");

        // We need a ballotStoreListener here because we want the ballot to display before positions are received
        this.ballotStoreListener = BallotStore.addListener(this._onBallotStoreChange.bind(this));
        // NOTE: voterAllPositionsRetrieve and positionsCountForAllBallotItems are also called in SupportStore when voterAddressRetrieve is received,
        // so we get duplicate calls when you come straight to the Ballot page. There is no easy way around this currently.
        this.voterGuideStoreListener = VoterGuideStore.addListener(this._onVoterGuideStoreChange.bind(this));
        // Oct 31, 2017 ... Typo:  BallotStoreChange? So commenting it out.
        //this.supportStoreListener = SupportStore.addListener(this._onBallotStoreChange.bind(this));
        this._onVoterStoreChange(); // We call this to properly set showBallotIntroModal
        this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
        // Steve 11/11/17 SupportActions.voterAllPositionsRetrieve();
        // Steve 11/11/17 SupportActions.positionsCountForAllBallotItems();
        // Steve 11/11/17 BallotActions.voterBallotListRetrieve();
        this.setState({waitingForBallot: true});
        console.log("STEVE      waitingForBallot: true    in  componentWillMount")
      }
    }

    let isDeviceId = CookieStore.getCurrentVoterDeviceId().length > 0;
    if (!VoterStore.isVoterFound() && isDeviceId)  {
      console.log("voterRetrieve from Ballot.js componentWillMount with valid cookie, but no voter");
      VoterActions.voterRetrieve();  // New October 9, 2017, revived 12/23/17
    }
  }

  componentWillUnmount (){
    console.log("Ballot ---- UN mount ");
    this.setState({mounted: false});
    if (typeof BallotStore.ballot_properties === "undefined" || BallotStore.ballot_properties.ballot_found === false) { // No ballot found
      console.log('Do not remove listeners if BallotStore.ballot_properties undefined')
    } else {
      if (this.ballotStoreListener)
        this.ballotStoreListener.remove();
      if (this.voterGuideStoreListener)
        this.voterGuideStoreListener.remove();
      if (this.voterStoreListener)
        this.voterStoreListener.remove();
      // this.supportStoreListener.remove();
    }
  }

  componentWillReceiveProps (nextProps){
    let ballot_type = nextProps.type ? nextProps.type : "all";
    let text_for_map_search = VoterStore.getAddressFromObjectOrTextForMapSearch();
    // console.log("ballot_type: ", ballot_type, ", ballot = " + this.getBallotByBallotType(ballot_type));
    this.setState({ballot: this.getBallotByBallotType(ballot_type), ballot_type: ballot_type });
    if (this.props.entryTime !== nextProps.entryTime) {
      logging.rnrfLog("componentWillReceiveProps in Ballot: this.forceUpdate()");
      if (text_for_map_search.length == 0 ) { // No voter found
        logging.rnrfLog("Voter had no address so enabled AddressSelectModal");
        this.setState({showAddressSummaryModal: true});
        this.forceUpdate();
      }
      if (typeof BallotStore.ballot_properties === "undefined" || BallotStore.ballot_properties.ballot_found === false) { // No ballot found
        logging.rnrfLog("Ballot had no ballot so called  BallotSelectModal");
        this.setState({showBallotSummaryModal: true});
        this.forceUpdate();
      }
    }
  }

  _toggleCandidateModal (candidate_for_modal) {
    if (candidate_for_modal) {
      VoterGuideActions.voterGuidesToFollowRetrieveByBallotItem(candidate_for_modal.we_vote_id, "CANDIDATE");
      CandidateActions.positionListForBallotItem(candidate_for_modal.we_vote_id);
      candidate_for_modal.voter_guides_to_follow_for_latest_ballot_item = VoterGuideStore.getVoterGuidesToFollowForBallotItemId(candidate_for_modal.we_vote_id);
      candidate_for_modal.position_list = CandidateStore.getPositionList(candidate_for_modal.we_vote_id);
      this.setState({
        candidate_for_modal: candidate_for_modal,
        showCandidateModal: !this.state.showCandidateModal
      });
    } else {
      this.setState({
        candidate_for_modal: this.state.candidate_for_modal,
        showCandidateModal: !this.state.showCandidateModal
      });
    }
  }

  // October 2017, BallotIntroModal is lower priority
  // _toggleBallotIntroModal () {
  //   if (this.state.showBallotIntroModal) {
  //     // Saved to the voter record that the ballot introduction has been seen
  //     VoterActions.voterUpdateInterfaceStatusFlags(VoterConstants.BALLOT_INTRO_MODAL_SHOWN);
  //   } else {
  //     // Clear out any # from anchors in the URL
  //     this.props.navigator.redirect("/ballot");
  //   }
  //   this.setState({ showBallotIntroModal: !this.state.showBallotIntroModal });
  // }

  _toggleMeasureModal (measureForModal) {
    if (measureForModal) {
      VoterGuideActions.voterGuidesToFollowRetrieveByBallotItem(measureForModal.measure_we_vote_id, "MEASURE");
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
    console.log("ballot _toggleSelectAddressModal called with show = " + this.state.showSelectAddressModal + "  and mounted = " + this.state.mounted);

    this.setState({
      showSelectAddressModal: !this.state.showSelectAddressModal
    });
    if (this.state.showSelectAddressModal) {
      Actions.refresh({
        entryTime: new Date()
      });
    }

  }

  _toggleBallotSummaryModal () {
    this.setState({
      showBallotSummaryModal: !this.state.showBallotSummaryModal
    });
  }

  _onVoterStoreChange () {
    if (this.state.mounted) {
      this.setState({
        voter: VoterStore.getVoter(),
        // showBallotIntroModal: !VoterStore.getInterfaceFlagState(VoterConstants.BALLOT_INTRO_MODAL_SHOWN),
      });
    }
  }

  _onBallotStoreChange (){
    //console.log("Ballot.js _onBallotStoreChange");
    if (this.state.mounted) {
      if (BallotStore.ballot_properties && BallotStore.ballot_properties.ballot_found && BallotStore.ballot && BallotStore.ballot.length === 0) { // Ballot is found but ballot is empty
        console.log("Ballot.js trying to redirect to ballot/empty");
        browserHistory.push("ballot/empty");
      } else {
        //let ballot_type = this.props.type ? this.props.type : "all";
        let ballot_type = "all";
        // console.log("ballot = " + this.getBallotByBallotType(ballot_type));
        // console.log("Ballot.js setting state with ballot and ballot_type");
        this.setState({ballot: this.getBallotByBallotType(ballot_type), ballot_type: ballot_type});
      }
      this.setState({ballotElectionList: BallotStore.ballotElectionList(), waitingForBallot: false});
    }
  }

  _onVoterGuideStoreChange (){
    // Update the data for the modal to include the position of the organization related to this ballot item
    if (this.state.candidate_for_modal) {
      this.setState({
        candidate_for_modal: this.state.candidate_for_modal,
      });
    } else if (this.state.measure_for_modal) {
      this.setState({
        measure_for_modal: {
          ...this.state.measure_for_modal,
          voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem()
        }
      });
    }
  }

//  componentDidUpdate (){
//    this.hashLinkScroll();
//  }

  // Needed to scroll to anchor tags based on hash in url (as done for bookmarks)
  hashLinkScroll () {
    const { hash } = window.location;
    if (hash !== "") {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        let id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  }

  getBallotByBallotType (ballot_type){
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

  // ------------------------------------------------------------------------------------------------------------------
  render () {
    logging.renderLog("Ballot.js, scene = " + Actions.currentScene);

    if (this.state.waitingForBallot && Actions.currentScene != RouteConst.KEY_BALLOT) {
      console.log("Ballot waitingForBallot is true with the scene not being current, so returning null");
      return LoadingWheel;
    }

    let ballot = this.state.ballot;
    let text_for_map_search = VoterStore.getAddressFromObjectOrTextForMapSearch();
    let sign_in_message =  this.props.sign_in_message_type === 'success' ? this.props.sign_in_message : '';

    if (this.state.showAddressSummaryModal || this.state.showBallotSummaryModal) {
      return <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <Text style={[styles.title,{paddingTop: 20, paddingBottom: 20}]}>
            In this early version of the We Vote app, you must Sign In first after installing or reinstalling the app</Text>
          <View style={styles.flexRowCentered}>
            <WeVoteButton buttonLabel={'Sign In'} iconName={'address-card-o'}
                          opacityStyles={[styles.buttonBasics, styles.twitterColors]} trailingPadding={0}
                          onPress={() => Actions.signIn()}
            />
          </View>
        </View>
      </View>;
    }

    if (this.state.showSelectAddressModal) {
      return <View className="ballot">{/*     return from here -------------------------------------------------*/}

        <View className="ballot__header">
          <HeaderTitle headerText = {'Your Ballot'} />

          <Text>
            Your ballot could not be found. Please change your address.
            {sign_in_message}
          </Text>

          {(Actions.currentScene === RouteConst.KEY_BALLOT) ?
            <SelectAddressModal show={this.state.showSelectAddressModal}
                                toggleFunction={this._toggleSelectAddressModal} /> : null }

        </View>
      </View>;
    }

    if (!ballot) {
      console.log("Ballot.js, no ballot found so displaying Loading Wheel ");
      // BallotActions.voterBallotListRetrieve(); // This will create an infinite loop

      return <LoadingWheel text={'Loading your ballot.'} />;
    }

    const missing_address = false;
    //const missing_address = this.props.location === null;
    // const ballot_caveat = BallotStore.ballot_properties.ballot_caveat;
    const election_name = BallotStore.currentBallotElectionName;
    const election_date = BallotStore.currentBallotElectionDate;
    const polling_location_we_vote_id_source = BallotStore.currentBallotPollingLocationSource;
    let ballot_returned_admin_edit_url = webAppConfig.WE_VOTE_SERVER_ROOT_URL + "b/" + polling_location_we_vote_id_source + "/list_edit_by_polling_location/?google_civic_election_id=" + VoterStore.election_id() + "&state_code=";

    const emptyBallotButton = this.getFilterType() !== "none" && !missing_address ?
        <TouchableOpacity onPress={browserHistory.push('/ballot')}>
          <Text style = {styles.button_text}>View Full Ballot</Text>
        </TouchableOpacity> : null;
        //<Link to="/settings/location">Enter a Different Address</Link>;
        /*<TouchableOpacity onPress={browserHistory.push('/settings/location')}>
          <Text style = {styles.button_text}>Enter a Different Address</Text>
        </TouchableOpacity>;*/

    const emptyBallot = ballot.length === 0 ?
      <View className="container-fluid well u-stack--md u-inset--md">
        {emptyBallotButton}
      </View> :
      null;

    const electionTooltip = election_date ?
        <View style={{position: 'absolute'}}>
            <Text>Ballot for {election_date}</Text>
        </View> : <Text />;

    //let in_ready_to_vote_mode = this.getFilterType() === "filterReadyToVote";
    let in_ready_to_vote_mode = false;
    let voter_address_object = VoterStore.getAddressObject();

    return <View>{/*     return from here ---------------------------------------------------------------------------*/}
      <View>
        {/*{ this.state.showBallotIntroModal ? <BallotIntroModal show={this.state.showBallotIntroModal} toggleFunction={this._toggleBallotIntroModal} /> l }*/}
        { this.state.showMeasureModal && <MeasureModal show={this.state.showMeasureModal} toggleFunction={this._toggleMeasureModal} measure={this.state.measure_for_modal}/> }
        { this.state.showCandidateModal && <CandidateModal show={this.state.showCandidateModal} toggleFunction={this._toggleCandidateModal} candidate={this.state.candidate_for_modal}/> }
        { this.state.showSelectBallotModal && <SelectBallotModal show={this.state.showSelectBallotModal} toggleFunction={this._toggleSelectBallotModal} ballotElectionList={this.state.ballotElectionList} /> }
        {/*{ this.state.showSelectAddressModal && <SelectAddressModal show={this.state.showSelectAddressModal} toggleFunction={this._toggleSelectAddressModal} />  }*/}
        { this.state.showBallotSummaryModal && <BallotSummaryModal show={this.state.showBallotSummaryModal} toggleFunction={this._toggleBallotSummaryModal} /> }
      </View>

      <View style={{backgroundColor: 'white'}} >
        { election_name ?
          /*<OverlayTrigger placement="top" overlay={electionTooltip} >*/
            <View>
               <Text style={[styles.titleLarge,{paddingTop: 15, paddingLeft: 5}]}> {election_name} </Text>
               {this.state.ballotElectionList.length > 1 ? <Image source={require("../../../img/global/icons/gear-icon.png")}/> : null}
          </View> :
          null }

        <View style={{padding: 10}}>
        <EditAddress address={voter_address_object} _toggleSelectAddressModal={this._toggleSelectAddressModal} />
        </View>
        {/*{text_for_map_search ?*/}
            {/*<BallotFilter ballot_type={this.getBallotType()} _toggleBallotIntroModal={this._toggleBallotIntroModal} /> :*/}
          {/*null*/}
        {/*}*/}
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={ballotStyles.summaryOfBallotItems} onPress={this._toggleBallotSummaryModal}>Summary of Ballot Items</Text>
      </View>

      {emptyBallot}
      {console.log(ballot)}
      <ScrollView>
        { in_ready_to_vote_mode ?
          ballot.map( (item) => <View key={item.we_vote_id}>{console.log("BallotItemReadyToVote " + item.we_vote_id)}
            <BallotItemReadyToVote key={item.we_vote_id} {...item} />
          </View>) :
          ballot.map( (item) => <View key={item.we_vote_id}>{console.log("BallotItemCompressed " + item.we_vote_id)}
            <BallotItemCompressed _toggleCandidateModal={this._toggleCandidateModal}
                                  _toggleMeasureModal={this._toggleMeasureModal}
                                  key={item.we_vote_id}
                                  {...item} />
          </View>)
        }
        {/* in_ready_to_vote_mode ?
          ballot.map( (item) => <Text> {item.ballot_item_display_name}</Text> ) : null
        */}

      </ScrollView>

    </View>;
  }
}
