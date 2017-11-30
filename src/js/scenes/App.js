import React from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import tabStyles from "../stylesheets/tabBarStyles"

import TabIcon from "./TabIcon"
import RouteConst from "./RouteConst"

import Ballot from './Ballot/Ballot';
import Candidate from './Ballot/Candidate';
import Location from './Settings/Location';
import SignIn from './SignIn/SignIn';
import TermsOfService from "./SignIn/TermsOfService";
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
  // As of Nov 28, 2017 none of these warnings apply to our code, they apply to library code.  Suppress the yellow boxes in the simulator.
  console.ignoredYellowBox = [
    'Warning: PropTypes has been moved to a separate package. Accessing React.PropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.',
    'Warning: checkPropTypes has been moved to a separate package. Accessing React.checkPropTypes is no longer supported and will be removed completely in React 16. Use the prop-types package on npm instead.',
    'Warning: React.createClass is no longer supported. Use a plain JavaScript class instead. If you\'re not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.'
  ];


  return (
    <Router>
      <Scene key={RouteConst.KEY_ROOT}>
        {/* Tab Container */}
        <Scene
          key={RouteConst.KEY_TABBAR}
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
                   type="replace"
                   initial />
          </Stack>
          {/* Ballot Tab */}
          <Stack key={RouteConst.KEY_BALLOT_1}
                 hideNavBar
                 tabBarLabel={RouteConst.TAB_LABEL_BALLOT}
                 icon={TabIcon}
          >
            <Scene key={RouteConst.KEY_BALLOT}
                   component={Ballot}
                   type="replace"
                   initial />
            <Scene key={RouteConst.KEY_LOCATION}
                   component={Location}
                   type="replace" />
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
                   type="replace"
                   initial />
            <Scene key={RouteConst.KEY_SOCIAL_SIGNIN}
                   component={SocialSignIn}
                   type="replace" />
            <Scene key={RouteConst.KEY_TWITTER_SIGN_IN_PROCESS}
                   component={TwitterSignInProcess}
                   type="replace" />
            <Scene key={RouteConst.KEY_TERMS_OF_SERVICE}
                   component={TermsOfService}
                   type="replace" />
          </Stack>
        </Scene>
      </Scene>
    </Router>
  );
};

export default App;
