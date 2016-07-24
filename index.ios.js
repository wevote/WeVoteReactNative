/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Navigator
} from 'react-native';

import Position_list from './assets/stubs/position_list'

let OragnanizationalCard = require('./components/organizationalCard').default;
let ListCard = require('./components/listCard').default;




class WeVoteReactNative extends Component {
  constructor(props){
    super(props);
    this.state={
      "position_list":Position_list,
    };
  }
  render() {
     const rows = this.state.position_list.map((card,i) => {
        //Add props to your LiComponent just as you would normally.
        return <ListCard key={i} ballot_item_display_name={card.ballot_item_display_name}
                         ballot_item_image_url_https={card.ballot_item_image_url_https}
                         is_positive_rating={card.is_positive_rating}
                         vote_smart_rating={card.vote_smart_rating}
                         vote_smart_time_span={card.vote_smart_time_span}/>
    });



    return (
      <Navigator
        initialRoute = {{
          id: 'First',
          rows: rows
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
        console.log(this.rows);
        return(
          <ScrollView>
            <View style={styles.container}>
              <OragnanizationalCard title='American Civil Liberties Union'
                                    imageUrl='https://pbs.twimg.com/profile_images/705877503504568320/irplaegC_bigger.jpg'
                                    content='The ACLU is a nonprofit, nonpartisan, public interest law firm and advocacy organization devoted to protecting the basic civil liberties of everyone in America'/>
              <View>
                {route.rows}
              </View>
            </View>
          </ScrollView>
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
