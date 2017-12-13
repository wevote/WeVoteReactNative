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

let call_to_action_red = '#fb2f2f';
let btn_danger = '#d9534f';
let call_to_action_blue = '#476480';
let background_pale_blue = '#314965';
let backgroundDarkBlue = '#284775';
let header_image_width = '931px';
let hero_section_background_color = 'rgba(255, 255, 255, .75)';
let opaque_grey = 'rgba({gray-dark}, .5)';


// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const ballot_styles = StyleSheet.create({
  getStartedButton: {
    backgroundColor: call_to_action_red,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    padding: 15,
    borderRadius: 8,
  },
  callToActionBlue: {
    backgroundColor: call_to_action_blue
  },
  dangerRed: {
    backgroundColor: btn_danger
  },
  bigButtonText: {
    fontFamily: 'Arial',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
  },
  textH1: {
    fontFamily: 'Arial',
    fontWeight: '400',

    color: 'white',
    backgroundColor:'transparent',
    fontSize: 36,
  },
  textH2: {
    fontFamily: 'Arial',
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 'normal',
  },
  textH3White: {
    fontFamily: 'Arial',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 40,
    color: 'white',
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