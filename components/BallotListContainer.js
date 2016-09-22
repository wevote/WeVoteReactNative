import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {requestBallotIfNeeded} from '../actions/actions'
import BallotItem from './BallotItem'
import styles from '../assets/styles/style';
import Header from './Header'

class Ballot extends Component {
  constructor(props) {
      super(props);

  }

  componentDidMount() {
    const {dispatch} = this.props;

    console.log("componentDidMount");
    dispatch(requestBallotIfNeeded());
  }

 onBallotItemClick(item) {
   const {ballot, navigator} = this.props;
  navigator.push({id: 'BallotItemInfo', ballotItem: item.we_vote_id});
}


  render() {

    const {ballot} = this.props;
    ballotItems = ballot.map((ballotItem, i) => {console.log(ballotItem); return <BallotItem key={i} ballotItem={ballotItem.info} onClick={this.onBallotItemClick.bind(this,ballotItem.info)}/>});

    content = ballot != undefined ? ballotItems : <Text> No Ballot Available </Text> ;
    return  <View style={styles.app}><Header/><ScrollView>
            {content}
          </ScrollView>
          </View>

  }
}


Ballot.propTypes = {
  ballot: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  const{ballotList} = state;
  const{ballots} = ballotList;
  return {
    ballot: ballots
  }

}

export default connect(
  mapStateToProps
)(Ballot);
