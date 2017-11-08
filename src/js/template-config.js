import { Platform } from 'react-native';
// Note that we import these values as webAppConfig so that we can access them
const isIos = (Platform.OS === 'ios');

const LIVE_SERVER = false;  // is this the live production server?  (false for developers with local api servers)

const SERVER_ROOT_URL = LIVE_SERVER ? "https://api.wevoteusa.org/" :
  isIos ? "http://127.0.0.1:8000/" : "http://10.0.3.2:8000/";
const SERVER_ADMIN_ROOT_URL = LIVE_SERVER ? "https://api.wevoteusa.org/admin/" :
  isIos ? "http://127.0.0.1:8000/admin/" : "http://10.0.3.2:8000/admin/";
const SERVER_API_ROOT_URL = LIVE_SERVER ? "https://api.wevoteusa.org/apis/v1/" :
  isIos ? "http://127.0.0.1:8000/apis/v1/" : "http://10.0.3.2:8000/apis/v1/";
const URL_PROTOCOL = LIVE_SERVER ? "https://" : "http://";
const HOSTNAME = LIVE_SERVER ? "WeVote.US" : "localhost:3000";

module.exports = {
  WE_VOTE_URL_PROTOCOL: URL_PROTOCOL,
  WE_VOTE_HOSTNAME: HOSTNAME,

  WE_VOTE_SERVER_ROOT_URL:       SERVER_ROOT_URL,
  WE_VOTE_SERVER_ADMIN_ROOT_URL: SERVER_ADMIN_ROOT_URL,
  WE_VOTE_SERVER_API_ROOT_URL:   SERVER_API_ROOT_URL,

  DEBUG_MODE: true,
  LOG_NATIVE_HTTP_REQUESTS: true,
  LOG_RNRF_ROUTING: true,
  LOG_RENDER_EVENTS: true,

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
