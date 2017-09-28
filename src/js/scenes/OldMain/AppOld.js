import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Linking, Text, View} from 'react-native';
import Ballot from '../../scenes/Ballot/Ballot';
import SignIn from '../SignIn/SignIn';
//import { } from "react-router-native";
//import routes from "./Root";
//import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
//import BallotDetails from '../../components/BallotDetails/BallotDetails'
//import Organizations from '../../components/Organizations/Organizations'
//import Friends from '../../components/Friends/Friends'
//import About from '../../components/About/About'



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

  constructor (props) {
    super(props);
  }


  render(){
    return(
        <AppStack/>
      );
  }
}


export default App;


// componentWillMount() {
//   Linking.addEventListener('url', this.handleDeepLink);
//
//   console.log("STEVE CCCCCCCCCCCCCCCCCCCC AppOld.js this.componentWillMount() " );
//
//   // Linking.getInitialURL().then((url) => {
//   //   if (url) {
//   //     console.log('Initial url is: ' + url);
//   //   }
//   // }).catch(err => console.error('An error occurred', err));
//   //
//   //
//   // // let url2 = "wevotetwitterscheme://twitter_sign_in";
//   // let url2 = "wevotetwitterscheme://twitter_sign_in_test";
//   // Linking.canOpenURL(url2).then(supported => {
//   //   if (!supported) {
//   //     console.log('STEVE CCCCCCCCCCCCCCCCCCCC Failure ... Can\'t handle url: ' +  url2);
//   //   } else {
//   //     console.log('STEVE CCCCCCCCCCCCCCCCCCCC Success ... Opening url2: ' + url2)
//   //     return Linking.openURL(url2);
//   //   }
//   // }).catch(err => console.error('STEVE CCCCCCCCCCCCCCCCCCCC ERROR ... and error occurred', err));
//
// };
//
// componentWillUnmount() {
//   Linking.removeEventListener('url', this.handleDeepLink);
// };
//
// handleDeepLink(event) {
//
//   console.log("STEVE SUCCESS, Received a handleDeepLink event" + event.url);
//
//
//
//   const route = event.url.replace(/.*?:\//g, "");
//
//   // Sept 2017, no idea where this one came from: this._navigator.replace(this.state.routes[route]);
//
//   //     In the simulator, navigating to "wevotetwitterscheme://twitter_sign_in" will get you here with route /twitter_sign_in
//   // Sept 2017, Routing
//
//   //nativeRoutes.push(route);
// }
