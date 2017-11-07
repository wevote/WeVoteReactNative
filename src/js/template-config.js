// Note that we import these values into constants "web_app_config" and "webAppConfig" (so we can load and use them)
module.exports = {
  //  WE_VOTE_URL_PROTOCOL: "http://",  // "http://" for local dev or "https://" for live server
  //  WE_VOTE_HOSTNAME: "localhost:3000",  // This should be without "http...". This is "WeVote.US" on live server.
  WE_VOTE_URL_PROTOCOL: "https://",  // "http://" for local dev or "https://" for live server
  WE_VOTE_HOSTNAME: "wevote.us",  // This should be without "http...". This is "WeVote.US" on live server.

  // Live production server
  WE_VOTE_SERVER_ROOT_URL: "https://api.wevoteusa.org/",
  WE_VOTE_SERVER_ADMIN_ROOT_URL: "https://api.wevoteusa.org/admin/",
  WE_VOTE_SERVER_API_ROOT_URL: "https://api.wevoteusa.org/apis/v1/",

  // API server (Python) on localhost, from an Android emulator in a VBox
  // WE_VOTE_SERVER_ROOT_URL: "http://10.0.3.2:8000/",
  // WE_VOTE_SERVER_ADMIN_ROOT_URL: "http://10.0.3.2:8000/admin/",
  // WE_VOTE_SERVER_API_ROOT_URL: "http://10.0.3.2:8000/apis/v1/",

  // API server (Python) on localhost, from an iOS emulator or the WebApp
  // WE_VOTE_SERVER_ROOT_URL: "http://127.0.0.1:8000/",
  // WE_VOTE_SERVER_ADMIN_ROOT_URL: "http://127.0.0.1:8000/admin/",
  // WE_VOTE_SERVER_API_ROOT_URL: "http://127.0.0.1:8000/apis/v1/",

  DEBUG_MODE: false,
  LOG_NATIVE_HTTP_REQUESTS: false,
  LOG_RNRF_ROUTING: true,
  LOG_RENDER_EVENTS: true,

  // Use 1 or 0 as opposed to true or false
  test: {
    use_test_election: 0,
  },

  location: {
    text_for_map_search: "",
  },


  STRIPE_API_KEY:                 "",

  FACEBOOK_APP_ID:                "",
  SOCIAL_AUTH_FACEBOOK_KEY:       "",
  SOCIAL_AUTH_FACEBOOK_SECRET:    "",

  SOCIAL_AUTH_TWITTER_KEY:        "",
  SOCIAL_AUTH_TWITTER_SECRET:     "",
};
