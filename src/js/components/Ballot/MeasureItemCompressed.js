import React, { Component, PropTypes } from "react";
//import { Link, browserHistory } from "react-router";
import { Link } from "react-router-native";
import { View, Text, Image, StyleSheet } from "react-native";
import GuideStore from "../../stores/GuideStore";
import ItemActionBar from "../Widgets/ItemActionBar";
import ItemSupportOpposeCounts from "../Widgets/ItemSupportOpposeCounts";
import ItemTinyOpinionsToFollow from "../VoterGuide/ItemTinyOpinionsToFollow";
import BookmarkToggle from "../Bookmarks/BookmarkToggle";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";


export default class MeasureItemCompressed extends Component {
  static propTypes = {
    key: PropTypes.string,
    we_vote_id: PropTypes.string.isRequired,
    measure_subtitle: PropTypes.string,
    measure_text: PropTypes.string,
    position_list: PropTypes.array,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    measure_url: PropTypes.string,
    _toggleMeasureModal: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      transitioning: false,
      showModal: false,
      maximum_organization_display: 4,
    };
  }

  componentDidMount () {
    this.guideStoreListener = GuideStore.addListener(this._onGuideStoreChange.bind(this));
    this._onGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this._onSupportStoreChange.bind(this));
    this.setState({ supportProps: SupportStore.get(this.props.we_vote_id) });
  }

  componentWillUnmount () {
    this.guideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  _onGuideStoreChange (){
    // We just want to trigger a re-render
    this.setState({ transitioning: false });
    // console.log("_onGuideStoreChange");
  }

  _onSupportStoreChange () {
    this.setState({
      supportProps: SupportStore.get(this.props.we_vote_id),
      transitioning: false
    });
  }
  render () {
    //console.log("this.props", this.props);
    const { supportProps } = this.state;
    let support_count = 0;
    if (supportProps && supportProps.support_count) {
      // Only show ItemSupportOpposeCounts if your network has something to say
      support_count = supportProps.support_count;
    }
    let oppose_count = 0;
    if (supportProps && supportProps.oppose_count) {
      // Only show ItemSupportOpposeCounts if your network has something to say
      oppose_count = supportProps.oppose_count;
    }
    let ballot_item_display_name = this.props.ballot_item_display_name;
    let measure_subtitle = this.props.measure_subtitle;
    let measure_text = this.props.measure_text;  // Not currently defined
    let we_vote_id = this.props.we_vote_id;
    let measureLink = "/measure/" + we_vote_id;
    let goToMeasureLink = function () { browserHistory.push(measureLink); };

    measure_subtitle = capitalizeString(measure_subtitle);
    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    let measure_for_modal = {
      ballot_item_display_name: ballot_item_display_name,
      voter_guides_to_follow_for_ballot_item_id: GuideStore.getVoterGuidesToFollowForBallotItemId(this.props.we_vote_id),
      kind_of_ballot_item: this.props.kind_of_ballot_item,
      link_to_ballot_item_page: this.props.link_to_ballot_item_page,
      measure_subtitle: measure_subtitle,
      measure_text: this.props.measure_text,
      measure_url: this.props.measure_url,
      measure_we_vote_id: this.props.we_vote_id,
      position_list: this.props.position_list
    };
    // To get position_list
    // TODO DALE var measure = MeasureStore.get(this.state.measure_we_vote_id) || {};

    return <View style={styles.container} className="card-main measure-card">
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
        <View style={{alignSelf: 'flex-start'}}>
          { this.props.link_to_ballot_item_page ?
            <View style={{flexDirection: 'row'}}>
              <Link to={measureLink}>
                <Text style={styles.titleText}> {ballot_item_display_name} </Text>
              </Link>
              <Link to={measureLink}>
                <Text style={styles.measureReadMoreLink}> learn more </Text>
              </Link>
            </View> :
            <Text style={styles.titleText}>{ballot_item_display_name}</Text>
          }
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <BookmarkToggle we_vote_id={we_vote_id} type="MEASURE"/>
        </View>
      </View>
      <View>
        {/* Measure information */}
        <Text
          className={ this.props.link_to_ballot_item_page ?
          "u-cursor--pointer" : null }
          onPress={ this.props.link_to_ballot_item_page ?
          goToMeasureLink : null }
        >
          {measure_subtitle}
        </Text>
        { this.props.measure_text ?
          <Text className="measure_text">{measure_text}</Text> :
          null }
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* This is the area *under* the measure title/text */}
        <View className={"u-flex" + (this.props.link_to_ballot_item_page ?
                " u-cursor--pointer" : "") } >

          {/* Needed to force following flex area to the right */}
          <View className="MeasureItem__summary u-flex-auto" />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className="u-flex u-items-center">
            {/* *** "Positions in your Network" bar OR items you can follow *** */}
            <View style={{alignSelf: 'center'}} className="u-flex-none u-justify-end u-inline--md">
              <View className={ this.props.link_to_ballot_item_page ?
                      "u-cursor--pointer" :
                      null }
              >
              { support_count || oppose_count ?
                <View onPress={ this.props.link_to_ballot_item_page ?
                      ()=>{this.props._toggleMeasureModal(measure_for_modal);} :
                      null } >
                  <ItemSupportOpposeCounts we_vote_id={we_vote_id} supportProps={this.state.supportProps}
                                           type="MEASURE" />
                </View> :
                <View onPress={ this.props.link_to_ballot_item_page ?
                      ()=>{this.props._toggleMeasureModal(measure_for_modal);} : null } >
                  {/* Show possible voter guides to follow */}
                  { GuideStore.getVoterGuidesToFollowForBallotItemId(we_vote_id) && GuideStore.getVoterGuidesToFollowForBallotItemId(we_vote_id).length !== 0 ? null
                    /*<ItemTinyOpinionsToFollow ballotItemWeVoteId={we_vote_id}
                                              organizationsToFollow={GuideStore.getVoterGuidesToFollowForBallotItemId(we_vote_id)}
                                              maximumOrganizationDisplay={this.state.maximum_organization_display}/>*/ :
                    <View /> }
                </View> }
              </View>
            </View>
            <Text> &nbsp; &nbsp; </Text>
            {/* *** Choose Support or Oppose *** */}
            <View style={{alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
              <ItemActionBar ballot_item_we_vote_id={we_vote_id}
                             supportProps={this.state.supportProps}
                             shareButtonHide
                             commentButtonHide
                             transitioniing={this.state.transitioning}
                             type="MEASURE" />
            </View>
          </View>
        </View>

      </View>
    </View>;
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleText: {
	fontFamily: 'sans-serif',
	fontSize: 20,
	fontWeight: 'bold',
	color: '#48BBEC',
  },
  measureReadMoreLink: {
  	fontFamily: 'sans-serif',
  	fontSize: 15,
  	color: '#48BBEC',
  },
});