import {
  StyleSheet,
} from 'react-native';


// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Arial',
  },
  titleText: {
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: 150
  },
  facebookButton: {
    height: 36,
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: 150
  },
  facebookIcon: {
    width: 24,
    height: 24,
    marginTop: 6, marginRight: 4, marginLeft:4
  },
  dangerButton: {
    height: 36,
    backgroundColor: 'red',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
});

export default styles;