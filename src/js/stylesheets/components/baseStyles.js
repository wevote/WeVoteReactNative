import {
  StyleSheet,
} from 'react-native';

// Border Radius
// * Uses a slightly shifted scale to acknowledge smaller common values
let radius_none= 0; // for overrides
let radius_xs = 8;
let radius_sm = 4;
let radius_md = 8;
let radius_rounded = 6;
let twitter_blue = '#48BBEC';
let facebook_blue = '#3b5998';
let signout_blue = '#0000ff';
let hyperlink_blue = '#1a0aab';
let mailChimpOrange = 'rgb(240, 173, 78)';
let darkButtonBorder = 'rgba(0,0,0,0.2)';
let darkModalText = '#00749e';

// https://www.bountysource.com/issues/39479584-fontfamily-in-theme-js-has-no-effect
// There is no out-of-the-box sans-serif in iOS, so used Arial instead.  Works fine on Android.
const base_styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Arial',
  },
  bold: {
    fontWeight: 'bold',
  },
  indent: {
    marginRight: 5,
  },
  hyperLink: {
    color: hyperlink_blue,
  },
  title_text: {
    fontFamily: 'Arial',
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
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width: 150,
    backgroundColor: twitter_blue,
    borderColor: darkButtonBorder,
    borderWidth: 1,
    borderRadius: radius_rounded,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  small_button: {
    height: 36,
    width: 36,
    borderColor: darkButtonBorder,
    borderWidth: 1,
    borderRadius: radius_rounded,
    marginBottom: 10,
    marginRight: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  twitter_color: {
    backgroundColor: twitter_blue,
  },
  facebook_color: {
    backgroundColor: facebook_blue,
  },
  medium_color: {
    backgroundColor: 'white',
  },
  mail_chimp: {
    backgroundColor: mailChimpOrange,
    width: 165,
    marginRight: 6,
  },
  twitter_button: {
    height: 36,
    width: 150,
    backgroundColor: twitter_blue,
    borderColor: darkButtonBorder,
    borderWidth: 1,
    borderRadius: radius_rounded,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
 facebook_button: {
    height: 36,
    width: 150,
    backgroundColor: facebook_blue,
    borderColor: darkButtonBorder,
    borderWidth: 1,
    borderRadius: radius_rounded,
    marginBottom: 10,
    paddingRight: 16,
    paddingLeft: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  warning_button: {
    alignItems: 'flex-end',
    color: 'white'
  },
  danger_button: {
    height: 36,
    backgroundColor: 'red',
    borderColor: twitter_blue,
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
    backgroundColor: 'white',
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
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 12
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: radius_xs,
    elevation: 1,
    shadowColor: darkButtonBorder,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  card_main: {
    padding: 16,
    display: 'flex',
    backgroundColor: '#fff',
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
    borderRadius: radius_xs,
  },
  modal_header: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  candidate_modal: {
    backgroundColor: 'white',
    margin: 20,
  },
  modal_title: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
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
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'darkgray',
  },
  modalChoices: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Arial',
    fontSize: 20,
    color: darkModalText
  },
  modalChoicesSmall: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Arial',
    fontSize: 15,
    color: darkModalText
  },
  modalChoiceDummy: {   // Nov 2017, this is temporary for mockups
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Arial',
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
    borderRadius: radius_md,
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