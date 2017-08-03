import React, {Component} from 'react';
import {
  StackNavigator, TabNavigator
} from 'react-navigation';
import { Text, View} from 'react-native';
//import {nativeHistory, Router } from "react-router-native";
//import routes from "./Root";
//import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Ballot from '../../scenes/Ballot/Ballot';
//import BallotDetails from '../../components/BallotDetails/BallotDetails'
//import Organizations from '../../components/Organizations/Organizations'
//import Friends from '../../components/Friends/Friends'
//import About from '../../components/About/About'

import SignIn from '../More/SignIn';

const Tabs = TabNavigator({
  SignIn: {screen: SignIn, navigationOptions: {
    header: null,
  }},
  Ballot: {screen: Ballot, navigationOptions: {
    header: null,
  }},
},
  {
    tabBarOptions: { activeTintColor: '#e91e63',},
  });


const AppStack = StackNavigator({
  //Loading: {screen: LoadingScreen},
  Tabs: {screen: Tabs},
});

class App extends Component{
  render(){
    return(
        <AppStack/>
      );
  }
}

export default App;
