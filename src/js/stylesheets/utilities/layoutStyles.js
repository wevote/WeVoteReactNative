// ===============================================
// Layout helpers
// ===============================================
import { StyleSheet } from 'react-native';
// ___________________________________________
// Spacing
// ___________________________________________
let space_none = 0;
let space_xxs = 2;
let space_xs = 4;
let space_sm = 8;
let space_md = 16;
let space_lg = 32;
let space_xl = 64;

const layout_styles = StyleSheet.create({
  // Push classes
  // _______________________________
  u_push__xxs:  { marginRight: space_xxs },
  u_push__xs:   { marginRight: space_xs },
  u_push__sm:   { marginRight: space_sm },
  u_push__md:   { marginRight: space_md },
  u_push__lg:   { marginRight: space_lg },

  u_margin_left__xxs: { marginLeft: space_xxs },
  u_margin_left__xs:  { marginLeft: space_xs },
  u_margin_left__sm:  { marginLeft: space_sm },
  u_margin_left__md:  { marginLeft: space_md },
  u_margin_left__lg:  { marginLeft: space_lg },

  // Stack classes
  // _______________________________
  u_margin_top__xxs:  { marginTop: space_xxs },
  u_margin_top__xs:   { marginTop: space_xs },
  u_margin_top__sm:   { marginTop: space_sm },
  u_margin_top__md:   { marginTop: space_md },
  u_margin_top__lg:   { marginTop: space_lg },

  u_stack__xs: { marginBottom: space_xs },
  u_stack__sm: { marginBottom: space_sm },
  u_stack__md: { marginBottom: space_md },
  u_stack__lg: { marginBottom: space_lg },
  u_stack__xl: { marginBottom: space_xl },

  // Inset classes
  // _______________________________
  u_inset__xs: { padding: space_xs },
  u_inset__sm: { padding: space_sm },
  u_inset__md: { padding: space_md },
  u_inset__lg: { padding: space_lg },
  u_inset__xl: { padding: space_xl },

  // // Inset Squish classes
  // u_inset__squish__sm: { padding: space_xs, space_sm }, // 4px 8px
  // u_inset__squish__md: { padding: space_sm, space_md }, // 8px 16px
  // u_inset__squish__lg: { padding: space_md, space_lg }, // 16px 32px
  //
  // // Inset Stretch classes
  // u_inset__stretch__sm: { padding: space_sm, space_xs }, // 8px 4px
  // u_inset__stretch__md: { padding: space_md, space_sm }, // 16px 8px
  // u_inset__stretch__lg: { padding: space_lg, space_md }, // 32px 16px

  // Inset Vertical
  // stylelint_disable declaration_block_single_line_max_declarations
  u_inset__v__xs: { paddingTop: space_xs, paddingBottom: space_xs },
  u_inset__v__sm: { paddingTop: space_sm, paddingBottom: space_sm },
  u_inset__v__md: { paddingTop: space_md, paddingBottom: space_md },
  u_inset__v__lg: { paddingTop: space_lg, paddingBottom: space_lg },
  u_inset__v__xl: { paddingTop: space_xl, paddingBottom: space_xl },
  // stylelint_enable

});

export default layout_styles;





