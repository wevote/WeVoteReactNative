import { connect } from 'react-redux'
import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';
import globalStyle from '../../../css/styles/style'
import UserService from '../../../services/UserService'
import AuthService from '../../../services/AuthService'
import {createUser} from '../../actions/UserActions'

export class LoadingScreen extends Component {
  static navigationOptions = {
    title: 'Loading',
    header: null,
  }


  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    const {loggedIn, navigation} = nextProps;

    if(loggedIn) {
      navigation.navigate('Tabs')
    }
  }

  componentDidMount(){
    const {loggedIn, navigation} = this.props;
    if(loggedIn) {
      navigation.navigate('Tabs')
    }
    this.props.createUser();

  }

  render() {

    const {navigation} = this.props;
    return (
      <View style={style.loadingScreen}>
        <Text style={style.loadingText}>WeVote</Text>
      </View>);

  }
}

const mapStateToProps = (state) => {
  const {User} = state;
  const {loggedIn} = User;

  return {loggedIn};
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: () => {dispatch(createUser())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);

const style = StyleSheet.create( {
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#337ec9',
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize:50
  },
  button: {
    color: 'blue',
    backgroundColor: 'white'
  }
})
