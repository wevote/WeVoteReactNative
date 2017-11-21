import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal'
import PropTypes from 'prop-types';

import styles from "../../stylesheets/components/baseStyles"
const logging = require("../../utils/logging");

export default class WarningModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    toggleFunction: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let textLines = null;
    if (!this.props.text ) {
      textLines = ['Default warning!', 'Default warning!'];
    } else {
      textLines = this.props.text;
    }
    if (!Array.isArray(this.props.text)) {
      textLines = [textLines];
    }

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationIn='slideInUp'
          animationOut='slideInDown'
          transparent={false}
          isVisible={this.props.show}
          onBackdropPress={this.props.toggleFunction}
        >
          <View style={styles.outer_gray_pane} >
            <View style={styles.inner_white_pane} >
              { textLines.map( (item) => <Text style={styles.title_padded_text} key={item} >{item}</Text> ) }
              <TouchableHighlight style={styles.button} onPress={this.props.toggleFunction} >
                <Text style={styles.button_text}>Ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}