// accessed in VoterStore's getInterfaceFlagState method
// The bits are 1, 2, 4, 8, 16, ... 2 power x
const VoterConstants = {
  SUPPORT_OPPOSE_MODAL_SHOWN: 1,
  BALLOT_INTRO_MODAL_SHOWN: 2,
  NOTIFICATION_ZERO: 0,
  NOTIFICATION_NEWSLETTER_OPT_IN: 1, // "I would like to receive the We Vote newsletter"
};

// SUPPORT_OPPOSE_MODAL_SHOWN: When this bit is set, we know the voter has seen the initial support/oppose modal
// BALLOT_INTRO_MODAL_SHOWN: When this bit is set, we know the voter has seen the initial ballot introduction modal

module.exports = VoterConstants;
