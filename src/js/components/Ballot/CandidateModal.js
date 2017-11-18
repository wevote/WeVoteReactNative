import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
// import CandidateActions from "../../actions/CandidateActions";
import CandidateStore from "../../stores/CandidateStore";
// import GuideList from "../../components/VoterGuide/GuideList";
import ItemActionBar from "../Widgets/ItemActionBar";
//import ItemPositionStatementActionBar from "../Widgets/ItemPositionStatementActionBar";
import ItemSupportOpposeCounts from "../../components/Widgets/ItemSupportOpposeCounts";
// import ItemTinyPositionBreakdownList from "../../components/Position/ItemTinyPositionBreakdownList";
// import PositionList from "../../components/Ballot/PositionList";
import SupportStore from "../../stores/SupportStore";
import VoterGuideStore from "../../stores/VoterGuideStore";
import base_styles from "../../stylesheets/components/baseStyles";
import flex_box_styles from "../../stylesheets/utilities/flexBoxStyles";

export default class CandidateModal extends Component {
  // We create this modal to pop up and show voter guides that the voter can follow relating to this Candidate.

  // July 2017: What triggers CandidateModal and MeasureModal -- it comes from clicking on the position bar (once you
  // have followed any organizations that have opinions on either the candidate or modal).

  static propTypes = {
    show: PropTypes.bool,
    toggleFunction: PropTypes.func.isRequired,
    candidate: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      modalVisible: true,
      hide_position_statement: true,
      pause_position_list_for_ballot_item_retrieve: false,
      position_list_from_advisers_followed_by_voter: [],
      voter_guides_to_follow_for_latest_ballot_item: [],
    };
  }

  componentWillMount () {
    this.setState({
      position_list_from_advisers_followed_by_voter: CandidateStore.getPositionList(this.props.candidate.we_vote_id),
      voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem(),
    });
    var candidateSupportProps = SupportStore.get(this.props.candidate.we_vote_id);
    if (candidateSupportProps !== undefined) {
      this.setState({ candidateSupportProps: candidateSupportProps });
    }
    this.candidateStoreListener = CandidateStore.addListener(this.onCandidateStoreChange.bind(this));
    this.supportStoreListener = SupportStore.addListener(this.onSupportStoreChange.bind(this));
    this.voterGuideStoreListener = VoterGuideStore.addListener(this.onVoterGuideStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.candidateStoreListener.remove();
    this.supportStoreListener.remove();
    this.voterGuideStoreListener.remove();
  }

  onCandidateStoreChange (){
    // console.log("CandidateModal onCandidateStoreChange");
    // this.setState({
    //   position_list_from_advisers_followed_by_voter: CandidateStore.getPositionList(this.props.candidate.we_vote_id),
    //   pause_position_list_for_ballot_item_retrieve: false,
    // });
  }

  onSupportStoreChange () {
    // var candidateSupportProps = SupportStore.get(this.props.candidate.we_vote_id);
    // if (candidateSupportProps !== undefined) {
    //   this.setState({ candidateSupportProps: candidateSupportProps });
    // }
  }

  onVoterGuideStoreChange () {
    // console.log("CandidateModal onVoterGuideStoreChange");
    // if (!this.state.pause_position_list_for_ballot_item_retrieve) {
    //   //CandidateActions.positionListForBallotItem(this.props.candidate.we_vote_id);
    //   this.setState({
    //     pause_position_list_for_ballot_item_retrieve: true,
    //   });
    // }
    // this.setState({
    //   voter_guides_to_follow_for_latest_ballot_item: VoterGuideStore.getVoterGuidesToFollowForLatestBallotItem(),
    // });
  }

  togglePositionStatement (){
    this.setState({hide_position_statement: !this.state.hide_position_statement});
  }

  render () {
    let is_support = false;
    let is_oppose = false;
    let voter_statement_text = false;
    if (this.state.candidateSupportProps !== undefined) {
      is_support = this.state.candidateSupportProps.is_support;
      is_oppose = this.state.candidateSupportProps.is_oppose;
      voter_statement_text = this.state.candidateSupportProps.voter_statement_text;
    }
    const NO_VOTER_GUIDES_TEXT = "We couldn't find any more voter guides to follow related to this candidate.";
    return <Modal
        animationIn='slideInUp'
        animationOut='slideInDown'
        isVisible={this.props.show}
        onBackButtonPress={this.props.toggleFunction}
        onBackdropPress={this.props.toggleFunction}
        backdropOpacity={0.25}
        backdropColor={'gray'}
        style={[base_styles.candidate_modal, flex_box_styles.u_flex, flex_box_styles.u_items_start, flex_box_styles.u_justify_start, flex_box_styles.u_content_stretch]}>
      <View style={base_styles.modal_header}>
        {this.props.candidate ?
          <Text style={base_styles.modal_title}>
            Opinions about {this.props.candidate.ballot_item_display_name}
          </Text> : null
        }
      </View>
      <View style={base_styles.modal_body}>
      { this.props.candidate ?
        <View style={base_styles.card} className="card">
          <Text style={base_styles.card__no_additional} className="card__no-additional">
            This is a summary of the positions you are following.
          </Text>
          <ItemSupportOpposeCounts we_vote_id={this.props.candidate.we_vote_id}
                                   supportProps={this.state.candidateSupportProps}
                                   type="CANDIDATE"
                                   positionBarIsClickable/>
          <ItemActionBar ballot_item_we_vote_id={this.props.candidate.we_vote_id}
                         ballot_item_display_name={this.props.candidate.ballot_item_display_name}
                         supportProps={this.state.candidateSupportProps}
                         type="CANDIDATE"
                         toggleFunction={this.togglePositionStatement.bind(this)}
          />
        </View> : null }
      </View>
    </Modal>;
  }
}
