import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'
import {Images, Metrics} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'

// I18n
import I18n from '../I18n/I18n.js'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      username: 'reactnative@infinite.red',
      password: 'password',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.attempting) {
      this.props.close()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { attempting } = this.props
    const editable = !attempting
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('username')}</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder={I18n.t('username')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder={I18n.t('password')} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.props.close}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  attempting: PropTypes.bool,
  close: PropTypes.func,
  attemptLogin: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    attempting: state.login.attempting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    attemptLogin: (username, password) => dispatch(Actions.attemptLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
