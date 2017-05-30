import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Image, Button} from 'react-native';
//
export default CommentInput = (props) => {
  return(
    <View style={styles.commentInputContainer}>
      <TextInput placeholder="Enter comment" keyboardType='default' multiline = {true} numberOfLines = {4} style={styles.input}></TextInput>
<Button title="POST" style={styles.button} onPress={()=>null}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  commentInputContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#F5F5F5'
  },
  input: {
    flex:5,
    fontSize: 17,
    backgroundColor:'#FFFFFF'
  },
  button: {
    flex:1,
  }
})
