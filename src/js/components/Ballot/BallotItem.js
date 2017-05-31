import React, { Component, PropTypes } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';
import MeasureInfo from './MeasureInfo';
import BallotItemHeader from './BallotItemHeader';
import CandidateInfo from './CandidateInfo';
import BallotService from '../../../services/BallotService'


export default BallotItem = (props) => {

    const getCandidates = (items, navigation) => {
      return items.map((item) => <CandidateInfo key={item.id} {...item} navigation={navigation}/>);
    }

    const {navigation, title, type, id, candidates} = props;

    const itemInfo = BallotService.isOffice(type) ? getCandidates(candidates, navigation) : <MeasureInfo {...props}/>;
    return (
      <TouchableHighlight onPress={() => navigation.navigate('BallotDetails', {title: title, type: type, id: id})}>
        <View style={styles.itemContainer}>
            <BallotItemHeader title={title} id={id}/>
            {itemInfo}
        </View>
      </TouchableHighlight>);
  }

const styles = StyleSheet.create({
  itemContainer: {
      backgroundColor:'#FFFFFF',
      marginTop: 5,
      borderRadius: 2,
      borderColor: '#ffffff',
      borderWidth: 1,
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      elevation: 2,
      paddingBottom: 5,
      flex: 1,
      flexDirection: 'column',
    }
})
