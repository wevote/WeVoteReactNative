/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

let OragnanizationalCard = require('./components/organizationalCard').default;

class WeVoteReactNative extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{
          id: 'First'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }

  navigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch(route.id){
      case 'First':
        return(
          <View style={styles.container}>
            <OragnanizationalCard title='Civil Liberties Union'
                                  imageUrl='https://facebook.github.io/react/img/logo_og.png'
                                  content='The ACLU is a nonprofit, nonpartisan, public interest law firm and advocacy organization devoted to protecting the basic civil liberties of everyone in America'/>
            <OragnanizationalCard title='American Civil Liberties Union'
                                  imageUrl='https://facebook.github.io/react/img/logo_og.png'
                                  content='The ACLU is a nonprofit, nonpartisan, public interest law firm and advocacy organization devoted to protecting the basic civil liberties of everyone in America'/>
          </View>
        )

      case 'Second':
        return(
          <View style={styles.container}>
            <Second navigator={navigator}  />
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  }
});

AppRegistry.registerComponent('WeVoteReactNative', () => WeVoteReactNative);
