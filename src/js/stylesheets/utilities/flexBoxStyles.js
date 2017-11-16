// ===============================================
// Flexbox utility classes
// ===============================================
import { StyleSheet } from 'react-native';

const flex_box_styles = StyleSheet.create({
  u_flex: {
    display: 'flex',
  },

  u_flex_auto: {
    minWidth: 0,
    minHeight: 0,
    flex: 1,
  },

  u_flex_none:  { flex: 0 },

  u_flex_column:  { flexDirection: 'column' },
  u_flex_row:     { flexDirection: 'row' },
  u_flex_wrap:    { flexWrap: 'wrap' },

  u_flex_single_column: { flex: 1},

  u_items_start:    { alignItems: 'flex-start' },
  u_items_end:      { alignItems: 'flex-end' },
  u_items_center:   { alignItems: 'center' },
  u_items_baseline: { alignItems: 'baseline' },
  u_items_stretch:  { alignItems: 'stretch' },

  u_self_start:    { alignSelf: 'flex-start' },
  u_self_end:      { alignSelf: 'flex-end' },
  u_self_center:   { alignSelf: 'center' },
  u_self_baseline: { alignSelf: 'baseline' },
  u_self_stretch:  { alignSelf: 'stretch' },

  u_justify_start:    { justifyContent: 'flex-start' },
  u_justify_end:      { justifyContent: 'flex-end' },
  u_justify_center:   { justifyContent: 'center' },
  u_justify_between:  { justifyContent: 'space-between' },
  u_justify_around:   { justifyContent: 'space-around' },

  u_content_start:    { alignContent: 'flex-start' },
  u_content_end:      { alignContent: 'flex-end' },
  u_content_center:   { alignContent: 'center' },
  u_content_between:  { alignContent: 'space-between' },
  u_content_around:   { alignContent: 'space-around' },
  u_content_stretch:  { alignContent: 'stretch' },

  // u_order_0: { order: 0 },
  // u_order_1: { order: 1 },
  // u_order_2: { order: 2 },
  // u_order_3: { order: 3 },
  // u_order_4: { order: 4 },
  // u_order_5: { order: 5 },
  // u_order_6: { order: 6 },
  // u_order_7: { order: 7 },
  // u_order_8: { order: 8 },
  // u_order_last: { order: 99999 },

  // u_cursor__pointer: {
  //   cursor: 'pointer',
  // },

  u_min_50: {
    minWidth: 50,
  },
});

export default flex_box_styles;


