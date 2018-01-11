import { Actions } from 'react-native-router-flux';
import Dispatcher from "../dispatcher/Dispatcher";
import RouteConst from "../scenes/RouteConst"

export default class TabActions {

  static tabPressed (scene) {
    /*
    January 2018, Observed locations of the data we need, with
      "react-native": "0.47.2"
      "react-native-router-flux": "4.0.0-beta.24"
      "flux": "3.1.3"
      "react-router": "4.2.0"
      "react-router-native": "4.2.0"
    Observed locations of the data we need...
      current key can be at
        scene.route.key
        scene.scene.route.key
      previous key can be at
        scene.previousScene.key
        scene.scene.previousScene.key
     */

    let scene_local;
    if (scene.route) {
      scene_local = scene;
    } else if (scene.scene.route) {
      scene_local = scene.scene;
    } else {
      console.log("ERROR: tabPressed was unable to find a sceneLocal");
      return;
    }

    let sceneLocal = scene_local;
    let currentKey = sceneLocal.route.key;
    let previousKey;
    if (sceneLocal.previousScene) {
      previousKey = sceneLocal.previousScene.key;
    } else if (scene.previousScene) {
      previousKey = scene.previousScene.key;
    } else {
      console.log("ERROR: tabPressed was unable to find a sceneLocalPrevious");
      return;
    }
    console.log('TabActions.TabPress,  currentKey = ' + currentKey + ',  previousKey = ', previousKey + ',');
    // if on the signin tab, and you click the sign in tab.  A special case.
    if (previousKey === RouteConst.KEY_SIGNIN_1 && previousKey === currentKey ) {
      TabActions.tabStateChanged();
    }

    return Actions[scene_local.route.key].call();
  }

  static tabStateChanged () {
    console.log('TabActions, received tabStateChanged');
    Dispatcher.dispatch({
      type: "tabSelected",
      data: true
    });
  }
}
