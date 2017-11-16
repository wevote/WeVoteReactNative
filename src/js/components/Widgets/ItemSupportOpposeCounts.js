import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from "react-native";

export default class ItemSupportOpposeCounts extends Component {
  static propTypes = {
    supportProps: PropTypes.object,
    guideProps: PropTypes.array,
    positionBarIsClickable: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      supportProps: this.props.supportProps,
      guideProps: this.props.guideProps,
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      supportProps: nextProps.supportProps,
      guideProps: nextProps.guideProps,
    });
  }

  percentageMajority () {
    const { support_count, oppose_count } = this.state.supportProps;
    return Math.round(100 * Math.max(support_count, oppose_count) / (support_count + oppose_count));
  }

  render () {
    if (this.state.supportProps === undefined) {
      return null;
    }

    let { support_count, oppose_count, is_support, is_oppose } = this.state.supportProps;
    if (support_count === undefined || oppose_count === undefined || is_support === undefined || is_oppose === undefined) {
      return null;
    }

    let bar_style = {
      width: this.percentageMajority() + "%"
    };

    let empty_bar_style = {
      borderWidth: 0,
      width: "100%",
    };

    let is_empty = support_count === 0 && oppose_count === 0;
    let is_support_and_oppose = support_count !== 0 && oppose_count !== 0;
    let is_majority_support = support_count >= oppose_count;

    let background_bar_class_name;
    if (is_support_and_oppose && is_majority_support) {
      // If there are both support and oppose positions, change the color of the bar background to the minority position
      background_bar_class_name = "network-positions__bar-well red-bar";
    } else if (is_support_and_oppose && !is_majority_support) {
      // If there are both support and oppose positions, change the color of the bar background to the minority position
      background_bar_class_name = "network-positions__bar-well green-bar";
    } else {
      background_bar_class_name = "network-positions__bar-well";
    }

    let supportOpposePopoverText = "This is a summary of the “support” and “oppose” positions from your network.";
    if (!this.props.positionBarIsClickable) {
      supportOpposePopoverText += " Click to see more detail.";
    }
    // const supportOpposePopoverTooltip = <Tooltip id="supportOpposeTooltip">{supportOpposePopoverText}</Tooltip>;

    let nonSupportOpposePopoverText = "This will show a summary of the “support” and “oppose” positions from your network.";
    if (!this.props.positionBarIsClickable) {
      nonSupportOpposePopoverText += " Click to see voter guides you can follow.";
    }
    // const nonSupportOpposePopoverTooltip = <Tooltip id="nonSupportOpposeTooltip">{nonSupportOpposePopoverText}</Tooltip>;

    return <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className="network-positions">
      {/*<View className="network-positions__bar-label">
        {!is_empty ?
          "Positions in your network" :
          "No positions in your network"
        }
      </View>*/}
      <View style={{flexDirection: 'row'}} className="network-positions__support">
        { !is_empty && is_majority_support ?
          <Image source={require('../../../img/global/icons/up-arrow-color-icon.png')}
                 className="network-positions__support-icon u-push--xs" style={{width: 20, height: 20}} /> :
          <Image source={require('../../../img/global/icons/up-arrow-gray-icon.png')}
                 className="network-positions__support-icon u-push--xs" style={{width: 20, height: 20}} />
        }
        <View className="network-positions__count">
          <Text className="sr-only">{!is_empty ? support_count : 0}</Text>
        </View>
      </View>
      {is_empty ?
        <View className={background_bar_class_name}>
          {/*<OverlayTrigger placement="top" overlay={nonSupportOpposePopoverTooltip}>*/}
            <View className="network-positions__bar" style={ !is_empty ? bar_style : empty_bar_style } >
              <Text className="sr-only"> Empty position bar </Text>
            </View>
          {/*</OverlayTrigger>*/}
        </View> :
        <View className={background_bar_class_name}>
          {/*<OverlayTrigger placement="top" overlay={supportOpposePopoverTooltip}>*/}
            <View className={ is_majority_support ?
              "network-positions__bar network-positions__bar--majority network-positions__bar--support" :
              "network-positions__bar network-positions__bar--majority network-positions__bar--oppose" }
                 style={ !is_empty ? bar_style : empty_bar_style }>
              <Text className="sr-only"> {this.percentageMajority()}% Supports </Text>
            </View>
          {/*</OverlayTrigger>*/}
        </View>
      }

      <View style={{flexDirection: 'row'}} className="network-positions__oppose">
        <View className="network-positions__count u-push--xs">
          <Text className="sr-only"> {!is_empty ? oppose_count : 0}</Text>
        </View>
        <Image source={ !is_empty && !is_majority_support ? require("../../../img/global/icons/down-arrow-color-icon.png") : require("../../../img/global/icons/down-arrow-gray-icon.png") }
               className="network-positions__oppose-icon" style={{width: 20, height: 20}} />
      </View>
    </View>;
  }
}
