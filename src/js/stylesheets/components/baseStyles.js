import { StyleSheet } from 'react-native';
import styleConst from "./styleConst";

// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const base_styles = StyleSheet.create({
  baseText: {
    fontFamily: styleConst.baseFontFamily,
  },
  bold: {
    fontWeight: 'bold',
  },
  indent: {
    marginRight: 5,
  },
  hyperLink: {
    color: styleConst.hyperlink_blue,
  },
  title_text: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  titleSpaceAbove: {
    fontSize: 20,
    marginBottom: 10,
    paddingTop: 10
  },
  button_text: {
    fontSize: 18,
    color: styleConst.white,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width: 150,
    backgroundColor: styleConst.twitter_blue,
    borderColor: styleConst.darkButtonBorder,
    borderWidth: 1,
    borderRadius: styleConst.radius_rounded,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  small_button: {
    height: 36,
    width: 36,
    borderColor: styleConst.darkButtonBorder,
    borderWidth: 1,
    borderRadius: styleConst.radius_rounded,
    marginBottom: 10,
    marginRight: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  twitter_color: {
    backgroundColor: styleConst.twitter_blue,
  },
  facebook_color: {
    backgroundColor: styleConst.facebook_blue,
  },
  medium_color: {
    backgroundColor: styleConst.white,
  },
  mail_chimp: {
    backgroundColor: styleConst.mailChimpOrange,
    width: 165,
    marginRight: 6,
  },
  buttonBasics: {
    height: 36,
    width: 150,
    borderWidth: 1,
    borderRadius: styleConst.radius_rounded,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  twitterColors: {
    backgroundColor: styleConst.twitter_blue,
    borderColor: styleConst.darkButtonBorder,
  },
  facebookColors: {
    backgroundColor: styleConst.facebook_blue,
    borderColor: styleConst.darkButtonBorder,
  },
  donateColors: {
    backgroundColor: styleConst.btn_danger,
    borderColor: 'red',
  },
  mailColors: {
    backgroundColor: styleConst.btn_email_background,
    borderColor: styleConst.btn_email_border,
  },
  signOutColors: {
    backgroundColor: styleConst.btn_danger,
    borderColor: 'red',
  },
  buttonInnards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  buttonInnardsCentered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center'
  },
  warning_button: {
    alignItems: 'flex-end',
    color: styleConst.white
  },
  danger_button: {
    height: 36,
    backgroundColor: 'red',
    borderColor: styleConst.twitter_blue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
  outer_gray_pane: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  inner_white_pane: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: styleConst.white,
    alignSelf: 'stretch',
    padding: 20
  },
  activity_indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  title_padded_text: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 12
  },
  card: {
    backgroundColor: styleConst.white,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: styleConst.radius_xs,
    elevation: 1,
    shadowColor: styleConst.darkButtonBorder,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  card_main: {
    padding: 16,
    display: 'flex',
    backgroundColor: styleConst.white,
    position: 'relative',
  },
  card__no_additional: {
    margin: 8,
    color: 'black',
  },
  media_object: {
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    flexDirection: 'row',
  },
  media_object_content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media_object_anchor: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  display_name: {
    fontFamily: "Source Sans Pro",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  avatar_compressed: {
    maxWidth: 40,
    borderRadius: styleConst.radius_xs,
  },
  modal_header: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  candidate_modal: {
    backgroundColor: styleConst.white,
    margin: 20,
  },
  modal_title: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    color: styleConst.black
  },
  modal_body: {
    position: 'relative',
    padding: 15,
  },
  leftIndent: {
    paddingLeft: 25,
  },
  topRoomForPhoneMenu: {
    paddingTop: 50
  },
  grayPromise: {
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'darkgray',
  },
  modalChoices: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: styleConst.baseFontFamily,
    fontSize: 20,
    color: styleConst.darkModalText
  },
  modalChoicesMediumWhite: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: styleConst.baseFontFamily,
    fontSize: 18,
    color: styleConst.white
  },
  modalChoicesSmall: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: styleConst.baseFontFamily,
    fontSize: 15,
    color: styleConst.darkModalText
  },
  modalChoiceDummy: {   // Nov 2017, this is temporary for mockups
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: styleConst.baseFontFamily,
    fontSize: 20,
  },
  termsCenteredTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutImage: {
    width: 85,
    height: 85,
    borderRadius: styleConst.radius_md,
    marginBottom: 8,
  },
  aboutPersonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  aboutPersonName: {
    width: 85, fontWeight: '700', fontSize: 16,
  },
  aboutPersonTitle: {
    width: 85, marginBottom: 8, fontStyle: 'italic', fontSize: 14,
  }
});

export default base_styles;