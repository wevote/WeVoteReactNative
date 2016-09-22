import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#F5F4F1',
    flex: 1
  },
  photo:{
    width:60,
    height: 60
  },
  header:{
      fontWeight: 'bold',
      fontSize:20,
      color: '#337ab7'
  },
  itemContainer: {
      backgroundColor:'white',
      marginTop: 5,
      borderRadius: 2,
      borderColor: '#ffffff',
      borderWidth: 1,
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      elevation: 2,
      paddingBottom: 5
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

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loading_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#337ec9',
  },
  loading_text: {
    textAlign: 'center',
    color: '#fff',
    fontSize:60
  }


});

module.exports = styles;
