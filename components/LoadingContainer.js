import { connect } from 'react-redux'
import React, {Component, PropTypes} from 'react'
import LoadingScreen from './LoadingScreen';
import {fetchVoterID} from '../actions/actions'
import {View, Text} from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(fetchVoterID());
  }

  componentWillReceiveProps(nextProps) {
    const{loggedIn, navigator} = nextProps;
    if(loggedIn) {
      navigator.push({id: 'BallotList'});
    }
  }

  render() {
    const {loggedIn, navigator} = this.props;

    return (<LoadingScreen/>);

  }
}


Loading.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}


function mapStateToProps(state){
  const {user} = state;
  const{loggedIn} = user;
  return {loggedIn}

}

export default connect(mapStateToProps)(Loading);
