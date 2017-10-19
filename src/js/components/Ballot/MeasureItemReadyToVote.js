import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-native";
import { View, Text, Image, StyleSheet } from "react-native";
import GuideStore from "../../stores/GuideStore";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";


export default class MeasureItemReadyToVote extends Component {
  static propTypes = {
    key: PropTypes.string,
    we_vote_id: PropTypes.string.isRequired,
    measure_subtitle: PropTypes.string,
    measure_text: PropTypes.string,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    measure_url: PropTypes.string,
    _togglePopup: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {transitioning: false, showModal: false};
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
    this.setState({ supportProps: SupportStore.get(this.props.we_vote_id), transitioning: false });
  }

  render () {
    const { supportProps } = this.state;

    let { ballot_item_display_name,
        we_vote_id } = this.props;
    let measureLink = "/measure/" + we_vote_id;

    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    return <View style={styles.container} className="card-main measure-card">
      <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
        <View className="u-flex-auto u-cursor--pointer">
          { this.props.link_to_ballot_item_page ?
            <Link to={measureLink}><Text style={styles.titleText}>{ballot_item_display_name}</Text></Link> :
              <Text style={styles.titleText}>{ballot_item_display_name}</Text>
          }
        </View>

        {
          supportProps && supportProps.is_support ?
         <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
           <Text className="u-inline--xs">Supported by you</Text>
           <Image source={require("../../../img/global/icons/thumbs-up-color-icon.png")} style={{width:24, height:24}} />
         </View> :
          null
        }
        {
          supportProps && supportProps.is_oppose ?
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
              <Text className="u-inline--xs">Opposed by you</Text>
              <Image source={require("../../../img/global/icons/thumbs-down-color-icon.png")} style={{width:24, height:24}} />
            </View> :
              null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count > supportProps.oppose_count ?
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
            <Text className="u-inline--xs">Your network supports</Text>
            <Image source={require("../../../img/global/icons/up-arrow-color-icon.svg")} className="network-positions__support-icon" style={{width:20, height:20}} />
          </View> :
          null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count < supportProps.oppose_count ?
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} className="u-flex-none u-justify-end">
             <Text className="u-inline--xs">Your network opposes</Text>
             <Image source={require("../../../img/global/icons/down-arrow-color-icon.svg")} className="network-positions__oppose-icon" style={{width:20, height:20}} />
           </View> :
          null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count === supportProps.oppose_count ?
          <View className="u-flex-none u-justify-end">
            <Text>Your network is undecided</Text>
          </View> :
          null
        }

        {/* This is the area *under* the measure title */}
      {/* END .card-main__content */}
      </View>
    </View>;
  }
}

export var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleText: {
	fontFamily: 'sans-serif',
	fontSize: 15,
	fontWeight: 'bold',
	color: '#48BBEC',
  },
});
