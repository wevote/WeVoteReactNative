import {
  StyleSheet,
} from 'react-native';


// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const ballotStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleText: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  candidate_name: {
    fontSize: 15,
    fontFamily: 'Arial',
  },
  measureReadMoreLink: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#48BBEC',
  },
  officeReadMoreLink: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#48BBEC',
  },

});

export default ballotStyles;