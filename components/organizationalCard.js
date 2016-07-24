import React, { Component } from 'react';
import { AppRegistry,StyleSheet,TouchableHighlight, Image,View,Text } from 'react-native';

export default class oragnanizationalCard extends Component {
  constructor(props){
    super();

    this.state={
      imageUrl:'https://pbs.twimg.com/profile_images/705877503504568320/irplaegC_bigger.jpg'
    };
  }
  onButtonPress(){
    this.props.navigator.push({
      id:'Second'
    })
  }
  render() {
    return (
      <View style={styles.card}>
        <View>
            <Image style={styles.card_photo} source={{uri: this.props.imageUrl}}/>
        </View>
        <View style={styles.card_details}>
            <Text style={styles.card_details_header}>{this.props.title}</Text>
            <Text style={styles.card_details_content}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    margin:0,
    width:350,
    marginTop:20,
    flexDirection: 'row'
  },
  card_photo:{
    width:100,
    height:80,
    marginLeft:20
  },
  card_details:{
    height:150
  },
  card_details_header:{
    fontSize:18,
    marginLeft:5,
    fontWeight:'bold'
  },
  card_details_content:{
    width:220,
    marginLeft:5
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  }
});
