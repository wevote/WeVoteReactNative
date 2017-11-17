import React from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import tabStyles from "../stylesheets/tabBarStyles"

import TabIcon from "./TabIcon"
import RouteConst from "./routeConst"

import Ballot from './Ballot/Ballot';
import Candidate from './Ballot/Candidate';
import Location from './Settings/Location';
import SignIn from './SignIn/SignIn';
import TwitterSignInProcess from "./SignIn/TwitterSignInProcess";
import SocialSignIn from "./SignIn/SocialSignIn";
import Welcome from "./Welcome/Welcome";


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
          tabBarStyle={tabStyles.tab_bar}>
          {/* WV Tab */}
          <Stack key={RouteConst.KEY_WE_VOTE_1}
                 hideNavBar
                 tabBarLabel={RouteConst.TAB_LABEL_WV}
                 icon={TabIcon}
          >
            <Scene key={RouteConst.KEY_WELCOME}
                   component={Welcome}
                   type='replace'
                   initial />
          </Stack>
          {/* Ballot Tab */}
          <Stack key={RouteConst.KEY_BALLOT_1}
                 hideNavBar
                 tabBarLabel={RouteConst.TAB_LABEL_BALLOT}
                 icon={TabIcon}
          >
            <Scene key="ballot"
                   component={Ballot}
                   type='replace'
                   initial />
            <Scene key={RouteConst.KEY_LOCATION}
                   component={Location}
                   type='replace' />
            <Scene key="candidate"
                   component={Candidate}
                   backTitle="Back"
                   back />
          </Stack>
          {/* Sign In Tab */}
          <Stack key={RouteConst.KEY_SIGNIN_1}
                 tabBarLabel={RouteConst.TAB_LABEL_SIGN_IN}
                 hideNavBar
                 initial
                 icon={TabIcon}
          >
            <Scene key={RouteConst.KEY_SIGNIN}
                   component={SignIn}
                   type='replace'
                   initial />
            <Scene key={RouteConst.KEY_SOCIAL_SIGNIN}
                   component={SocialSignIn}
                   type='replace' />
            <Scene key={RouteConst.KEY_TWITTER_SIGN_IN_PROCESS}
                   component={TwitterSignInProcess}
                   type='replace' />
          </Stack>
        </Scene>
      </Scene>
    </Router>
  );
};

export default App;
