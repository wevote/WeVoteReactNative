import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import globalStyle from '../../../css/styles/style'
import BallotItem from './BallotItem'
import saveAddress from '../../actions/UserActions'
import BallotService from '../../../services/BallotService'

export class Ballot extends Component {
  static navigationOptions = {
    title:  "My Ballot",
    headerLeft:null,
  }

  constructor(props) {
      super(props);

  }

  componentDidMount() {
    const {getBallot} = this.props;
    getBallot("94523");
  }

getBallotList(ballot, navigation) {
  if(ballot === null){
    return;
  }
  return ballot.map((item) => {
    info = BallotService.isOffice(item.kind_of_ballot_item) ? {candidates: item.candidate_list} : {description: item.measure_subtitle};
    return <BallotItem key={item.id} id={item.we_vote_id} type={item.kind_of_ballot_item} title={item.ballot_item_display_name} navigation={navigation} {...info}/>
  });
}

  render() {
    const {ballot, navigation} = this.props;
    return(
          <View style={globalStyle.app}>
              <ScrollView>
              {this.getBallotList(ballot, navigation)}
              </ScrollView>
          </View>);
  }




}


const mapStateToProps = (state) => {
  const {Ballots} = state;
  const {ballotList} = Ballots;
  return {ballot: ballotList};
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBallot: (address) => {dispatch(saveAddress(address));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ballot);
