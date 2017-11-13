import React, { Component } from "react";
import PositionItem from "./PositionItem";
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";

export default class PositionList extends Component {
  static propTypes = {
    ballot_item_display_name: PropTypes.string.isRequired,
    position_list: PropTypes.array.isRequired,
    hideSimpleSupportOrOppose: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
      position_list: this.props.position_list
    };
  }

  componentWillReceiveProps (nextProps){
    this.setState({
      position_list: nextProps.position_list
    });
  }

  render () {
    if (!this.state.position_list) {
      return null;
    }
    if (this.props.hideSimpleSupportOrOppose) {
      // Only show a position if it has a comment associated with it
      return <View>
        <ul className="card-child__list-group">
          { this.state.position_list.map(one_position =>
            <View key={one_position.position_we_vote_id} >
            { one_position.statement_text || one_position.has_video ?
              <PositionItem ballot_item_display_name={this.props.ballot_item_display_name}
                            position={one_position} /> :
              null }
            </View>)
          }
        </ul>
      </View>;
    } else {
      return <View>
        <ul className="card-child__list-group">
          { this.state.position_list.map(one_position =>
            <PositionItem key={one_position.position_we_vote_id}
                          ballot_item_display_name={this.props.ballot_item_display_name}
                          position={one_position} />)
          }
        </ul>
      </View>;
    }
  }
}
