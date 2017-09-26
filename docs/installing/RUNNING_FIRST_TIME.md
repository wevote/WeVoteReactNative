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


    /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcworkspace
    ~~/Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcodeproj~~



3. Click the "Play" (sideways triangle button), and this opens the iOS Simulator.

## Method 3 - For Webstorm users

See "Developing mobile apps with React Native in WebStorm" - <https://blog.jetbrains.com/webstorm/2016/12/developing-mobile-apps-with-react-native-in-webstorm/>

**Be sure to open the xcworkspace!**  (not the xcodeproj!):

        /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcworkspace


### Additional Notes

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


### Missing requirements

Since we're using external packages like `react-native-elements`, some dependency issues may arise. The work-around for this is to identify which dependencies are required by doing `npm install` and then adding the missing dependencies by `npm install --save <pkg_name>@<pkg_version>`


---


Next: [Working with WeVoteReactNative Day-to-Day](../working/README_WORKING_WITH_REACT_NATIVE.md)

[Go back to Readme Home](../../README.md)
****