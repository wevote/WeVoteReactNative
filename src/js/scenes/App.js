import React from 'react';
import { Text } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Ballot from './Ballot/Ballot';
import Location from './Settings/Location';
import SignIn from './SignIn/SignIn';
import TwitterSignInProcess from "./SignIn/TwitterSignInProcess";
import SocialSignIn from "./SignIn/SocialSignIn";

const TabIcon = ({ selected, tabBarLabel }) => {
  return (
    <Text style={{color: selected ? 'white' :'grey'}} size={44}>{tabBarLabel}</Text>
  );
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
          tabBarStyle={{ backgroundColor: '#515151', }}>
          {/* Tab */}
          <Stack key="ballot_1"
                 hideNavBar
                 tabBarLabel={"Ballot"}
                 icon={TabIcon} >
            <Scene key="ballot"
                   component={Ballot}
                   type='replace'
                   initial />
            <Scene key ="location"
                   component={Location}
                   type='replace' />
          </Stack>
          {/* Tab */}
          <Stack key="signin_1"
                 tabBarLabel={"Sign In"}
                 icon={TabIcon}
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
