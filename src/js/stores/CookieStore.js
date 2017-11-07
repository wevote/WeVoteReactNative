import { Platform } from 'react-native';
import _ from "lodash";
import CookieManager from 'react-native-cookies';
const webAppConfig = require("../config");
var Promise = require("bluebird");


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
    }
  };


  getCurrentVoterDeviceId(){
    return this.state.current_voter_device_id;
  }

  getItem(key, url) {
    if(key === 'voter_device_id' && this.state.current_voter_device_id.length > 0 ) {
      return this.state.current_voter_device_id;
    }

    if (typeof(url) === 'undefined') {
      url = this.state.urlString;
    }

    if (Platform.OS === 'ios') {
      CookieManager.getAll()
        .then((res) => {
          if (_.has(res, key)) {
            if(key === 'voter_device_id') {
              console.log("voter_device_id value cached ", res[key].value);
              this.state.current_voter_device_id = res[key].value;
            }
            return res[key].value;
          }
        });
    } else {
      CookieManager.get(url)
        .then((res) => {
          if (_.has(res, key)) {
            if(key === 'voter_device_id') {
              console.log("voter_device_id value cached ", res[key].value);
              this.state.current_voter_device_id = res[key].value;
            }
            return res[key].value;
          }
        });
    }
  }

  setItem(key, value) {
    cookieString = key + '=' + value + '; path=/; expires=2025-05-30T12:30:00.00-08:00;';

    if (key == 'voter_device_id')
      this.state.current_voter_device_id = value;

    if (Platform.OS === 'ios') {
      console.log("iOS iOS iOS iOS iOS iOS iOS iOS iOS value = ", value);
      CookieManager.set({
        name:   key,
        value:  value,
        domain: this.state.urlString,
        origin: this.state.urlString,
        path: '/',
        version: '1',
        expiration: '2025-05-30T12:30:00.00-08:00'
      }).then((res) => {
        if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
          console.log(">>>>Set cookie iOS (" + this.state.urlString + ") " + cookieString);
        }
      });
    } else {  // 'android'
      CookieManager.setFromResponse(this.state.urlString, cookieString).then(() => {
        if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
          console.log(">>>>Set cookie Android (" + this.state.urlString + ") " + cookieString);
        }
      });
    }
  }

  removeItem(key) {
    const cookieString = key + '=;expires=1970-01-02T00:00:00.00-08:00;';
    CookieManager.setFromResponse(this.state.urlString, cookieString).then(() => {
      if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
        console.log(">>>>remove cookie (" + this.state.urlString + ") " + cookieString);
      }
    });
  }

  logCookies(endpoint) {
    if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
      if (Platform.OS === 'ios') {
        CookieManager.getAll()
          .then((res) => {
          console.log('>>>>All iOS cookies before $ajax call to (' + endpoint + ') =>', res);
        });

      } else {
        CookieManager.get('https://www.facebook.com')
          .then((res) => {
            console.log('>>>>FACEBOOK Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
        CookieManager.get(this.state.urlString)
          .then((res) => {
            console.log('>>>>WeVoteAPI Android cookies before $ajax call to (' + endpoint + ') =>', res);
          });
      }
    }
  }


}
export default cookieStore = new CookieStore();

