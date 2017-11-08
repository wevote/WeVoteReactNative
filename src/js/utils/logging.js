const webAppConfig = require("../config");

// react-native-router-flux state change logging
export function rnrfLog(text) {
  if (webAppConfig.LOG_RNRF_ROUTING) {
    console.log("RNRF ", text);
  }
}

//  Log renders (so we can eliminate unnecessary ones to improve performance)
export function renderLog(fileName, suffix) {
  if (webAppConfig.LOG_RENDER_EVENTS) {
    console.log(fileName, " =================== render () ", suffix || "");
  }
}

//  Log http requests and cookie CHANGES
export function httpLog(text, res) {
  if (webAppConfig.LOG_NATIVE_HTTP_REQUESTS) {
    if (res) {
      console.log(text, res);
    } else {
      console.log(text);
    }
  }
}

