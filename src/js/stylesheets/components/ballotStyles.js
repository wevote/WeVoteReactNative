import {
  StyleSheet,
} from 'react-native';

// ===========================================
// Colors
// ===========================================

let white = '#fff';
let black = '#000';

// Grays
let gray_pale = '#f8f8f8';
let gray_lighter = '#eee';
let gray_border = '#ddd';
let gray_light = '#ccc';
let gray_mid = '#999';
let gray_dark = '#555';
let gray_darker = '#333';

let brand_blue = '#1c2f4b';
let candidate_font_size = 15;

// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const ballot_styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  ballot_name: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title_text: {
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  candidate_name: {
    fontSize: 15,
    fontFamily: 'Arial',
  },
  candidate_description: {
    fontFamily: 'Arial',
    fontSize: candidate_font_size,
    color: gray_mid,
  },
  measure_read_more_link: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#48BBEC',
  },
  office_read_more_link: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#48BBEC',
  },
  candidate_photo: {
    width: 48,
    height: 48
  }

});

export default ballot_styles;