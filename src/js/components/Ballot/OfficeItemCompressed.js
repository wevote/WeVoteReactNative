import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import GuideStore from "../../stores/GuideStore";
import ImageHandler from "../ImageHandler";
import ItemActionBar from "../Widgets/ItemActionBar";
import ItemSupportOpposeCounts from "../Widgets/ItemSupportOpposeCounts";
import ItemTinyOpinionsToFollow from "../VoterGuide/ItemTinyOpinionsToFollow";
import BookmarkToggle from "../Bookmarks/BookmarkToggle";
import BallotSideBarLink from "../Navigation/BallotSideBarLink";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";
import ballotStyles from "../../stylesheets/BallotStyles"
//import { Link } from "react-router-native";
//import { Link, browserHistory } from "react-router";

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
    this.guideStoreListener = GuideStore.addListener(this._onGuideStoreChange.bind(this));
    this._onGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this._onSupportStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.guideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  _onGuideStoreChange (){
    this.setState({ transitioning: false });
  }

  _onSupportStoreChange () {
    this.setState({ transitioning: false });
  }

  toggleDisplayAllCandidates () {
    this.setState({ display_all_candidates_flag: !this.state.display_all_candidates_flag });
  }

  render () {
    let { ballot_item_display_name, we_vote_id } = this.props;
    let officeLink = "/office/" + we_vote_id;

    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    var candidate_list_to_display = this.props.candidate_list;
    var remaining_candidates_to_display_count = 0;

    if (!this.state.display_all_candidates_flag && this.props.candidate_list.length > NUMBER_OF_CANDIDATES_TO_DISPLAY) {
      candidate_list_to_display = this.props.candidate_list.slice(0, NUMBER_OF_CANDIDATES_TO_DISPLAY);
      remaining_candidates_to_display_count = this.props.candidate_list.length - NUMBER_OF_CANDIDATES_TO_DISPLAY;
    }

    return <View style={ballotStyles.container} className="card-main office-item">
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className ="card-main__content">
        <View style={{alignSelf: 'flex-start'}} className="u-flex u-stack--sm">
          { this.props.link_to_ballot_item_page ?
            <View style={{flexDirection: 'row'}}>
              {/*<Link to={officeLink}>*/}
                <Text style={ballotStyles.titleText}> {ballot_item_display_name} </Text>
              {/*</Link>*/}
            </View> :
            <Text> {ballot_item_display_name} </Text>
          }
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <BookmarkToggle we_vote_id={we_vote_id} type="OFFICE"/>
        </View>
      </View>

      <View  className={this.props.link_to_ballot_item_page ?
            "u-cursor--pointer" : null } >
      { this.props.candidate_list.map( (one_candidate) =>
        <View key={one_candidate.we_vote_id} className="u-stack--md">
          <View className="u-flex u-items-center u-flex-wrap u-justify-between">
            {/* *** Candidate name *** */}
            {/* November 2, 2017, getting about 36 duplicate keys here for each candidate, and it is really hurting us
              console.log("OfficeItemCompressed key", one_candidate.we_vote_id) */}
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} className="u-flex u-cursor--pointer u-min-50"
                onPress={ this.props.link_to_ballot_item_page ?
                          ()=>{browserHistory.push("/candidate/" + one_candidate.we_vote_id);} :
                          null }>
              <Image source={{uri: one_candidate.candidate_photo_url_large}} style={{width: 48, height: 48}} />
              <Text style={ballotStyles.titleText} className="card-main__candidate-name u-f4">&nbsp; {one_candidate.ballot_item_display_name} </Text>
            </TouchableOpacity>

            {/* *** "Positions in your Network" bar OR items you can follow *** */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className="u-flex u-flex-auto u-justify-end u-items-center u-min-50">
              <View style={{alignSelf: 'center'}} className="u-flex-none u-justify-end u-inline--sm">
                {/* Decide whether to show the "Positions in your network" bar or the options of voter guides to follow */}
                { SupportStore.get(one_candidate.we_vote_id) && ( SupportStore.get(one_candidate.we_vote_id).oppose_count || SupportStore.get(one_candidate.we_vote_id).support_count) ?
                  <View className="u-cursor--pointer"
                        onPress={ this.props.link_to_ballot_item_page ?
                        ()=>{this.props._toggleCandidateModal(one_candidate);} :
                        null } >
                    <ItemSupportOpposeCounts we_vote_id={one_candidate.we_vote_id}
                                             supportProps={SupportStore.get(one_candidate.we_vote_id)}
                                             type="CANDIDATE"/>
                  </View> :
                  <View>
                    {/* Show possible voter guides to follow */}
                    { GuideStore.getVoterGuidesToFollowForBallotItemId(one_candidate.we_vote_id) && GuideStore.getVoterGuidesToFollowForBallotItemId(one_candidate.we_vote_id).length !== 0 ?
                      <View className="u-cursor--pointer"
                            onPress={ this.props.link_to_ballot_item_page ?
                            ()=>{this.props._toggleCandidateModal(one_candidate);} :
                            null } >
                        {/*<ItemTinyOpinionsToFollow ballotItemWeVoteId={one_candidate.we_vote_id}
                                                  organizationsToFollow={GuideStore.getVoterGuidesToFollowForBallotItemId(one_candidate.we_vote_id)}
                                                  maximumOrganizationDisplay={this.state.maximum_organization_display}/>*/}
                      </View> :
                      <View /> }
                  </View>
                }
              </View>

              <Text> &nbsp; &nbsp; </Text>
              {/* *** Choose Support or Oppose *** */}
              <View style={{alignSelf: 'flex-end'}} className="u-flex-none u-cursor--pointer">
                <ItemActionBar ballot_item_we_vote_id={one_candidate.we_vote_id}
                               supportProps={SupportStore.get(one_candidate.we_vote_id)}
                               shareButtonHide
                               commentButtonHide
                               transitioniing={this.state.transitioning}
                               type="CANDIDATE" />
              </View>
            </View>
          </View>
        </View>)
      }
      </View>

      { !this.state.display_all_candidates_flag && remaining_candidates_to_display_count > 0 ?
          <Text onPress={this.toggleDisplayAllCandidates} className="u-items-center">
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
