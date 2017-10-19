import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
//import { Modal } from "react-bootstrap";
import BookmarkStore from "../../stores/BookmarkStore";
import BookmarkActions from "../../actions/BookmarkActions";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterStore from "../../stores/VoterStore";
import Icon from "react-native-vector-icons/FontAwesome";
//var Icon = require("react-svg-icons");

export default class BookmarkToggle extends Component {
  static propTypes = {
    we_vote_id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      showBookmarkToggleHelpModal: false,
    };
  }

  componentWillUnmount () {
    this.token.remove();
    this.voterStoreListener.remove();
  }

  // componentDidMount ()  Doesn't work in react-native?
  componentWillMount () {
    this.token = BookmarkStore.addListener(this._onChange.bind(this));
    this._onChange();

    this._onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
  }

  _onChange () {
    this.setState({ is_bookmarked: BookmarkStore.get(this.props.we_vote_id) || false});
  }

  _onVoterStoreChange () {
    this.setState({ voter: VoterStore.getVoter() });
  }

  BookmarkClick () {
    var we_vote_id = this.props.we_vote_id;
    var bookmarked = this.state.is_bookmarked;
    if (bookmarked) {
      BookmarkActions.voterBookmarkOffSave(we_vote_id, this.props.type);
    } else {
      BookmarkActions.voterBookmarkOnSave(we_vote_id, this.props.type);
      let bookmark_action_modal_has_been_shown = VoterStore.getInterfaceFlagState(VoterConstants.BOOKMARK_ACTION_MODAL_SHOWN);
      if (!bookmark_action_modal_has_been_shown) {
        this.toggleBookmarkToggleHelpModal();
        VoterActions.voterUpdateInterfaceStatusFlags(VoterConstants.BOOKMARK_ACTION_MODAL_SHOWN);
      }
    }
  }

  BookmarkKeyDown (e) {
    let enterAndSpaceKeyCodes = [13, 32];
    if (enterAndSpaceKeyCodes.includes(e.keyCode)) {
      this.BookmarkClick().bind(this);
    }
  }

  toggleBookmarkToggleHelpModal () {
    this.setState({
      showBookmarkToggleHelpModal: !this.state.showBookmarkToggleHelpModal,
    });
  }

	render () {
    if (this.state.is_bookmarked === undefined){
      return <View className="bookmark-action" />;
    }

    const BookmarkToggleHelpModal = <View />;
    // This modal is shown when the user bookmarks a ballot item for the first time.
    /*const BookmarkToggleHelpModal = <Modal show={this.state.showBookmarkToggleHelpModal} onHide={()=>{this.toggleBookmarkToggleHelpModal();}}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-center">Bookmark</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="card">
          <div className="text-center">
            You have just bookmarked this ballot item.<br />
            <br />
            Find 'Your Bookmarked Items' by clicking the profile photo or icon in the upper right corner of the top navigation.<br />
            <br />
          </div>
        </section>
      </Modal.Body>
    </Modal>;*/

    return <View tabIndex="0"
                 className="bookmark-action"
                 onPress={this.BookmarkClick.bind(this)}
                 onKeyDown={this.BookmarkKeyDown.bind(this)}
                 title="Bookmark for later">
              {this.state.is_bookmarked ?
                <Icon name="bookmark" size={24} color="lightgray" onPress={this.BookmarkClick.bind(this)}/> :
                <Icon name="bookmark-o" size={24} color="grey" onPress={this.BookmarkClick.bind(this)}/>
              }
            { this.state.showBookmarkToggleHelpModal ? BookmarkToggleHelpModal : null }
          </View>;
	}
}
