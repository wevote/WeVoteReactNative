import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-native";
import { View, Text, Image } from "react-native";
import GuideStore from "../../stores/GuideStore";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";
import ballotStyles from "../../stylesheets/BallotStyles"

//import { Link, browserHistory } from "react-router";


export default class OfficeItemReadyToVote extends Component {
  static propTypes = {
    key: PropTypes.string,
    we_vote_id: PropTypes.string.isRequired,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    candidate_list: PropTypes.array
  };
  constructor (props) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  componentDidMount () {
    this.guideStoreListener = GuideStore.addListener(this._onGuideStoreChange.bind(this));
    this._onGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this._onSupportStoreChange.bind(this));
    // console.log("OfficeItemCompressed, this.props.we_vote_id: ", this.props.we_vote_id);
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
    // We just want to trigger a re-render
    this.setState({ transitioning: false });
    // console.log("_onSupportStoreChange");
  }

  render () {
    let { ballot_item_display_name, we_vote_id } = this.props;
    let officeLink = "/office/" + we_vote_id;
    let goToOfficeLink = function () { browserHistory.push(officeLink); };
    let is_support_array = [];
    let candidate_with_most_support = null;
    let voter_supports_at_least_one_candidate = false;
    let supportProps;
    let is_support;

    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    this.props.candidate_list.forEach((candidate) => {
      supportProps = SupportStore.get(candidate.we_vote_id);
      if (supportProps) {
        is_support = supportProps.is_support;

        if (is_support) {
          is_support_array.push(candidate.ballot_item_display_name);
          voter_supports_at_least_one_candidate = true;
        }
      }
    });

    /* This function finds the highest support count for each office but does not handle ties. If two candidates have the
    same network support count, only the first candidate will be displayed. */
    let largest_support_count;
    let at_least_one_candidate_chosen = false;

    if (is_support_array.length === 0){
      let network_support_count;
      let network_oppose_count;

      this.props.candidate_list.forEach((candidate) => {
        largest_support_count = 0;
        supportProps = SupportStore.get(candidate.we_vote_id);
        if (supportProps) {
          network_support_count = supportProps.support_count;
          network_oppose_count = supportProps.oppose_count;

          if (network_support_count > network_oppose_count) {
            if (network_support_count > largest_support_count) {
              largest_support_count = network_support_count;
              candidate_with_most_support = candidate.ballot_item_display_name;
              at_least_one_candidate_chosen = true;
            }
          }
        }
      });
    }

    return <View style={ballotStyles.container} className="card-main office-item">
      <View className="card-main__content">
        { this.props.link_to_ballot_item_page ?
          <Link to={officeLink}><Text style={ballotStyles.titleText}>{ballot_item_display_name}</Text></Link> :
            <Text style={ballotStyles.titleText}>{ballot_item_display_name}</Text>
        }

        <View style={{flexDirection: 'row', justifyContent:'space-between'}} className={ this.props.link_to_ballot_item_page ?
                "u-cursor--pointer" : null } >
          { this.props.candidate_list.map( (one_candidate) =>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}} key={one_candidate.we_vote_id}>
              {/* *** Candidate name *** */}
              { SupportStore.get(one_candidate.we_vote_id) && SupportStore.get(one_candidate.we_vote_id).is_support ?
                <View style={{flexDirection: 'row'}} className="u-flex u-items-center">
                  <View style={{alignSelf: 'flex-start'}} className="u-flex-auto u-cursor--pointer" onPress={ this.props.link_to_ballot_item_page ?
                  goToOfficeLink : null }>
                    <Text> {one_candidate.ballot_item_display_name} </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
                    <Text className="u-inline--xs">Supported by you</Text>
                    <Image source={require("../../../img/global/icons/thumbs-up-color-icon.png")} style={{width:24, height:24}} />
                  </View>
                </View> :

                  candidate_with_most_support === one_candidate.ballot_item_display_name ?

                <View style={{flexDirection: 'row', justifyContent:'space-between'}} className="u-flex u-items-center">
                  <View style={{flexDirection: 'row'}} className="u-flex-auto u-cursor--pointer" onPress={ this.props.link_to_ballot_item_page ?
                    goToOfficeLink : null }>
                    <Text>
                      {one_candidate.ballot_item_display_name}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'flex-end' }} className="u-flex-none u-justify-end">
                    <Text className="u-inline--xs">Your network supports</Text>
                    <Image source={require("../../../img/global/icons/up-arrow-color-icon.png")} className="network-positions__support-icon" style={{width:20, height:20}} />
                  </View>
                </View> :
                  is_support_array === 0 && candidate_with_most_support !== one_candidate.ballot_item_display_name && !voter_supports_at_least_one_candidate ?
                  <View className="u-flex-none u-justify-end"><Text>Your network is undecided</Text></View> :
                    null}
              {/* *** "Positions in your Network" bar OR items you can follow *** */}
          </View>)
          }
          { voter_supports_at_least_one_candidate ? null :
              <View>
              { at_least_one_candidate_chosen ? null :
                <Text className="u-tr">Your network is undecided</Text>
              }
              </View>
          }
        </View>
      </View>
    </View>;
  }
}
