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
import item_action_bar_styles from "../../stylesheets/components/itemActionBar";
import flex_box_styles from "../../stylesheets/utilities/flexBoxStyles";
import layout_styles from "../../stylesheets/utilities/layoutStyles";

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

    let is_public_position = false;
    if (this.props.supportProps !== undefined && this.props.supportProps.is_public_position !== undefined) {
      is_public_position = this.props.supportProps.is_public_position;
    }

    const icon_size = 18;
    var icon_color = "#999";
    // TODO Refactor the way we color the icons
    var support_icon_color = is_support ? "white" : "#999";
    var oppose_icon_color = is_oppose ? "white" : "#999";
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
    const ballot_item_display_name = this.props.ballot_item_display_name || "";
    let supportButtonSelectedPopOverText = "Click to support";
    if (ballot_item_display_name.length > 0) {
      supportButtonSelectedPopOverText += " " + ballot_item_display_name + ".";
    } else {
      supportButtonSelectedPopOverText += ".";
    }

    if (is_public_position) {
      supportButtonSelectedPopOverText += " Your support will be visible to the public.";
    } else {
      supportButtonSelectedPopOverText += " Only your We Vote friends will see your support.";
    }
    let supportButtonUnselectedPopOverText = "Click to remove your support";
    if (ballot_item_display_name.length > 0) {
      supportButtonUnselectedPopOverText += " for " + ballot_item_display_name + ".";
    } else {
      supportButtonUnselectedPopOverText += ".";
    }

    let opposeButtonSelectedPopOverText = "Click to oppose";
    if (ballot_item_display_name.length > 0) {
      opposeButtonSelectedPopOverText += " " + ballot_item_display_name + ".";
    } else {
      opposeButtonSelectedPopOverText += ".";
    }

    if (is_public_position) {
      opposeButtonSelectedPopOverText += " Your opposition will be visible to the public.";
    } else {
      opposeButtonSelectedPopOverText += " Only your We Vote friends will see your opposition.";
    }
    let opposeButtonUnselectedPopOverText = "Click to remove your opposition";
    if (ballot_item_display_name.length > 0) {
      opposeButtonUnselectedPopOverText += " for " + ballot_item_display_name + ".";
    } else {
      opposeButtonUnselectedPopOverText += ".";
    }

    // const supportButtonPopoverTooltip = <Tooltip id="supportButtonTooltip">{is_support ? supportButtonUnselectedPopOverText : supportButtonSelectedPopOverText }</Tooltip>;
    // const opposeButtonPopoverTooltip = <Tooltip id="opposeButtonTooltip">{is_oppose ? opposeButtonUnselectedPopOverText : opposeButtonSelectedPopOverText}</Tooltip>;

    return <View style={this.props.shareButtonHide ? [item_action_bar_styles.item_actionbar__inline, flex_box_styles.u_flex_row, layout_styles.u_stack__sm] : [item_action_bar_styles.item_actionbar, flex_box_styles.u_flex_row, layout_styles.u_stack__sm]}
      className={ this.props.shareButtonHide ? "item-actionbar--inline  hidden-print" : "item-actionbar  hidden-print" }>
      <View style={[this.props.shareButtonHide ? "" : layout_styles.u_push__md, item_action_bar_styles.btn_group, flex_box_styles.u_flex_row]}
            className={"btn-group" + (!this.props.shareButtonHide ? " u-push--sm" : "")}>
        {/* Start of Support Button */}
        <TouchableOpacity style={[item_action_bar_styles.button, is_support ? item_action_bar_styles.support_at_state : null]} onPress={this.supportItem.bind(this, is_support)}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="thumbs-up" size={icon_size} color={support_icon_color} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[item_action_bar_styles.button, is_oppose ? item_action_bar_styles.oppose_at_state: null]  } onPress={this.opposeItem.bind(this, is_oppose)}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{paddingTop: 5}}>
              <Icon name="thumbs-down" size={icon_size} color={oppose_icon_color} />
            </View>
          </View>
        </TouchableOpacity>

      </View>
      { this.props.commentButtonHide ?
        null :
         <TouchableOpacity style={[item_action_bar_styles.button, layout_styles.u_push__md]} onPress={this.props.toggleFunction}>
            <Icon name="comment" size={icon_size} color={icon_color} />
         </TouchableOpacity>
      }

      { this.props.shareButtonHide ?
        <View/>:
        <ShareButtonDropdown urlBeingShared={url_being_shared} shareIcon={share_icon} shareText={"Share"} />
      }
      { this.state.showSupportOrOpposeHelpModal ? SupportOrOpposeHelpModal : null}
    </View>;
  }
}
