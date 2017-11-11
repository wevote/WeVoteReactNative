# Debugging Tools and Tips
[Go back to Readme Home](../../README.md)

In the iOS simulator press Command+D to get the simulator debugger window (Command+M for Android)

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/iOS%20Debugger%20Menu.png" alt="alt text" width="600" >

There is a very similar menu in Android.  When you turn on "Remote debugging" in iOS the chrome tools will launch, in 
android you may have to launch them yourself `http://localhost:8081/debugger-ui`

This will open a browser debugger:

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Browser_Debugging_Display.png" alt="alt text" width="395" >

Click "Command + alt + j" to open the developer log. Then click on the "console" log to view the logging from the app.

HTTP/Ajax/XHR requests are hard to debug in simulators, since the requests go through proxy simulators. In src/js/config.js if
you enable...



---

Next: [Issues and Reporting Bugs](ISSUES.md)

[Go back to Readme Home](../../README.md)

