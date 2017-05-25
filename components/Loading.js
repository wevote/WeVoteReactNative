import React, { Component, } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

class Loading extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.loading_screen]}>
          <Text style={styles.loading_text}>Loading {this.props.children}</Text>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loading_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#337ec9',
  },
  loading_text: {
    textAlign: 'center',
    color: '#fff',
    fontSize:60
  }
})

export default Loading