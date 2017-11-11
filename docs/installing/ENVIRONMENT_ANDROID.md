# Preparing the Environment on Your Machine
[Go back to Readme Home](../../README.md)

## Installation for Android Development

  *NOTE: Android Studio can take a significant amount of hard drive space. The amount ranges
  but it appears to be common for the SDK and Studio to take up 20-30gb.  On top of this, running the emulator can
  also consume a great deal of hard drive and memory resources.  It appears that one should try to have 40gb free
  drive space in order to successfully install and emulate a project. This [post](https://stackoverflow.com/questions/30796230/android-sdk-folder-taking-a-lot-of-disk-space-do-we-need-to-keep-all-of-the-sys)
  has some advice on how to mitigate the problem but would require emulation through a connected Android mobile device.*

Go to [Facebook React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) and
click on the "Android" button. Steps described include:

- Downloading the latest Java SE Development Kit
- Install Android Studio

There is lots of info on our wiki at [Android Cheat Sheet](https://github.com/wevote/WeVoteReactNative/wiki/Android-Cheat-Sheet)

## Start the npm install process

    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios

This will take several minutes:

    (WebAppEnv) $ npm install

    (WebAppEnv) $ npm start

In Android Studio, open `WeVoteReactNative/android`

If you get any errors regarding missing files, click to add those.

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Install_Build_Tools.png" alt="alt text" width="600" >

In Android Studio, go to "Android Studio" menu. Choose "Preferences", and then open "System Settings". Choose these options, and then click the "SDK Tools" tab.

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Android_Install_SDK.png" alt="alt text" width="600" >

On the "SDK Tools" tab, choose these options, and then click "OK".

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Android_Install_SDK_Tools.png" alt="alt text" width="600" >

Confirm the changes:

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Android_Install_SDK_Confirm.png" alt="alt text" width="600" >

Now add simulator hardware by clicking on the "AVD Manager":

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/AVD_Manager_Icon.png" alt="alt text" width="141" >

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/AVD_Select_Hardware.png" alt="alt text" width="600" >

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Select_System_Image.png" alt="alt text" width="407" >

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Verify_Configuration.png" alt="alt text" width="372" >

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Verify_Configuration2.png" alt="alt text" width="320" >

---

Next: [Running WeVoteReactNative Android for the First Time](RUNNING_FIRST_TIME_ANDROID.md)


[Go back to Readme Home](../../README.md)
