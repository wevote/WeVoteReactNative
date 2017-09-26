/**
 * The idea of this APIS.js file is to abstract away the details
 * of many repetitive service calls that we will be using.
 * @author Nick Fiorini <nf071590@gmail.com>
 */
"use strict";

import {Linking, WebView} from 'react-native';
import * as request from "superagent";
import CookieStore from '../stores/CookieStore';
const Dispatcher = require("flux/lib/Dispatcher");
const url = require("url");
const assign = require("object-assign");
const webAppConfig = require("../config");
const MessageQueue = require('MessageQueue');

const DEBUG = false;


const defaults = {
  dataType: "json",
  baseUrl: webAppConfig.WE_VOTE_SERVER_API_ROOT_URL,
  url: webAppConfig.WE_VOTE_SERVER_API_ROOT_URL,
  query: {},
  type: "GET",
  data: function () {
    const id = CookieStore.getItem("voter_device_id");
    return id !== null && id.length > 0 ? {
      voter_device_id: id
    } : {};
  },
  success: (res) => console.warn("Success function not defined:", res),
  error: (err) => console.error(err.message)
};

export function $ajax (options) {
  if (!options.endpoint) throw new Error("$ajax missing endpoint option");

  options.data = assign({}, defaults.data(), options.data || {});
  options.crossDomain = true;
  options.success = options.success || defaults.success;
  options.error = options.error || defaults.error;
  options.url = url.resolve(defaults.baseUrl, options.endpoint) + "/";

  if(options.data) {
    options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.data);
  }
  return fetch(options.url)
    .then((response) => response.json())
    .then((responseJson) => {
      let cookie = CookieStore.getItem("voter_device_id");
      console.log("voter_device_id in fetch (" +  options.endpoint + ") " + ( typeof cookie === 'object' ? JSON.stringify(cookie) + " object " : cookie + " string"));
      console.log("responseJson:" + options.endpoint + ' : ' + responseJson.voter_device_id);
        const res = responseJson;
        this.dispatch({ type: options.endpoint, res });
    })
    .catch((error) => {
      console.error(error, options.endpoint);
      this.dispatch({type: "error-" + options.endpoint, error});
    });
  //return window.$.ajax(options);
}

// export function $ajax_twitter_sign_in (options) {
//   if (!options.endpoint) throw new Error("$ajax missing endpoint option");
//   options.data = assign({}, defaults.data(), options.data || {});
//   options.crossDomain = true;
//   options.success = options.success || defaults.success;
//   options.error = options.error || defaults.error;
//   options.url = url.resolve(defaults.baseUrl, options.endpoint) + "/";
//   console.log("$ajax_twitter_sign_in, data:" + JSON.stringify(options.data));
//
//
//   if(options.data) {
//     options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.data);
//   }
//   console.log("$ajax_twitter_sign_in, ZZZZZZZZZZZ options.url:" + options.url);
//   return fetch(options.url)
//     .then((response) => response.json())
//     .then((responseJson) => {
//         const res = responseJson;
//         console.log("--------------------------------------------------");
//         console.log("$ajax_twitter_sign_in:" + JSON.stringify(res));
//       /* {"status":"TWITTER_REDIRECT_URL_RETRIEVED","success":true,"voter_device_id":"eb9u3c7RhSWzNDMisXUsffWqGwfMBZTidwiofc1AOIRsxVLsVgU5kFGUoe3o7SpVtsbrBXZ5hjL3iBuz2FJzSxpk",
//         "twitter_redirect_url":"https://api.twitter.com/oauth/authorize?oauth_token=J0mTaQAAAAAAj-_ZAAABXqsNeaU",
//         "voter_info_retrieved":false,"switch_accounts":false}
//       */
//
//         if (res.twitter_redirect_url) {
//           console.log("$ajax_twitter_sign_in, before Linking to redirect:" + res.twitter_redirect_url);
//           let linkingURL = res.twitter_redirect_url + "&" + "wevotetwitterscheme://twitter_sign_in";
//           Linking.openURL(linkingURL).then(respo => {
//             console.log("$ajax_twitter_sign_in on Linking response from twitter" + JSON.stringify(respo) );
//             MessageQueue.spy((info)=>console.log("event!", info))
//           }).catch(err => console.error('An error occurred', err));
//         } else {
//           console.log("twitterSignInStart ERROR res: ", res);
//           Linking.openURL("").catch(err => console.error('An error occurred', err));
//         }
//     })
//     .catch((error) => {
//       console.error(error, options.endpoint);
//       Linking.openURL("").catch(err => console.error('An error occurred', err));
//     });
// }

function queryParams(params) {
  return Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  .join('&');
}

export function get (options) {
  let opts = assign(defaults, options);

  opts.url = url.resolve(opts.baseUrl, opts.endpoint);
  // We add voter_device_id to all endpoint calls
  opts.query.voter_device_id = CookieStore.getItem("voter_device_id");

  return new Promise( (resolve, reject) => new request.Request("GET", opts.url)
    .accept(opts.dataType)
    .query(opts.query)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        if (opts.error instanceof Function === true)
          opts.error(err || res.body);

        reject(err);
      } else {
        if (opts.success instanceof Function === true)
          opts.success(res.body);
        else if (DEBUG)
          console.warn(res.body);

        resolve(res.body);
      }
    })
  );
}
