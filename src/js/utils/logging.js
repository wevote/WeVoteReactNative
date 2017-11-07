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

