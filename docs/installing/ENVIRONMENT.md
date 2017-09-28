# Preparing the Environment on Your Machine
[Go back to Readme Home](../../README.md)

## Install nodeenv ("Node Env")

Install nodeenv globally. For instructions installing it locally, see: https://github.com/ekalinin/nodeenv

    $ cd ~
    $ sudo pip install nodeenv

Create a place for your We Vote React Native virtual environment to live on your hard drive. (If you have already installed
the We Vote WebApp you should be able to use the existing environment you set up for that.) We recommend installing it
away from the WeVoteReactNative source code:

    $ mkdir /Users/<YOUR NAME HERE>/NodeEnvironments/
    $ cd /Users/<YOUR NAME HERE>/NodeEnvironments/

Now create a new virtual environment in that 'NodeEnvironments' folder. This can take many minutes.

    $ nodeenv WebAppEnv

Now activate this new virtual environment:

    $ cd /Users/<YOUR NAME HERE>/NodeEnvironments/WebAppEnv/
    $ . bin/activate

Confirm the versions of your main packages are >= to these versions:

    (WebAppEnv) $ node -v
    v6.3.1

    (WebAppEnv) $ npm -v
    3.10.5

IF you find that your node or npm versions are below that, run this command:

    (WebAppEnv) $ sudo npm install -g npm
    (WebAppEnv) $ npm rebuild node-sass
    (WebAppEnv) $ brew unlink node
    (WebAppEnv) $ brew install node



Many of the instructions below come from the React Native
[Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page.
We recommend referencing starting there. The notes that follow here are to supplement the Getting Started page.

## iOS

### Install Xcode

The easiest way to install Xcode is via the
<a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" target="_blank">Mac App Store.</a>  The Xcode.app download is 10gb in size.

### Node, Watchman, React Native command line interface

We recommend installing node and watchman via Homebrew.

    brew install node
    brew install watchman

Node comes with npm, which lets you install the React Native command line interface.

    npm install -g react-native-cli

If you get a permission error, try with sudo: `sudo npm install -g react-native-cli`.

### As of September 2017, only a couple of people have setup for iOS, so the following instructions may not be necessary
 

The installation of these components may have been captured by the

    /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcodeproj 
    
More about this file later!    

If you will need to add additional libraries that bridge JavaScript/ObjectiveC, you will need to install cocoapods

    sudo gem install cocoapods
    
Then install Cocoapods Specs    

    cd ~/.cocoapods/repos 
    git clone https://github.com/CocoaPods/Specs.git master
    
Once you are done with that, run react-native link.

    cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    ./node_modules/.bin/react-native link react-native-oauth
    
A successful run looks like this (in my case re-running and overwriting the previous Podfile):

    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteReactNative stevepodell$ 
    /Users/stevepodell/WebstormProjects/WeVoteReactNative/node_modules/.bin/react-native link react-native-oauth
    Scanning 523 folders for symlinks in /Users/stevepodell/WebstormProjects/WeVoteReactNative/node_modules (9ms)
    Preparing to link react-native-firestack for iOS
    Checking CocoaPods...
    CocoaPods already installed
    rnpm-install info Android module react-native-oauth is already linked 
    rnpm-install info iOS module react-native-oauth is already linked 
    Checking Podfile in iOS project (/Users/stevepodell/WebstormProjects/WeVoteReactNative/ios/Podfile)
    
    Found an existing Podfile, Do you want to override it? [N/y]
    y
    Adding Podfile to iOS project
    Installing Pods
    Analyzing dependencies
    Pre-downloading: `DCTAuth` from `https://github.com/danielctull/DCTAuth.git`
    Downloading dependencies
    Installing DCTAuth 3.0 (was 3.0)
    Generating Pods project
    Integrating client project
    Sending stats
    Pod installation complete! There is 1 dependency from the Podfile and 1 total pod installed.
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteReactNative stevepodell$ 


**Clean Build:**

You probably will need to "Clean Build Folder" to do this in XCode, on the Product menu, hold down the Option button 
(on your Mac) and select "Clean Build Folder", after it completes (about 10 seconds), press the triangular
Run (Play) button do to a full rebuild

## Android

Go to [Facebook React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) and
click on the "Android" button. Steps described include:

- Downloading the latest Java SE Development Kit
- Install Android Studio

  *NOTE: Android Studio can take a significant amount of hard drive space. The amount ranges
  but it appears to be common for the SDK and Studio to take up 20-30gb.  On top of this, running the emulator can
  also consume a great deal of hard drive and memory resources.  It appears that one should try to have 40gb free
  drive space in order to successfully install and emulate a project. This [post](https://stackoverflow.com/questions/30796230/android-sdk-folder-taking-a-lot-of-disk-space-do-we-need-to-keep-all-of-the-sys)
  has some advice on how to mitigate the problem but would require emulation through a connected Android mobile device.*


## Get ready to retrieve WeVoteReactNative code

Create a place to put all of the code from Github:

    $ mkdir /Users/<YOUR NAME HERE>/MyProjects/


---

Next: [Bringing Code to Your Machine](CLONING_CODE.md)

[Go back to Readme Home](../../README.md)
