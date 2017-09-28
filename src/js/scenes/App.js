import React from 'react';
import { Text } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import SignIn from './SignIn/SignIn';
import Ballot from './Ballot/Ballot';
import TwitterSignInProcess from "./SignIn/TwitterSignInProcess";

const TabIcon = ({ selected, tabBarLabel }) => {
  return (
    <Text style={{color: selected ? 'white' :'grey'}} size={44}>{tabBarLabel}</Text>
  );
};

/* Some good articles on react-native-router-flux
 https://medium.com/differential/react-native-basics-using-react-native-router-flux-f11e5128aff9
 https://medium.com/the-react-native-log/thousand-ways-to-navigate-in-react-native-f7a1e311a0e8
 https://medium.com/@psak.works/react-navigation-without-redux-887ad8a6b394
*/

const App = () => {

  return (
    <Router>
      <Scene key="root">
        {/* Tab Container */}
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#515151', }}>
          {/* Stack Container for Signing In */}
          <Stack key="signin_1"
                 tabBarLabel={"Sign In"}
                 icon={TabIcon}
                 hideNavBar
                 initial >
            <Scene key="signIn"
                   component={SignIn}
                   initial />
            <Scene key="twitterSignInProcess"
                   component={TwitterSignInProcess} />
          </Stack>
          <Scene key="ballot"
                 hideNavBar
                 tabBarLabel={"Ballot"}
                 icon={TabIcon}
                 component={Ballot} />
        </Scene>
      </Scene>
    </Router>
  );
};


export default App;
