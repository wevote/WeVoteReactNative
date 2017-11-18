import { StyleSheet } from 'react-native';

let green = '#76d00b';
let red = '#ff4921';

// This style is for when the item-actionbar is on its own line
const item_action_bar_styles = StyleSheet.create({
  item_actionbar: {
    display:  'flex',
    borderTopWidth:  1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  position_btn_state: {
    color:  '#f8f8f8',
  },
  support_at_state: {
    backgroundColor: green,
  },
  oppose_at_state: {
    backgroundColor: red,
  },
  button: {
    height: 34,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
  },
  share_button: {
    height: 34,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 1,
    padding: 5,
    alignSelf: 'flex-start',
    width: 80,
  },
  list_view: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  hidden_print: {
    width: 0,
    height: 0
  },
  item_actionbar__inline: {
    display: 'flex',
    paddingTop: 0,
    justifyContent: 'flex-end',
  },
  btn_group: {
    display: 'flex',
    flexWrap: 'nowrap',
    // verticalAlign: 'middle',
  },
});

export default item_action_bar_styles;