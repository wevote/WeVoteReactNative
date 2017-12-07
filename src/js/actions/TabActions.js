import Dispatcher from "../dispatcher/Dispatcher";

export default class TabActions {

  static tabStateChanged () {
    console.log('TabActions, received tabStateChanged');
    Dispatcher.dispatch({
      type: "tabSelected",
      data: true
    });
  }
}
