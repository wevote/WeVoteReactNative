# Running WeVoteReactNative for the First Time
[Go back to Readme Home](../../README.md)

Please make sure you have read:

* [Preparing the Environment on Your Machine](ENVIRONMENT.md)

* [Bringing Code to Your Machine](CLONING_CODE.md)

## iOS 

### Method 1 - Quick

    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    (WebAppEnv) $ react-native run-ios

This opens the iOS simulator.

## Method 2 - Preferred

I recommend this method because then you have easier access to the XCode console log.

1. Open XCode.

2. From within XCode, open this project.  **Be sure to open the xcworkspace!**  (not the xcodeproj!):

    `/Users/\<YOUR NAME HERE\>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcworkspace`

Don't pick a project from the reverse blue history list on the top right of the dialog, those are xcodeproj's not the xcodeproj files that you need to use.

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Welcome%20To%20Xcode.png" alt="alt text" width="600" >

Clic the "Open another project..." link at the bottom right, then select the WeVoteReactNative.xcworkspace entry.

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/iOS%20SelectWorkspace.png" alt="alt text" width="600" >

3. Click the "Play" (sideways triangle button), and this opens the iOS Simulator.

## Method 3 - For Webstorm users

See "Developing mobile apps with React Native in WebStorm" - <https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/>

**Be sure to open the xcworkspace!**  (not the xcodeproj!):

        /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcworkspace


### Additional Notes (iOS)

If your build is failing due to an issue with RCTWebSocket, you may have to follow the following steps:

1. Cmd+space to bring up spotlight search, type in and double click "RCTWebSocket.xcodeproj".

2. In the project navigator on the left side, click the RCTWebSocket file and click "Build Settings" on the top navbar.

3. Select "All" and "Combined" on the second level of the top navbar below "Build Settings".

4. Look for "Apple LLVM 8.0 - Custom Compiler Flags" and remove all the flags under "Other warning flags". You can do this by double clicking the existing flags and pressing the minus button to remove them individually.

If your build fails due to an error with the message `Ignoring return value of function declared with warn_unused_result attribute`, proceed as instructed below:

1. Cmd+space to bring up spotlight search, type in and double click "RCTWebSocket.M".

2. In "RCTWebSocket.M", find the lines: 
```
   int result = SecRandomCopyBytes(kSecRandomDefault, sizeof(uint32_t), (uint8_t *)mask_key);
   assert(result == 0);
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment them out and add the following line:
```
   //int result = SecRandomCopyBytes(kSecRandomDefault, sizeof(uint32_t), (uint8_t *)mask_key);
   //assert(result == 0);
   (void)SecRandomCopyBytes(kSecRandomDefault, sizeof(uint32_t), (uint8_t *)mask_key);
```


2. Also in "RCTWebSocket.M", find the lines: 
```
  int result = SecRandomCopyBytes(kSecRandomDefault, keyBytes.length, keyBytes.mutableBytes);
  assert(result == 0);
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment them out and add the following line:

```
  //int result = SecRandomCopyBytes(kSecRandomDefault, keyBytes.length, keyBytes.mutableBytes);
  //assert(result == 0);
  (void)SecRandomCopyBytes(kSecRandomDefault, keyBytes.length, keyBytes.mutableBytes);
```

## Android
See our ReactNative wiki [Android Cheat Sheet](https://github.com/wevote/WeVoteReactNative/wiki/Android-Cheat-Sheet)
There are all sorts of issues/solutions in the sheet that will be necessary until some packages get fixed. 

[Android Setup from react-native release notes](https://facebook.github.io/react-native/releases/0.45/docs/android-setup.html)

Start up Android Studio
File Menu, Open, Navigate to your android directory in your WeVoteReactNative project and 
press Ok
Run your project by opening the Run menu, Edit configurations
In the upper left hand corner of the dialog, press the '+' and select Gradle


### Genymotion
If you can't get the Android emulator that comes with the Android Studio working, the third-party alternative [Genymotion](https://www.genymotion.com/) works very well.
Genymotion is a purchased product, but when your Trial period runs out, you can select "Genymotion for personal use" which
is a free license.  When setting up your run configuration in on the General tab, under "Deployment Target Options",
select "USB Device" (even though it isn't a USB device).  When about to run, start the OSX
"Genymotion" application, and press start (after configuring a device of your choice, I used a Google Nexus6, and 
Android 7.0 Nougat, since I had trouble with 8.0).
 

### Missing requirements

Since we're using external packages like `react-native-elements`, some dependency issues may arise. The work-around for this is to identify which dependencies are required by doing `npm install` and then adding the missing dependencies by `npm install --save <pkg_name>@<pkg_version>`


****

## General note about node_modules and manual fixes that we had to make to them
If you are 'stack-overflowing' around trying to resolve npm issues, be careful about
deleting all the node modules and re-installing them.  You will see recommendations to 
"rm -rf node_modules" and then "npm i", ie: physically remove all the downloaded node
modules and rebuild from fresh copies, based on the latest versions specified in package.json.

The problem with starting from scratch is (unfortunately) other work arounds will have you 
editing the source in these downloaded modules, and removing all, will end up with all those edits being lost.
Eventually we will get to stability with react-native and other modules that include ObjectiveC and Java, but we are
not there yet.

---

Next: [Working with WeVoteReactNative Day-to-Day](../working/README_WORKING_WITH_REACT_NATIVE.md)

[Go back to Readme Home](../../README.md)
