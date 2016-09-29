import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {requestBallotIfNeeded, setStarredStatus} from '../actions/actions'
import BallotItem from './BallotItem'
import styles from '../assets/styles/style';
import Header from './Header'

class Ballot extends Component {
  constructor(props) {
      super(props);

  }

  componentDidMount() {
    const {requestBallot} = this.props;
    requestBallot();
  }

 onBallotItemClick(item) {
   const {ballot, navigator} = this.props;
   navigator.push({id: 'BallotItemInfo', ballotItem: item.we_vote_id});
}


  render() {

    const {ballot} = this.props;
    const {ballotItems} = ballot;
    const {starred} = ballot;

    items = [];
    ind = 0;
    for(item in ballotItems) {
      var isStarred = false;

      //console.log("STARRED", starred[item]);
      isStarred = (starred == undefined || starred[item] == undefined) ? false: starred[item].isStarred;

      console.log(isStarred);
      items[ind++] = <BallotItem key = {ind} ballotItem={ballotItems[item].item} isStarred={isStarred} onStarClick={this.props.onStarClick.bind(this, ballotItems[item].item, isStarred)} onClick={this.onBallotItemClick.bind(this,ballotItems[item].item)}/>;
    }
    content = ballotItems != undefined ? items : <Text> No Ballot Available </Text> ;
    return  <View style={styles.app}><Header/><ScrollView>
            {content}
          </ScrollView>
          </View>

  }
}


Ballot.propTypes = {
  ballot: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  const{ballotList} = state;
  const{ballots} = ballotList;

  return {
    ballot: ballots
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    onStarClick: (item, isStarred) => {
      console.log("CLCIKED")
      console.log(item);
      dispatch(setStarredStatus(item, isStarred))
    },

    requestBallot: () => {
      dispatch(requestBallotIfNeeded())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ballot);
