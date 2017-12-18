import { StyleSheet } from 'react-native';
import styleConst from "../styleConst";

// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const ballot_styles = StyleSheet.create({
  getStartedButton: {
    backgroundColor: styleConst.call_to_action_red,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    padding: 15,
    borderRadius: 8,
  },
  callToActionBlue: {
    backgroundColor: styleConst.call_to_action_blue
  },
  dangerRed: {
    backgroundColor: styleConst.btn_danger
  },
  hyperLinkOnBlue: {
    color: styleConst.twitter_blue
  },
  bigButtonText: {
    fontFamily: styleConst.baseFontFamily,
    fontWeight: '500',
    color: styleConst.white,
    fontSize: 20,
  },
  textH1: {
    fontFamily: styleConst.baseFontFamily,
    fontWeight: '400',

    color: styleConst.white,
    backgroundColor:'transparent',
    fontSize: 36,
  },
  textH2: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 'normal',
  },
  textH3White: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 40,
    color: styleConst.white,
  },
  horizontalChoices: {
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 15,
    fontFamily: styleConst.baseFontFamily,
    fontSize: 16,
    color: styleConst.white,
  },
  centeredFlexColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
});

export default ballot_styles;