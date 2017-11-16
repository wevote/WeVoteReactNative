import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';
import VoterGuideStore from "../../stores/VoterGuideStore";
import ImageHandler from "../../components/ImageHandler";
import ItemActionBar from "../../components/Widgets/ItemActionBar";
//import ItemPositionStatementActionBar from "../../components/Widgets/ItemPositionStatementActionBar";
import ItemSupportOpposeCounts from "../../components/Widgets/ItemSupportOpposeCounts";
import ItemTinyOpinionsToFollow from "../../components/VoterGuide/ItemTinyOpinionsToFollow";
import ItemTinyPositionBreakdownList from "../../components/Position/ItemTinyPositionBreakdownList";
import OfficeNameText from "../Widgets/OfficeNameText";
import BookmarkToggle from "../Bookmarks/BookmarkToggle";
//import ParsedTwitterDescription from "../Twitter/ParsedTwitterDescription";
import SupportStore from "../../stores/SupportStore";
import {abbreviateNumber} from "../../utils/textFormat";
import {numberWithCommas} from "../../utils/textFormat";
import styles from "../../stylesheets/components/baseStyles"

export default class CandidateItem extends Component {
  static propTypes = {
    ballot_item_display_name: PropTypes.string.isRequired,
    candidate_photo_url_large: PropTypes.string.isRequired,
    candidate_photo_url_medium: PropTypes.string,
    showLargeImage: PropTypes.bool,
    commentButtonHide: PropTypes.bool,
    hideOpinionsToFollow: PropTypes.bool,
    hidePositionStatement: PropTypes.bool,
    showPositionsInYourNetworkBreakdown: PropTypes.bool,
    party: PropTypes.string,
    position_list: PropTypes.array,
    we_vote_id: PropTypes.string.isRequired,
    twitter_description: PropTypes.string,
    twitter_followers_count: PropTypes.number,
    twitter_handle: PropTypes.string,
    contest_office_name: PropTypes.string,
    link_to_ballot_item_page: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
     hide_position_statement: this.props.hidePositionStatement,
     transitioning: false,
     maximum_organization_display: 5
    };
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to CandidateItem: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from CandidateItem: currentScene = " + Actions.currentScene);
    //Actions.refresh({came_from: 'ballot', forward_to_ballot: false})
  };

  componentWillMount () {
    console.log("============CandidateItem componentWillMount===========", this.props.we_vote_id);
    // this.voterGuideStoreListener = VoterGuideStore.addListener(this.onVoterGuideStoreChange.bind(this));
    // this.onVoterGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this.onSupportStoreChange.bind(this));
    let supportProps = SupportStore.get(this.props.we_vote_id);
    if (supportProps !== undefined) {
      this.setState({ supportProps: supportProps, transitioning: false });
    }
  }

  componentWillUnmount () {
    // this.voterGuideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  onVoterGuideStoreChange (){
    // We just want to trigger a re-render
    this.setState({ transitioning: false });
  }

  onSupportStoreChange () {
    let supportProps = SupportStore.get(this.props.we_vote_id);
    if (supportProps !== undefined) {
      this.setState({ supportProps: supportProps, transitioning: false });
    }
  }

  togglePositionStatement (){
    this.setState({hide_position_statement: !this.state.hide_position_statement});
  }


  render () {
    let {
      ballot_item_display_name,
      party,
      we_vote_id,
      twitter_description,
      twitter_followers_count,
      contest_office_name,
      // twitter_handle,
    } = this.props;

    const { supportProps, transitioning } = this.state;

    // TwitterHandle-based link
    // TODO switch back to Twitter-based url once we fix the bug where we aren't routed to the
    // candidate page for this election
    // let candidateLink = twitter_handle ? "/" + twitter_handle : "/candidate/" + we_vote_id;
    let goToCandidateLink = function () { Actions.candidate({candidate_we_vote_id: we_vote_id}) };
    let candidate_photo_url;
    if (this.props.showLargeImage) {
      if (this.props.candidate_photo_url_large) {
        candidate_photo_url = this.props.candidate_photo_url_large;
      }
    } else if (this.props.candidate_photo_url_medium) {
      candidate_photo_url = this.props.candidate_photo_url_medium;
    }
    let candidate_photo_url_html;
    if (candidate_photo_url) {
      candidate_photo_url_html = <Image source={{uri: candidate_photo_url}} style={{width: 48, height: 48}} />;
        // <ImageHandler className="card-main__avatar"
        //                                   sizeClassName="icon-office-child "
        //                                   imageUrl={candidate_photo_url}
        //                                   alt="candidate-photo"
        //                                   kind_of_ballot_item="CANDIDATE" />;
    } else {
      candidate_photo_url_html = <i className="card-main__avatar icon-office-child icon-main icon-icon-person-placeholder-6-1" />;
    }
    let positions_in_your_network = SupportStore.get(we_vote_id) && ( SupportStore.get(we_vote_id).oppose_count || SupportStore.get(we_vote_id).support_count);
    return <View style={styles.card} className="card-main candidate-card" >
      <View style={[styles.card_main, styles.media_object]} className="card-main__media-object">
          <View style={[styles.media_object_anchor]} className="card-main__media-object-anchor">
            {this.props.link_to_ballot_item_page ? null :
              candidate_photo_url_html
            }

            {twitter_followers_count ?
              <View className={this.props.link_to_ballot_item_page? "twitter-followers__badge u-cursor--pointer" : "twitter-followers__badge" }>
                <View className="fa fa-twitter twitter-followers__icon" />
                <Text>{abbreviateNumber(twitter_followers_count)}</Text>
              </View> : null
            }
          </View>

          <View style={[styles.media_object_content]} className="card-main__media-object-content">
            <View className="card-main__display-name">
              { this.props.link_to_ballot_item_page ?
                <Text onPress={goToCandidateLink}>{ballot_item_display_name}</Text> :
                <Text style = {{fontSize: 20, color: '#333', fontWeight: 'bold'}}>{ballot_item_display_name}</Text>
              }
            </View>
            <BookmarkToggle we_vote_id={we_vote_id} type="CANDIDATE"/>
            <View className={this.props.link_to_ballot_item_page ? "u-gray-darker u-cursor--pointer" : "u-gray-darker"}
                  onClick={this.props.link_to_ballot_item_page ? goToCandidateLink : null }>
              { contest_office_name ?
                <OfficeNameText political_party={party} contest_office_name={contest_office_name} /> :
                null
              }
            </View>
            { twitter_description ?
              <View className={ "u-stack--sm" + (this.props.link_to_ballot_item_page ? " card-main__description-container--truncated" : " card-main__description-container")}>
                <View>
                  <Text style = {{fontSize: 15}}>{twitter_description}</Text>
                </View>
                { this.props.link_to_ballot_item_page ?
                  <Text onPress={goToCandidateLink} className="card-main__read-more-link">&nbsp;Read more</Text> :
                  null
                }
              </View> :
              null
            }
            <View className={"card-main__network-positions u-stack--sm" + this.props.link_to_ballot_item_page && " u-cursor--pointer"}
                 onClick={ this.props.link_to_ballot_item_page ? goToCandidateLink : null} >
              { positions_in_your_network ?
                <ItemSupportOpposeCounts we_vote_id={we_vote_id}
                                         supportProps={supportProps}
                                         transitioning={transitioning}
                                         type="CANDIDATE"
                                         positionBarIsClickable /> : null
              }

            </View>
          </View>
      </View>
    </View>;
  }
}
