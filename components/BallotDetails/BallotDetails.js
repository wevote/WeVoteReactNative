import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
import Comment from './Comment';
import CommentInput from './CommentInput';
import fetchBallotItemInfo from '../../actions/BallotActions'
import globalStyle from '../../assets/styles/style'

export class BallotDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {getInfo} = this.props;
    const {id, type} = this.props.navigation.state.params;
    console.log(id);
    console.log(type);
    getInfo(type, id);
  }

  getDescription(item) {
    return item.twitter_description || item.measure_text;
  }

  render() {
    const {ballotItems} = this.props;
    const {id} = this.props.navigation.state.params;
    console.log(ballotItems);
    const description = (ballotItems !== null && ballotItems[id] !== null && ballotItems[id] !== undefined) ? this.getDescription(ballotItems[id]) : "No description available.";
    return (
      <View style={globalStyle.app}>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Support" onPress={()=>null}/>
          <Button title="Oppose" onPress={()=>null}/>
        </View>
        <View style={styles.commentsContainer}>
          <CommentInput/>
        </View>
      </View>
    );

  }
}

const mapStateToProps = (state) => {
  const {BallotItemInfo} = state;
  const {ballotItems} = BallotItemInfo;
  return {
    ballotItems
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (type, id) => {dispatch(fetchBallotItemInfo(type, id));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BallotDetails);

const styles = StyleSheet.create({
  text: {
    padding:10,
    backgroundColor: "#ffffff"
  },
  buttonContainer: {
    height: 30,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingBottom: 5
  },
  commentsContainer:{
    flex:1,
    flexDirection: 'column',
  },
})
