import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'black',
    flex: 1
  },
  photo:{
    width:60,
    height: 60

  },
  header:{

      fontWeight: 'bold',
      fontSize:20,
      color: '#83bfeb'
  },
  listItem: {
      backgroundColor:'white',
      marginTop: 5,
      borderRadius: 10,
      shadowColor: 'gray',
      shadowOffset: {width: 10, height: 10}
    },
  ballotItemInfo: {
      paddingTop:4,
      flexDirection: 'row',
  },
  candidateInfo:{
      paddingTop:4
  },
  photoContainer: {
    paddingRight:4,
    paddingLeft:4
  },
  candidateTextInfo: {
    flexDirection:'column'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  headerRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  twitterInfo: {
    flexDirection: 'row'
  },
  search: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    height:50,
    alignItems: 'center'

  },
  searchBox:{
    backgroundColor: 'white',
     margin:10,
     width:300,
     height:25,
     padding:10

  }


});

module.exports = styles;
