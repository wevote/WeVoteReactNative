# Installation for iOS Development
[Go back to Readme Home](../../README.md)

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

### iOS specific setup
 


Be sure to open **`/Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcworkspace`** each time, if
you forget the compile will fail, since you won't have referenced the cocopods (a dependency manger, that pulls in some iOS 
specific libraries.)

Be sure to NOT open ~~`/Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/WeVoteReactNative.xcodeproj`~~ with Xcode, 
and don't pick one out of the history in the Welcome to Xcode dialog.  The history unfortunately only contains contains 
references to .xcodeproj files.



![](../images/Welcome To Xcode.png)


And in the "Welcome to Xcode" dialog, don't pick anything from the history list (those are all xcodeproj files), you have to
click "Open another project..." and navigate to the 'WeVoteReactNative.xcworkspace' item (which is actually a directory).
    
#### The following may not be necessary for developers who don't need to add libaries that contain ObjectiveC 

The installation of these components may have been captured by the `ios/Podfile` and the `ios/WeVoteReactNative/Info.plist`, 
until a new volunteer starts working on this, and gets it going from scratch, we won't know for sure.

Check to make sure you have Ruby version 2.3 or greater.
(For more information, see: http://codingpad.maryspad.com/2017/04/29/update-mac-os-x-to-the-current-version-of-ruby/):

    (WebAppEnv)dalemcgrew:ios dalemcgrew$ ruby -v
    ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-darwin13.0]
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ curl -L https://get.rvm.io | bash -s stable
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm reload
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm install ruby-2.4.2
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm use ruby-2.4.2
    Using /Users/dalemcgrew/.rvm/gems/ruby-2.4.2

    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm --default use 2.4.2
    Using /Users/dalemcgrew/.rvm/gems/ruby-2.4.2


If you will need to add additional libraries that bridge JavaScript/ObjectiveC, you will need to install cocoapods:

    cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative/ios/

    sudo gem install cocoapods
    
If you get an error that looks like `Unable to download data from https://rubygems.org/ - SSL_connect`, you can run this command to fix it, and then try again:

    rvm osx-ssl-certs update all
    
    sudo gem install cocoapods
    
Then install Cocoapods Specs    

    cd ~/.cocoapods/repos 
    git clone https://github.com/CocoaPods/Specs.git master
    
    cd ~/MyProjects/WeVoteReactNative/ios
    
    npm update
    
    npm install
    
    cd ~/MyProjects/WeVoteReactNative
    
    npm install
    
Next run react-native link.  Do not overwrite the source controlled `ios/Podfile`, it has been 
hand coded and is necessary for authentication to Twitter and Facebook.

    react-native link react-native-oauth
    
A successful run looks like this (in my case re-running the previous Podfile):

    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteReactNative stevepodell$ react-native link react-native-oauth
    Scanning 611 folders for symlinks in /Users/stevepodell/WebstormProjects/WeVoteReactNative/node_modules (4ms)
    Preparing to link react-native-firestack for iOS
    Checking CocoaPods...
    CocoaPods already installed
    rnpm-install info Android module react-native-oauth is already linked 
    rnpm-install info iOS module react-native-oauth is already linked 
    Checking Podfile in iOS project (/Users/stevepodell/WebstormProjects/WeVoteReactNative/ios/Podfile)
    
    Found an existing Podfile, Do you want to override it? [N/y]
    n
    Add the following pods:
    
    
    source 'https://github.com/CocoaPods/Specs.git'
    platform :ios, '8.0'
    use_frameworks!
    
    pod 'DCTAuth', :git => 'https://github.com/danielctull/DCTAuth.git'
    
    
    and run 'pod install' to install OAuth for iOS
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteReactNative stevepodell$ 

Change back to WeVoteReactNative directory:

    cd ~/MyProjects/WeVoteReactNative

Then run `pod setup`

If you get an error `bash: /usr/local/bin/pod: Permission denied`, then you may need to open a new terminal window, activate your environment again, 
and change back to WeVoteReactNative directory:

    cd ~/MyProjects/WeVoteReactNative

    (WebAppEnv)dalemcgrew:ios dalemcgrew$ echo rvm_auto_reload_flag=1 >> ~/.rvmrc
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ echo rvm_auto_reload_flag=2 >> ~/.rvmrc

Then run `pod setup`

change back to WeVoteReactNative/ios directory:

    cd ~/MyProjects/WeVoteReactNative/ios

Then run `pod install`

    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ pod install
    Analyzing dependencies
    Fetching podspec for `React` from `../node_modules/react-native`
    Fetching podspec for `Yoga` from `../node_modules/react-native/ReactCommon/yoga`
    Fetching podspec for `react-native-fbsdk` from `../node_modules/react-native-fbsdk/ios`
    Fetching podspec for `react-native-fbsdkcore` from `../node_modules/react-native-fbsdkcore`
    Fetching podspec for `react-native-fbsdklogin` from `../node_modules/react-native-fbsdklogin`
    Fetching podspec for `react-native-fbsdkshare` from `../node_modules/react-native-fbsdkshare`
    Downloading dependencies
    Installing Bolts (1.8.4)
    Using DCTAuth (3.0)
    Installing FBSDKCoreKit (4.27.1)
    Installing FBSDKLoginKit (4.27.1)
    Installing FBSDKShareKit (4.27.1)
    Installing React (0.47.2)
    Installing Yoga (0.47.2.React)
    Installing react-native-fbsdk (0.6.3)
    Installing react-native-fbsdkcore (0.0.8)
    Installing react-native-fbsdklogin (0.0.8)
    Installing react-native-fbsdkshare (0.0.8)
    Generating Pods project
    Integrating client project
    Sending stats
    Pod installation complete! There are 11 dependencies from the Podfile and 11 total pods installed.
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ 

If you get an error like `no implicit conversion of nil into String` then you may need to 
upgrade Ruby like this (we need version 2.3 or greater). 
(For more information, see: http://codingpad.maryspad.com/2017/04/29/update-mac-os-x-to-the-current-version-of-ruby/):

    (WebAppEnv)dalemcgrew:ios dalemcgrew$ ruby -v
    ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-darwin13.0]
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ curl -L https://get.rvm.io | bash -s stable
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm reload
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm install ruby-2.4.2
    
    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm use ruby-2.4.2
    Using /Users/dalemcgrew/.rvm/gems/ruby-2.4.2

    (WebAppEnv)dalemcgrew:ios dalemcgrew$ rvm --default use 2.4.2
    Using /Users/dalemcgrew/.rvm/gems/ruby-2.4.2


**Clean Build:**

You probably will run into the need to "Clean Build Folder".  To do this in XCode, go to the Product menu, hold down the Option button 
(on your Mac) and select "Clean Build Folder", after it completes (about 10 seconds), press the triangular
Run (Play) button do to a full rebuild


---

Next: [Running WeVoteReactNative for the First Time](RUNNING_FIRST_TIME.md)

[Go back to Readme Home](../../README.md)
