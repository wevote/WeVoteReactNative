import React, { Component } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from '../stylesheets/components/baseStyles';
import styleConst from "../stylesheets/styleConst";


export default class WeVoteButtons extends Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    opacityStyles: PropTypes.array.isRequired,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    trailingPadding: PropTypes.number,
    onPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let iconSize = this.props.iconSize || 24;
    let iconColor = this.props.iconColor || styleConst.white;
    let isDisplayIcon = typeof this.props.iconName !== 'undefined';

    return (
      <View>
        <TouchableOpacity style={this.props.opacityStyles}
                          onPress={this.props.onPress}>
            { isDisplayIcon ?
              <View style={styles.flexRowSpaced}>
                <View style={{paddingTop:5}} >
                  <Icon name={this.props.iconName} size={iconSize} color={iconColor} paddingTop={10} />
                </View>
                <Text style = {styles.button_text}>{this.props.buttonLabel}</Text>
              </View>
              :
              <View style={styles.flexRowCentered}>
                <Text style = {styles.button_text}>{this.props.buttonLabel}</Text>
              </View>
            }

        </TouchableOpacity>
        { this.props.trailingPadding ? <Text style={{paddingBottom: this.props.trailingPadding}}/> : null }
      </View>
    );
  }
}
