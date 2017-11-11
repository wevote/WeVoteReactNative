# Running WeVoteReactNative on Android for the First Time
[Go back to Readme Home](../../README.md)

Please make sure you have read:

* [Preparing the Environment on Your Machine](ENVIRONMENT_ANDROID.md)

* [Bringing Code to Your Machine](CLONING_CODE.md)

## Android
See our ReactNative wiki [Android Cheat Sheet](https://github.com/wevote/WeVoteReactNative/wiki/Android-Cheat-Sheet)
There are all sorts of issues/solutions in the sheet that will be necessary until some packages get fixed. 

[Android Setup from react-native release notes](https://facebook.github.io/react-native/releases/0.45/docs/android-setup.html)

Start up Android Studio

File Menu, Open, Navigate to your android directory in your WeVoteReactNative project and 
press Ok

Run your project by opening the Run menu, Edit configurations

In the upper left hand corner of the dialog, press the '+' and select Gradle. TODO: Gradle settings needed here


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
