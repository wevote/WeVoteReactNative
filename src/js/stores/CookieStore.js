import { Platform } from 'react-native';
import _ from "lodash";
import CookieManager from 'react-native-cookies';
import { default as webAppConfig } from '../config';
import Promise from 'bluebird';
const logging = require("../utils/logging");

// A wrapper class for react-native-cookie
class CookieStore {

  /*
  January 2018
  Since the api server is at api.wevoteusa.org and the WebApp is at wevote.us, we can't use the same voter_device_id
  cookie to go to both domains, since that would be a cross domain cookie.  So we will always send the cookie payload on
  the URL to the API server via SSL which will accept it as the equivalent to a valid cookie (see on the python side:
  voter_device_id = get_voter_device_id(request)  # We standardize how we take in the voter_device_id ).

  For the wevote.us webapp, we also will send the cookie payload as a parameter on the URL (see getJumpURLWithCookie),
  directed to a specific route in the webapp that reassembles the url, uses the cookie to join the sessions.
  */
  constructor() {
    let steve = webAppConfig.WE_VOTE_SERVER_ROOT_URL;
    console.log("steve steve steve " , steve);
    let host = new URL(webAppConfig.WE_VOTE_SERVER_ROOT_URL).hostname;
    this.state = {
      urlString: webAppConfig.WE_VOTE_SERVER_ROOT_URL,
      current_voter_device_id: '',
    };
    console.log("CookieStore constructor cookie host = " + host);
  };


  getCurrentVoterDeviceId () {
    return this.state.current_voter_device_id;
  }

  /*
  https://wevote.us/more/tools
  https://wevote.us/more/jump?jump_path=%2Fmore%2Ftools&voter_device_id=G834YIXbfsVB0z
   */
  getJumpURLWithCookie(inUrlString) {
    let url = new URL(inUrlString);
    let urlSearch = '';
    if(urlSearch.length > 1) {
      urlSearch = '&' + url.search.substr(1);  // '?key=value' to '&key=value'
    }
    let outUrlString = url.protocol + '//' + url.host + '/more/jump?jump_path=' + encodeURIComponent(url.pathname) +
      '&voter_device_id=' + this.state.current_voter_device_id + urlSearch;
    console.log("getJumpURLWithCookie transformed '" + inUrlString + "' to '" + outUrlString + "'");
    return outUrlString;
  }

  getItem(key, url) {
    if (key === 'voter_device_id' && this.state.current_voter_device_id.length > 0) {
      return this.state.current_voter_device_id;
    }
    return this.getPromisedItem(key, url);
  }

  getPromisedItem (key, url) {
    if (typeof(url) === 'undefined') {
      url = this.state.urlString;
    }

    if (Platform.OS === 'ios') {
      return CookieManager.getAll()
        .then((res) => {
          if (_.has(res, key)) {
            if(key === 'voter_device_id') {
              logging.httpLog("INITIALIZATION:  voter_device_id cookie set with cached value ", res[key].value);
              this.state.current_voter_device_id = res[key].value;
            }
            return res[key].value;
          }
        });
    } else {
      return CookieManager.get(url)
        .then( function (res) {
          if (_.has(res, key)) {
            if(key === 'voter_device_id') {
              logging.httpLog("INITIALIZATION:  voter_device_id cookie set with cached value ", res[key]);
              this.state.current_voter_device_id = res[key];
            }
            return res[key];
          }
        }.bind(this));
    }
  }

  setItem (key, value) {
    cookieString = key + '=' + value + '; path=/; expires=2025-05-30T12:30:00.00-08:00;';

    if (key === 'voter_device_id') {
      if( value === this.state.current_voter_device_id ) {
        // Please don't delete this logger
        // logging.httpLog(">>>>Set cookie iOS, value for voter_device_id already cached, no need to set cookie = ", value);
        return;
      }
      this.state.current_voter_device_id = value;
    }

    if (Platform.OS === 'ios') {
      const domain = new URL(this.state.urlString).hostname;
      console.log("cookie manager set cookie ios, domain = " + domain);

      CookieManager.set({
        name:   key,
        value:  value,
        domain: domain,
        origin: domain,
        path: '/',
        version: '1',
        expiration: '2025-05-30T12:30:00.00-08:00'
      }).then((res) => {
          logging.httpLog(">>>>Set cookie iOS (" + this.state.urlString + ") " + cookieString);
      });
    } else {  // 'android'
      CookieManager.setFromResponse(this.state.urlString, cookieString).then(() => {
          logging.httpLog(">>>>Set cookie Android (" + this.state.urlString + ") " + cookieString);
      });
    }
  }

  removeItem(key) {
    if (Platform.OS === 'ios') {
      CookieManager.clearByName(key)
        .then(() => {
          logging.httpLog(">>>>remove cookie (" + this.state.urlString + ") " + key);
        });
    } else {  // 'android'
      const cookieString = key + '=;expires=1970-01-02T00:00:00.00-08:00;';
      CookieManager.setFromResponse(this.state.urlString, cookieString).then(() => {
        logging.httpLog(">>>>remove cookie (" + this.state.urlString + ") " + cookieString);
      });
   }
  }

  logCookies(endpoint) {
    if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
      if (Platform.OS === 'ios') {
        CookieManager.getAll()
          .then((res) => {
            // Please don't delete this logger
            logging.httpLog('>>>>All iOS cookies before $ajax call to (' + endpoint + ') =>', res);
        });

      } else {
        CookieManager.get('https://www.facebook.com')
          .then((res) => {
            // Please don't delete this logger
            logging.httpLog('>>>>FACEBOOK Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
        CookieManager.get(this.state.urlString)
          .then((res) => {
            // Please don't delete this logger
            logging.httpLog('>>>>WeVoteAPI Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
      }
    }
  }
}
export default new CookieStore();
