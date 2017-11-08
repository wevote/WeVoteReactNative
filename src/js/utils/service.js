/**
 * The idea of this APIS.js (WeVote service.js) file is to abstract away the details
 * of many repetitive service calls that we will be using.
 * @author Nick Fiorini <nf071590@gmail.com>
 */
"use strict";

import * as request from "superagent";
import CookieStore from '../stores/CookieStore';

const url = require("url");
const assign = require("object-assign");
const webAppConfig = require("../config");
const logging = require("../utils/logging");


const DEBUG = false;


const defaults = {
  dataType: "json",
  baseUrl: webAppConfig.WE_VOTE_SERVER_API_ROOT_URL,
  url: webAppConfig.WE_VOTE_SERVER_API_ROOT_URL,
  query: {},
  type: "GET",
  data: function () {
    const id = CookieStore.getCurrentVoterDeviceId();
    return id !== null && id.length > 0 ? {
      voter_device_id: id
    } : {};
  },
  success: (res) => console.warn("Success function not defined:", res),
  error: (err) => console.error(err.message)
};

export function $ajax (options) {
  if (!options.endpoint) throw new Error("$ajax missing endpoint option");

  CookieStore.logCookies(options.endpoint);

  options.data = assign({}, defaults.data(), options.data || {});
  options.crossDomain = true;
  options.success = options.success || defaults.success;
  options.error = options.error || defaults.error;
  options.url = url.resolve(defaults.baseUrl, options.endpoint) + "/";

  let test = defaults.data();

  if(options.data) {
    options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.data);
  }

  if (options.url.indexOf('voter_device_id') === -1) {
    if( CookieStore.getCurrentVoterDeviceId().length > 0 ) {
      const cookie = 'voter_device_id=' + CookieStore.getCurrentVoterDeviceId();
      logging.httpLog("$ajax sent cookie ", cookie);
      if (options.url.slice(-1) === '?') {
        options.url += cookie;
      } else {
        options.url += '&' + cookie;
      }
    } else {
      logging.httpLog("$ajax cookie, No voter_device_id found in service.js/ajax");
    }
  }

  //console.log("FETCH options", options)
  return fetch(options.url, {credentials: 'same-origin'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.hasOwnProperty('voter_device_id') && responseJson.voter_device_id.length > 0) {
        // The following console log should be permanent, do not delete it
        console.log("service Setting new voter_device_id, to '" + responseJson.voter_device_id + "'" );  // Do not delete
        CookieStore.setItem('voter_device_id', responseJson.voter_device_id);
      }

      logging.httpLog(">>HTTP FETCH $ajax for (" + options.endpoint + ")");
      if (responseJson.hasOwnProperty('voter_device_id')) {
        logging.httpLog(">>HTTP responseJson:" + options.endpoint + ' : ' + responseJson.voter_device_id + ' : ' +
          responseJson.status);
      } else {
        logging.httpLog(">>HTTP responseJson:" + options.endpoint + ' : ' + responseJson.status);
      }

      const res = responseJson;
      this.dispatch({ type: options.endpoint, res });
    })
    .catch((error) => {
      console.error(">>HTTP FETCH $ajax error", error, options.endpoint);
      this.dispatch({type: "error-" + options.endpoint, error});
    });
}


function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

/*
September 2017, this is Rohan's first pass at doing the Twitter oAuth redirect in a similar way to the way the WebApp
does it.   He was very close, and I added a bit to it, and setup the iOS schemes and added
ObjectiveC in ios/WeVoteReactNAtive/AppDelegate.m to handle the "scheme" which I labeled "wevotetwitterscheme" and I got
it to work.

Two issues:
1) Incoming URLs to an Apple app are defined in "Project Settings" -> Info -> URL Types in the Xcode development app,
   the "Scheme"s that you define, allow incoming responses or requests to be routed to the WebApp then you use the
   Linking JavaScript library to set a handler for that scheme.   The issue is that in order to get python to redirect
   to an Apple scheme other than the predfined schemes {http,https,ftp}, I had to modify a library routine as follows:

     class HttpResponseRedirectBase(HttpResponse):
         allowed_schemes = ['http', 'https', 'ftp', 'wevotetwitterscheme']

   ... modifying a library routine is a drag.  In Java you can override a method in a library, and I suspect we could do
   the same in Python, but that is sort of a last resort.  If we revived this $ajax_twitter_sign_in

2) When the wevotetwitterscheme redirect comes back to the Safari window opened by the native app to display the twitter
   hosted login page, you get a "Open this page in "WeVoteReactNative?" question -- This one would be hard to get around
   without writing some significant ObjectiveC for the project.  As is, it looks and acts kind of lame.  Pressing Cancel
   leaves you on a dead-end page in Safari.  This is a known issue, and might be a purposeful feature on Apple's part to
   provide extra security in some circumstances.

So based on these two issues, I went with the react-native-oauth solution, which works really well, and is very simple.
One drawback with react-native-oauth is that it requires you to configure the iOS app with the twitter and facebook
oauth secrets, where with the $ajax_twitter_sign_in and the equivalent in the WebApp, those secrets are only configured
on our production Python servers.  Not a big deal, but not ideal.  The other drawback of is that we don't "do it
exactly the same" as in the WebApp, again not a big deal.
 */
// import {Linking, WebView} from 'react-native';
// const MessageQueue = require('MessageQueue');
// const Dispatcher = require("flux/lib/Dispatcher");

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
//
// export function get (options) {
//   let opts = assign(defaults, options);
//
//   opts.url = url.resolve(opts.baseUrl, opts.endpoint);
//   // We add voter_device_id to all endpoint calls
//   console.log("WE THOUGHT GET WAS DEPRECATED, BUT WE ARE CALLING IT FROM SOMEWHERE");
//   opts.query.voter_device_id = CookieStore.getItem("voter_device_id");
//
//   return new Promise( (resolve, reject) => new request.Request("GET", opts.url)
//     .accept(opts.dataType)
//     .query(opts.query)
//     .withCredentials()
//     .end((err, res) => {
//       if (err) {
//         if (opts.error instanceof Function === true)
//           opts.error(err || res.body);
//
//         reject(err);
//       } else {
//         if (opts.success instanceof Function === true)
//           opts.success(res.body);
//         else if (DEBUG)
//           console.warn(res.body);
//
//         resolve(res.body);
//       }
//     })
//   );
// }
