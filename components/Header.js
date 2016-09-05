import NavigationBar from 'react-native-navbar'
import React, { Component, } from 'react'
import { View } from 'react-native'

class Header extends Component {
  render() {
    return (
      <View>
        <NavigationBar
          title={{ title: "We Vote USA", tintColor: 'black', }}
          leftButton={{ title: 'Back', }}
          rightButton={{ title: 'Forward', }}
          style={{ backgroundColor: "rgba(99,165,231,1)", }}
          statusBar={{ tintColor: "rgba(251,252,255,1)", }}
        />
      </View>
    )
  }
}

export default Header
