import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ListView } from "react-native";
import PropTypes from 'prop-types';
import { Link } from "react-router-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CopyLinkModal from "../../components/Widgets/CopyLinkModal";

export default class ShareButtonDropdown extends Component {
  static propTypes = {
    params: PropTypes.object,
    shareIcon: PropTypes.object,
    shareText: PropTypes.string,
    urlBeingShared: PropTypes.string
  };

  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      open: false,
      dataSource: ds.cloneWithRows(['Copy Link', 'Share On Facebook']),
    };
  }

  componentWillMount () {
    this.setState({
      showCopyLinkModal: false,
      transitioning: false
    });
  }

  closeDropdown () {
    this.setState({ open: false });
  }

  openDropdown () {
    this.setState({ open: true });
  }

  shareFacebookComment (event) {
    event.stopPropagation();
    window.FB.ui({
      display: "popup",
      method: "share",
      // Sharing this href link to facebook(href must be a valid url else facebook share popup will be having issues)
      href: this.props.urlBeingShared,
      redirect_uri: this.props.urlBeingShared   // redirecting to the same url after sharing on facebook
    }, function (){});
    this.closeDropdown();
 }

  closeCopyLinkModal () {
    this.setState({ showCopyLinkModal: false });
  }

  openCopyLinkModal (event) {
    event.stopPropagation();
    this.setState({ showCopyLinkModal: true });
    this.closeDropdown();
  }

  onButtonBlur () {
    // Delay closing the drop down so that onClick has time to work
    var temp_this = this;
    setTimeout(function () {
      temp_this.closeDropdown();
      }, 250);
  }

  render () {
    const {shareIcon, shareText, urlBeingShared} = this.props;
    const onClick = this.state.open ? this.closeDropdown.bind(this) : this.openDropdown.bind(this);
    const onCopyLinkClick = this.state.showCopyLinkModal ? this.closeCopyLinkModal.bind(this) : this.openCopyLinkModal.bind(this);
    // const onButtonBlur = ;
    const dropdownClass = this.state.open ? " open" : "";

    return <View className="item-actionbar__btn-set">
      <View className={"btn-group" + dropdownClass}>
        <TouchableOpacity onBlur={this.onButtonBlur.bind(this)} onPress={onClick} className="dropdown-toggle item-actionbar__btn btn btn-default">
          {shareIcon} {shareText} <span className="caret" />
        </TouchableOpacity>
        {this.state.open ?
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Text>{data}</Text></View>}
              />

          /*<ul className="dropdown-menu">
            <li>
              <Text onPress={onCopyLinkClick}>
                  Copy link
              </Text
            </li>
            <li>
              <Text onPress={this.shareFacebookComment.bind(this)}>
                  Share on Facebook
              </Text>
            </li>
          </ul>*/ :
          null
        }
        </View>
      /*<CopyLinkModal show={this.state.showCopyLinkModal}
                     onHide={this.closeCopyLinkModal.bind(this)}
                     urlBeingShared={urlBeingShared} />*/
    </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});