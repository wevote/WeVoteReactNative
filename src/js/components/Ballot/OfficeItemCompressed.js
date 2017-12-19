import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image } from "react-native";
import VoterGuideStore from "../../stores/VoterGuideStore";
import ImageHandler from "../ImageHandler";
import ItemActionBar from "../Widgets/ItemActionBar";
import ItemSupportOpposeCounts from "../Widgets/ItemSupportOpposeCounts";
import ItemTinyOpinionsToFollow from "../VoterGuide/ItemTinyOpinionsToFollow";
import BookmarkToggle from "../Bookmarks/BookmarkToggle";
import BallotSideBarLink from "../Navigation/BallotSideBarLink";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";
import LearnMore from "../Widgets/LearnMore";
import ballot_styles from "../../stylesheets/components/ballotStyles";
import base_styles from "../../stylesheets/components/baseStyles";
import layout_styles from "../../stylesheets/utilities/layoutStyles";
import flex_box_styles from "../../stylesheets/utilities/flexBoxStyles";
import o_media_object_styles from "../../stylesheets/objects/o_mediaObject";

const NUMBER_OF_CANDIDATES_TO_DISPLAY = 3;

export default class OfficeItemCompressed extends Component {
  static propTypes = {
    key: PropTypes.string,
    we_vote_id: PropTypes.string.isRequired,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    candidate_list: PropTypes.array,
    _toggleCandidateModal: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      transitioning: false,
      maximum_organization_display: 4,
      display_all_candidates_flag: false,
    };

    this.toggleDisplayAllCandidates = this.toggleDisplayAllCandidates.bind(this);
  }

  componentDidMount () {
    this.voterGuideStoreListener = VoterGuideStore.addListener(this._onVoterGuideStoreChange.bind(this));
    this._onVoterGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this._onSupportStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.voterGuideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  _onVoterGuideStoreChange (){
    this.setState({ transitioning: false });
  }

  _onSupportStoreChange () {
    this.setState({ transitioning: false });
  }

  openCandidateModal (candidate) {
    // console.log("this.state.candidate: ", this.state.candidate);
    if (candidate && candidate.we_vote_id) {
      this.props._toggleCandidateModal(candidate);
    }
  }

  toggleDisplayAllCandidates () {
    this.setState({ display_all_candidates_flag: !this.state.display_all_candidates_flag });
  }

  render () {
    let { ballot_item_display_name, we_vote_id } = this.props;
    let officeLink = "/office/" + we_vote_id;

    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    let candidate_list_to_display = this.props.candidate_list;
    let remaining_candidates_to_display_count = 0;

    if (!this.state.display_all_candidates_flag && this.props.candidate_list.length > NUMBER_OF_CANDIDATES_TO_DISPLAY) {
      candidate_list_to_display = this.props.candidate_list.slice(0, NUMBER_OF_CANDIDATES_TO_DISPLAY);
      remaining_candidates_to_display_count = this.props.candidate_list.length - NUMBER_OF_CANDIDATES_TO_DISPLAY;
    }

    return <View style={base_styles.card_main} className="card-main office-item">
      <View className ="card-main__content">
        <BookmarkToggle we_vote_id={we_vote_id} type="OFFICE" />
        { this.props.link_to_ballot_item_page ?
          //<Link to={officeLink}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[ballot_styles.ballot_name, layout_styles.u_stack__sm]}
                onPress={() => null}> {/*Actions.office({office_we_vote_id: we_vote_id})*/}
            {ballot_item_display_name}
          </Text> :
          <Text numberOfLines={1} ellipsizeMode='tail' style={[ballot_styles.ballot_name, layout_styles.u_stack__sm]}>
            {ballot_item_display_name}
          </Text>
        }
      </View>
      { candidate_list_to_display.map( (one_candidate) => {
        let candidate_we_vote_id = one_candidate.we_vote_id;
        let candidateGuidesList = VoterGuideStore.getVoterGuidesToFollowForBallotItemId(candidate_we_vote_id);

        let candidate_party_text = one_candidate.party && one_candidate.party.length ? one_candidate.party + ". " : "";
        let candidate_description_text = one_candidate.twitter_description && one_candidate.twitter_description.length ? one_candidate.twitter_description : "";
        let candidate_text = candidate_party_text + candidate_description_text;
        let candidateSupportStore = SupportStore.get(candidate_we_vote_id);
        let is_support = false;
        let is_oppose = false;
        let voter_statement_text = false;
        if (candidateSupportStore !== undefined) {
          is_support = candidateSupportStore.is_support;
          is_oppose = candidateSupportStore.is_oppose;
          voter_statement_text = candidateSupportStore.voter_statement_text;
        }

        return <View key={candidate_we_vote_id} style={layout_styles.u_stack__md} className="u-stack--md">
          <View style={[base_styles.media_object, flex_box_styles.u_flex_auto, flex_box_styles.u_min_50, layout_styles.u_push__sm, layout_styles.u_stack__sm]}
                className="o-media-object u-flex-auto u-min-50 u-push--sm u-stack--sm">
            {/* Candidate Photo */}
            <View
              onPress={this.props.link_to_ballot_item_page ? () => Actions.candidate({candidate_we_vote_id: one_candidate.we_vote_id}) : null}>
              {one_candidate.candidate_photo_url_large ?
                <Image source={{uri: one_candidate.candidate_photo_url_large}}
                       style={[ballot_styles.candidate_photo, ballot_styles.avatar_compressed, o_media_object_styles.o_media_object__anchor, layout_styles.u_self_start, layout_styles.u_push__sm]}/>
                : null}
            </View>
            <View style={[o_media_object_styles.o_media_object__body, flex_box_styles.u_flex, flex_box_styles.u_flex_column,
              flex_box_styles.u_flex_auto, flex_box_styles.u_justify_between, layout_styles.u_stack__xs]}
                  className="o-media-object__body u-flex u-flex-column u-flex-auto u-justify-between">
              {/* Candidate Name */}
              {/*<Text numberOfLines={1} ellipsizeMode='tail'*/}
                    {/*onPress={() => Actions.candidate({candidate_we_vote_id: one_candidate.we_vote_id})}*/}
                    {/*style={ballot_styles.title_text} className="card-main__candidate-name u-f4">*/}
                {/*{one_candidate.ballot_item_display_name}*/}
              <Text numberOfLines={1} ellipsizeMode='tail'
                    onPress={() => this.openCandidateModal(one_candidate)}
                    style={ballot_styles.title_text} className="card-main__candidate-name u-f4">
                {one_candidate.ballot_item_display_name}
              </Text>

              <View className="card-main__candidate-description">
                {/*<Text style={ballot_styles.candidate_description}>{candidate_text}</Text>*/}
                {/*<LearnMore text_to_display={candidate_text}*/}
                           {/*on_click={this.props.link_to_ballot_item_page ? () => Actions.candidate({candidate_we_vote_id: one_candidate.we_vote_id}) : null}/>*/}
                <LearnMore text_to_display={candidate_text}
                           on_click={() => Actions.candidate({candidate_we_vote_id: one_candidate.we_vote_id})}/>

              </View>
              {/* Opinion Items */}
              <View style={[flex_box_styles.u_flex, flex_box_styles.u_flex_row, flex_box_styles.u_justify_between, flex_box_styles.u_min_50]}
                    className="u-flex u-flex-auto u-flex-row u-justify-between u-items-center u-min-50">
                {/* Positions in Your Network */}
                <View
                      className={this.props.link_to_ballot_item_page ? "u-cursor--pointer" : null}
                      onPress={this.props.link_to_ballot_item_page ? () => this.props.toggleCandidateModal(one_candidate) : null}>
                  <ItemSupportOpposeCounts we_vote_id={candidate_we_vote_id}
                                           supportProps={candidateSupportStore}
                                           guideProps={candidateGuidesList}
                                           type="CANDIDATE"/>
                </View>

                {/* Possible Voter Guides to Follow (Desktop) */}
                {candidateGuidesList && candidateGuidesList.length ? null : null}

                {/* Support or Oppose actions for voter */}
                <View className="u-cursor--pointer">
                  <ItemActionBar ballot_item_we_vote_id={candidate_we_vote_id}
                                 supportProps={candidateSupportStore}
                                 shareButtonHide
                                 commentButtonHide
                                 transitioniing={this.state.transitioning}
                                 ballot_item_display_name={one_candidate.ballot_item_display_name}
                                 type="CANDIDATE"/>
                </View>
              </View>
            </View>
          </View>
        </View>;
      })}
      { !this.state.display_all_candidates_flag && remaining_candidates_to_display_count > 0 ?
          <Text numberOfLines={1} ellipsizeMode='tail' onPress={this.toggleDisplayAllCandidates} className="u-items-center">
            Click&nbsp;to&nbsp;show&nbsp;{remaining_candidates_to_display_count}&nbsp;more&nbsp;candidates...</Text>
          : null
      }
      { this.state.display_all_candidates_flag && this.props.candidate_list.length > NUMBER_OF_CANDIDATES_TO_DISPLAY ?
        <BallotSideBarLink url={"#" + this.props.we_vote_id}
                           label={"Click to show fewer candidates..."}
                           displaySubtitles={false}
                           onClick={this.toggleDisplayAllCandidates} /> : null
      }
    </View>;
  }
}
