var Dispatcher = require("../dispatcher/Dispatcher");
var FluxMapStore = require("flux/lib/FluxMapStore");

/*
Steve Podell [11:36 AM] 12/7/17
We are at Flux 2.1.1 in native and the webapp, the next major version “3.0.0” from Apr 15, 2016 — In 3.0 FluxMapStore was
removed from the distribution.    https://github.com/facebook/flux/blob/520a60c18aa3e9af59710d45cd37b9a6894a7bce/CHANGELOG.md

[11:37]
I’ll switch over to FluxReduceStore in native as a proof of concept.

Dale McGrew [11:37 AM]
That sounds great!
 */
class TabStore extends FluxMapStore {
  
  getInitialState () {
    return {
      success: true,
    };
  }

  reduce (state, action) {

    switch (action.type) {
      case "tabSelected":
        return {
          tabSelected: this.tabSelected,
          ...state
        };

      default:
        return state;
    }
  }
}

module.exports = new TabStore(Dispatcher);
