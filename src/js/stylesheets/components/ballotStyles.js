import {
  StyleSheet,
} from 'react-native';
import styleConst from "../styleConst";

let candidate_font_size = 15;

// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const ballot_styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: styleConst.white,
  },
  ballot_name: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    color: styleConst.bootstrapBlue,
  },
  title_text: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    fontWeight: 'bold',
    color: styleConst.bootstrapBlue,
  },
  candidate_name: {
    fontSize: 15,
    fontFamily: styleConst.baseFontFamily,
  },
  candidate_description: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: candidate_font_size,
    color: styleConst.gray_mid,
  },
  summaryOfBallotItems: {
    fontSize: 15,
    fontWeight: '700',
    color: styleConst.bootstrapBlue,
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingBottom: 15
  },
  ballotEdit: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    color: styleConst.bootstrapBlue,
  },
  measure_read_more_link: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    color: styleConst.bootstrapBlue,
  },
  office_read_more_link: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    color: styleConst.bootstrapBlue,
  },
  candidate_photo: {
    width: 48,
    height: 48
  }

});

export default ballot_styles;