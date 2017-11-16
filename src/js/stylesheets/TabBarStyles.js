import {
  StyleSheet,
} from 'react-native';


// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// October 2017: There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const styles = StyleSheet.create({
  image: {
    width: 38,
    height: 38,
    borderWidth: 0,
    borderRadius: 3
  },
  ballotButtonContainer: {
    paddingTop:5,
    width:40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballotText: {
    color:"white",
    fontSize: 12
  },
  tabBar: {
    backgroundColor: '#1c2f4b',
    paddingTop: 12,
    paddingBottom: 8
  },
  textSelected: {
    width: 40,
    fontSize: 22,
    color: 'white'
  },
  textNotSelected: {
    width: 40,
    fontSize: 22,
    color: 'grey'
  },
});

export default styles;