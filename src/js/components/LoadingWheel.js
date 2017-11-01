import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class LoadingWheel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      animating: true,
      mounted: false
    };
  }

  // In ReactNative, this does not promptly unmount if a modal is called, as a result it throws:
  // ExceptionsManager.js:73 Warning: Can only update a mounted or mounting component. This usually means you called
  // setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
  // Please check the code for the LoadingWheel component.
  // Removing 10/31/17
  // closeActivityIndicator () {
  //   setTimeout(() => {
  //     if(this.state.mounted) {
  //       this.setState({animating: false});
  //     }
  //   }, 6000);
  // }
  //
  // componentDidMount () {
  //   this.closeActivityIndicator()
  // }
  //
  // componentWillMount () {
  //   this.setState({mounted: true});
  // }
  //
  // componentWillUnmount (){
  //   this.setState({mounted: false});
  // }


    render() {
    const animating = this.state.animating;
    return (
      <View style = {styles.container}>
        <ActivityIndicator
          animating = {animating}
          color = '#bc2b78'
          size = "large"
          style = {styles.activityIndicator}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});
