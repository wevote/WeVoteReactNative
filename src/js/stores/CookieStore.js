import { Platform } from 'react-native';
import _ from "lodash";
import CookieManager from 'react-native-cookies';
const webAppConfig = require("../config");
const Promise = require("bluebird");
const logging = require("../utils/logging");

/*
A wrapper class for react-native-cookies, that handles API cookies
It could be expanded to handle cookies for any url...
*/
class CookieStore {

  constructor() {
    let url = webAppConfig.WE_VOTE_SERVER_ROOT_URL.substring(0, webAppConfig.WE_VOTE_SERVER_ROOT_URL.length -1);
    this.state = {
      urlString: url,
      current_voter_device_id: '',
    };
  };


  getCurrentVoterDeviceId(){
    return this.state.current_voter_device_id;
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
        logging.httpLog(">>>>Set cookie iOS, value for voter_device_id already cached, no need to set cookie = ", value);
        return;
      }
      this.state.current_voter_device_id = value;
    }

    if (Platform.OS === 'ios') {
      const domain = new URL(this.state.urlString).hostname;

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
            logging.httpLog('>>>>All iOS cookies before $ajax call to (' + endpoint + ') =>', res);
        });

      } else {
        CookieManager.get('https://www.facebook.com')
          .then((res) => {
            logging.httpLog('>>>>FACEBOOK Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
        CookieManager.get(this.state.urlString)
          .then((res) => {
            logging.httpLog('>>>>WeVoteAPI Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
      }
    }
  }

}
export default cookieStore = new CookieStore();

