import React, { Component } from "react";
import PropTypes from 'prop-types';
//import { Modal } from "react-bootstrap";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SupportActions from "../../actions/SupportActions";
import ShareButtonDropdown from "./ShareButtonDropdown";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterStore from "../../stores/VoterStore";
import PositionPublicToggle from "../../components/Widgets/PositionPublicToggle";

//var Icon = require("react-svg-icons");

const web_app_config = require("../../config");

export default class ItemActionBar extends Component {
  static propTypes = {
    ballot_item_we_vote_id: PropTypes.string.isRequired,
    commentButtonHide: PropTypes.bool,
    shareButtonHide: PropTypes.bool,
    supportProps: PropTypes.object,
    toggleFunction: PropTypes.func,
    type: PropTypes.string.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      showSupportOrOpposeHelpModal: false,
      transitioning: false,
    };
  }

  componentDidMount () {
    this.toggleSupportOrOpposeHelpModal = this.toggleSupportOrOpposeHelpModal.bind(this);
  }

  componentWillReceiveProps () {
    this.setState({transitioning: false});
  }

  supportItem (is_support) {
    if (is_support) {this.stopSupportingItem(); return;}
    if (this.state.transitioning){ return; }
    let support_oppose_modal_has_been_shown = VoterStore.getInterfaceFlagState(VoterConstants.SUPPORT_OPPOSE_MODAL_SHOWN);
    if (!support_oppose_modal_has_been_shown) {
      this.toggleSupportOrOpposeHelpModal();
      VoterActions.voterUpdateInterfaceStatusFlags(VoterConstants.SUPPORT_OPPOSE_MODAL_SHOWN);
    }
    SupportActions.voterSupportingSave(this.props.ballot_item_we_vote_id, this.props.type);
    this.setState({transitioning: true});
  }

  stopSupportingItem () {
    if (this.state.transitioning){ return; }
    SupportActions.voterStopSupportingSave(this.props.ballot_item_we_vote_id, this.props.type);
    this.setState({transitioning: true});
  }

  opposeItem (is_oppose) {
    if (is_oppose) {this.stopOpposingItem(); return;}
    if (this.state.transitioning){ return; }
    let support_oppose_modal_has_been_shown = VoterStore.getInterfaceFlagState(VoterConstants.SUPPORT_OPPOSE_MODAL_SHOWN);
    if (!support_oppose_modal_has_been_shown) {
      this.toggleSupportOrOpposeHelpModal();
      VoterActions.voterUpdateInterfaceStatusFlags(VoterConstants.SUPPORT_OPPOSE_MODAL_SHOWN);
    }
    SupportActions.voterOpposingSave(this.props.ballot_item_we_vote_id, this.props.type);
    this.setState({transitioning: true});
  }

  stopOpposingItem () {
    if (this.state.transitioning){ return; }
    SupportActions.voterStopOpposingSave(this.props.ballot_item_we_vote_id, this.props.type);
    this.setState({transitioning: true});
  }

  toggleSupportOrOpposeHelpModal () {
    this.setState({
      showSupportOrOpposeHelpModal: !this.state.showSupportOrOpposeHelpModal,
    });
  }

  render () {
    if (this.props.supportProps === undefined){
      // console.log("ItemActionBar, supportProps undefined");
      return null;
    }

    var {support_count, oppose_count, is_support, is_oppose } = this.props.supportProps;
    if (support_count === undefined || oppose_count === undefined || is_support === undefined || is_oppose === undefined){
      // console.log("ItemActionBar, support_count: ", support_count, ", oppose_count: ", oppose_count, ", is_support: ", is_support, ", or is_oppose: ", is_oppose, "");
      return null;
    }
    const icon_size = 18;
    var icon_color = "#999";
    // TODO Refactor the way we color the icons
    var support_icon_color = is_support ? "green" : "#999";
    var oppose_icon_color = is_oppose ? "green" : "#999";
    var url_being_shared;
    if (this.props.type === "CANDIDATE") {
      url_being_shared = web_app_config.WE_VOTE_URL_PROTOCOL + web_app_config.WE_VOTE_HOSTNAME + "/candidate/" + this.props.ballot_item_we_vote_id;
    } else {
      url_being_shared = web_app_config.WE_VOTE_URL_PROTOCOL + web_app_config.WE_VOTE_HOSTNAME + "/measure/" + this.props.ballot_item_we_vote_id;
    }
    const share_icon = (<Icon name="share" size={24} color="lightgray"/>);

    // This modal is shown when user clicks on support or oppose button for the first time only.
    let modalSupportProps = { is_public_position: false };
    const SupportOrOpposeHelpModal = <View />;
    /*const SupportOrOpposeHelpModal = <Modal show={this.state.showSupportOrOpposeHelpModal} onHide={()=>{this.toggleSupportOrOpposeHelpModal();}}>
      <Modal.Header closeButton>
        <Modal.Title>
          <View className="text-center">Support or Oppose</View>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="card">
          <View className="text-center">
            <Text> Your position is only visible to your We Vote friends. Change the privacy toggle to make your views public.
            Test the toggle here: </Text>
            <PositionPublicToggle ballot_item_we_vote_id="null"
                                  className="null"
                                  type="MEASURE"
                                  supportProps={modalSupportProps}
                                  inTestMode
            />
          </View>
        </section>
      </Modal.Body>
    </Modal>;*/

    return <View className={ this.props.shareButtonHide ? "item-actionbar--inline" : "item-actionbar" }>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className={"btn-group" + (!this.props.shareButtonHide ? " u-push--sm" : "")}>
              {/* Start of Support Button */}
              <TouchableOpacity style={{alignSelf: 'flex-end'}} className={"item-actionbar__btn item-actionbar__btn--support btn btn-default" + (is_support ? " support-at-state" : "")} onPress={this.supportItem.bind(this, is_support)}>
                <Icon name="thumbs-up" size={icon_size} color={support_icon_color} />
                { is_support ?
                  <Text
                    className={ this.props.shareButtonHide ? "item-actionbar--inline__position-btn-label" : "item-actionbar__position-btn-label__position-at-state" }>Support &nbsp;</Text> :
                  <Text
                    className={ this.props.shareButtonHide ? "item-actionbar--inline__position-btn-label" : "item-actionbar__position-btn-label" }>Support &nbsp;</Text>
                }
              </TouchableOpacity>
              {/* Start of Oppose Button */}
              <TouchableOpacity style={{alignSelf: 'flex-end'}} className={"item-actionbar__btn item-actionbar__btn--oppose btn btn-default" + (is_oppose ? " oppose-at-state" : "")} onPress={this.opposeItem.bind(this, is_oppose)}>
                <Icon name="thumbs-down" size={icon_size} color={oppose_icon_color} />
                { is_oppose ?
                  <Text
                    className={ this.props.shareButtonHide ? "item-actionbar--inline__position-btn-label" : "item-actionbar__position-btn-label__position-at-state" }>Oppose</Text> :
                  <Text
                    className={ this.props.shareButtonHide ? "item-actionbar--inline__position-btn-label" : "item-actionbar__position-btn-label" }>Oppose</Text>
                }
              </TouchableOpacity>
            </View>
      { this.props.commentButtonHide ?
        null :
         <TouchableOpacity className="item-actionbar__btn item-actionbar__btn--comment btn btn-default u-push--sm" onPress={this.props.toggleFunction}>
            <Icon name="comment" size={icon_size} color={icon_color} />
            <Text className="item-actionbar__position-btn-label">Comment</Text>
          </TouchableOpacity> }

      { this.props.shareButtonHide ?
        null :
        <ShareButtonDropdown urlBeingShared={url_being_shared} shareIcon={share_icon} shareText={"Share"} /> }
      { this.state.showSupportOrOpposeHelpModal ? SupportOrOpposeHelpModal : null}
    </View>;
  }
}
