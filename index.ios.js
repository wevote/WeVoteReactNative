import React from 'react';
import {
  StackNavigator, TabNavigator
} from 'react-navigation';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import LoadingScreen from './src/js/components/LoadingScreen/LoadingScreen';
import Ballot from './src/js/components/Ballot/Ballot';
import BallotDetails from './src/js/components/BallotDetails/BallotDetails'
import Organizations from './src/js/components/Organizations/Organizations'
import Friends from './src/js/components/Friends/Friends'
import About from './src/js/components/About/About'
import configureStore from './src/js/stores/store'

let store = configureStore();

const BallotStack = StackNavigator({
  Ballot: {screen: Ballot},
  BallotDetails: {screen: BallotDetails, navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`
    })}
})

const OrganizationStack = StackNavigator({
  Organizations: {screen: Organizations}
})

const FriendsStack = StackNavigator({
  Friends: {screen: Friends}
})

const AdminStack = StackNavigator({
  About: {screen: About}
})

const Tabs = TabNavigator({
  BallotStack: {screen: BallotStack, navigationOptions: {
    header: null,
  }},
  OrganizationStack: {screen: OrganizationStack, navigationOptions: {
    header: null,
  }},
  FriendsStack: {screen: FriendsStack, navigationOptions: {
    header: null,
  }},
  AdminStack: {screen: AdminStack, navigationOptions: {
    header: null,
  }},
},
  {
    tabBarOptions: { activeTintColor: '#e91e63',},
  });


let AppStack = StackNavigator({
  Loading: {screen: LoadingScreen},
  Tabs: {screen: Tabs},
});

App = () => (<Provider store={store}><AppStack/></Provider>);



AppRegistry.registerComponent('WeVoteReactNative', () => App);
