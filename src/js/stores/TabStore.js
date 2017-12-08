import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';

class TabStore extends ReduceStore {
  
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
