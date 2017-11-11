# Debugging Tools and Tips
[Go back to Readme Home](../../README.md)


# Debugging react-native Android:

Open Android Studio, by selecting the android dir within the WeVoteReactNative dir.

Android Studio is not be useful for the JavaScript part, only for the Java, packing, simulator launching, and logger viewing for the app.  

You need to get a simulator running before going much further.  I used AMD, the free one that comes from Facebook (not Genymotion).  And Nuclide is no longer available for react-native.  
As of October 2, 2017 don't choose the latest 8.0 Nougat, instead use 7.1 Nougat -- react-native-oauth has a problem with 8.0.

If you run into compile issues, see the [Android Cheat Sheet Wiki Page](https://github.com/wevote/WeVoteReactNative/wiki/Android-Cheat-Sheet_)

In the Android simulator press ⌘+M to get the simulator debugger window (⌘+D for iOS)

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Android%20Simulator%20Debug%20Menu.png" alt="alt text" width="400" >

Once the simulator is running, and you have the JavaScript packager is running on port 8081, 
you should see the app in the simulator. After pressing ⌘+M, click "Remote JS Debugging" in Android simulator, if the chrome tools are not
already launched, you may have to launch them yourself `http://localhost:8081/debugger-ui`

This will open a Chrome dev tools browser debugger:

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Browser_Debugging_Display.png" alt="alt text" width="395" >

Click "⌘+⌥+j" to open the developer log. Then click on the "console" log to view the logging from the app.  
Then you should see the debuggerWorker.js in the Sources pane, click through to find your source files and apply breakpoints as needed.

HTTP/Ajax/XHR requests are hard to debug in simulators, since the requests go through proxy simulators. In src/js/config.js if
you enable LOG_NATIVE_HTTP_REQUESTS to true, much of the request info will end up in the console log in the debugger.



# Some Useful Articles

[react-native getting-started.html](https://facebook.github.io/react-native/releases/0.45/docs/getting-started.html#content)

[https://medium.com/@vinceyuan/react-native-debugging-tools-3a24e4e40e4](https://medium.com/@vinceyuan/react-native-debugging-tools-3a24e4e40e4)

[medium.com react-native-my-developer-guide-to-configure-build-and-publish-using-mac-for-android](https://medium.com/@sunilk/react-native-my-developer-guide-to-configure-build-and-publish-using-mac-for-android-2df123138640)

[medium.com running-react-native-app-on-the-android-emulator](https://medium.com/@deepak.gulati/running-react-native-app-on-the-android-emulator-11bf309443eb)


# Some pictures of a working Android Studio setup
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Main Screen.png" alt="alt text" width="395" >
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Proj Structure SDK Tab.png" alt="alt text" width="395" >
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Run Config General Tab.png" alt="alt text" width="395" >
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Run Config Misc Tab.png" alt="alt text" width="395" >
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Run Config Debug Tab.png" alt="alt text" width="395" >
<img src="https://github.com/wevote/WeVoteReactNative/tree/develop/docs/images/Android Studio Run Config Profiling Tab.png" alt="alt text" width="395" >



---

Next: [Issues and Reporting Bugs](ISSUES.md)

[Go back to Readme Home](../../README.md)

