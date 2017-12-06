import Dispatcher from "../dispatcher/Dispatcher";

export default class TabActions {

  static tabStateChanged () {
    Dispatcher.dispatch({
      type: "tabSelected",
      data: true
    });
  }
}
