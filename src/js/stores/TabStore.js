var Dispatcher = require("../dispatcher/Dispatcher");
var FluxMapStore = require("flux/lib/FluxMapStore");

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
          ...state
        };

      default:
        return {
          ...state
        };
    }
  }
}

module.exports = new TabStore(Dispatcher);
