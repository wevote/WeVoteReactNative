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
  ballot_button_container: {
    paddingTop:5,
    width:40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballot_text: {
    color:"white",
    fontSize: 12
  },
  tab_bar: {
    backgroundColor: '#1c2f4b',
    paddingTop: 12,
    paddingBottom: 8
  },
  text_selected: {
    width: 40,
    fontSize: 22,
    color: 'white'
  },
});

export default styles;