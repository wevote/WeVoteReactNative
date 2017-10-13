import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'
//import { Router, Scene, Stack } from 'react-native-router-flux';
import { NativeRouter, Route, Link, BackButton } from 'react-router-native';

import Ballot from './Ballot/Ballot';
import Location from './Settings/Location';
import SignIn from './SignIn/SignIn';
import TwitterSignInProcess from "./SignIn/TwitterSignInProcess";
import TwitterSignIn from "./SignIn/TwitterSignIn";

/*const TabIcon = ({ selected, tabBarLabel }) => {
  return (
    <Text style={{color: selected ? 'white' :'grey'}} size={44}>{tabBarLabel}</Text>
  );
};
*/

/* Some good articles on react-native-router-flux (RNRF)
 https://medium.com/differential/react-native-basics-using-react-native-router-flux-f11e5128aff9
 https://medium.com/the-react-native-log/thousand-ways-to-navigate-in-react-native-f7a1e311a0e8
 https://medium.com/@psak.works/react-navigation-without-redux-887ad8a6b394
*/

const App = () => {

    return (
        <NativeRouter>
          <View style = {styles.container}>
            <View style = {styles.nav}>

              <Link
                  to="/SignIn"
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <Text>SignIn</Text>
              </Link>

              <Link
                  to="/ballot"
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <Text>Ballot</Text>
              </Link>

            </View>

            <Route path="/SignIn" component={SignIn}/>
            <Route path="/Ballot" component={Ballot}/>

          </View>
        </NativeRouter>

    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  }
});

export default App;
