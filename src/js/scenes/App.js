import React from 'react';
import { Text, Image, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/FontAwesome";
import VoterStore from "../stores/VoterStore";
import tabStyles from "../stylesheets/TabBarStyles"


import Ballot from './Ballot/Ballot';
import Candidate from './Ballot/Candidate';
import Location from './Settings/Location';
import SignIn from './SignIn/SignIn';
import TwitterSignInProcess from "./SignIn/TwitterSignInProcess";
import SocialSignIn from "./SignIn/SocialSignIn";
import Welcome from "./Welcome/Welcome";

const tabIcon = ({ selected, tabBarLabel }) => {
  switch (tabBarLabel) {
    case 'Sign In':
      let voterImage = VoterStore.getVoterPhotoUrlTiny();
      if (voterImage === "") {
        return <Image style={tabStyles.image} source={
          require('../../img/global/icons/avatar-generic.png')}/>;
      } else {
        return <Image style={tabStyles.image} source={{uri: voterImage}}/>;
      }

    case 'Ballot':
      return(
        <View style={tabStyles.ballotButtonContainer} >
          <Icon name="list-alt" size={22} color="white" width={10} />
          <Text style={tabStyles.ballotText}>Ballot</Text>
        </View> );

    case 'Welcome':
    default:
      return <Text style={tabStyles.textSelected} >{tabBarLabel}</Text>;
  }
};


/* Some good articles on react-native-router-flux (RNRF) which is based on react-navigation (NOT on react-native-router!)
 https://medium.com/differential/react-native-basics-using-react-native-router-flux-f11e5128aff9
 https://medium.com/the-react-native-log/thousand-ways-to-navigate-in-react-native-f7a1e311a0e8
 https://medium.com/@psak.works/react-navigation-without-redux-887ad8a6b394

 See https://github.com/wevote/WebApp/blob/develop/src/js/Root.jsx  for the routes we use in WebApp
*/

const App = () => {

  return (
    <Router>
      <Scene key="root">
        {/* Tab Container */}
        <Scene
          key="tabbar"
          tabs={true}
          tabBarPosition="top"
          showIcon={true}
          showLabel={false}
          tabBarStyle={tabStyles.tabBar}>
          {/* WV Tab */}
          <Stack key="we_vote_1"
                 hideNavBar
                 tabBarLabel={"WV"}
                 icon={tabIcon} >
            <Scene key="welcome"
                   component={Welcome}
                   type='replace'
                   initial />
          </Stack>
          {/* Ballot Tab */}
          <Stack key="ballot_1"
                 hideNavBar
                 tabBarLabel={"Ballot"}
                  icon={tabIcon} >
            <Scene key="ballot"
                   component={Ballot}
                   type='replace'
                   initial />
            <Scene key ="location"
                   component={Location}
                   type='replace' />
            <Scene key="candidate"
                   component={Candidate}
                   backTitle="Back"
                   back />
          </Stack>
          {/* Sign In Tab */}
          <Stack key="signin_1"
                 tabBarLabel={"Sign In"}
                 icon={tabIcon}
                 hideNavBar
                 initial >
            <Scene key="signIn"
                   component={SignIn}
                   type='replace'
                   initial />
            <Scene key="socialSignIn"
                   component={SocialSignIn}
                   type='replace' />
            <Scene key="twitterSignInProcess"
                   component={TwitterSignInProcess}
                   type='replace' />
          </Stack>
        </Scene>
      </Scene>
    </Router>
  );
};

export default App;
