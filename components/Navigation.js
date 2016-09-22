import React, { Component, PropTypes} from 'react';
import { StyleSheet, Navigator, BackAndroid, AsyncStorage  } from 'react-native';
import Ballot from './BallotListContainer'
import Loading from './LoadingContainer'
let BallotItemInfo = require('./BallotItemInfo').default;
var _navigator;

export default class Navigation extends Component{


  render() {
    return (
      <Navigator
        initialRoute={{id: 'Loading'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  componentDidMount() {

    BackAndroid.addEventListener('hardwareBackPress', () => {

      if (_navigator.getCurrentRoutes().length === 1  ) {
        return false;
      }
      _navigator.pop();
      return true;
    });

  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'Loading':
        return (<Loading navigator={navigator} {...route.props}/>);
      case 'BallotList':
        return (<Ballot navigator={navigator}{...route.props}/>);
      case 'BallotItemInfo':
        return (<BallotItemInfo navigator={navigator}{...route.props}/>);
    }
  }









}
