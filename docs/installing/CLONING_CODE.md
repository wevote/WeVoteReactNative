# Bringing Code to Your Machine
[Go back to Readme Home](../../README.md)

## Set up your environment

Make sure you have gone through [Step 1: Preparing the Environment on Your Machine](docs/installing/ENVIRONMENT.md) 
and created a place to put all of the code from Github:

    $ mkdir /Users/<YOUR NAME HERE>/MyProjects/

## Setting up your repository for work

1. Install and configure git on your local machine.

2. Create a fork of wevote/WeVoteReactNative.git. You can do this from https://github.com/wevote/WeVoteReactNative 
with the "Fork" button (upper right of screen). This will create a copy (a "fork") of https://github.com/wevote/WeVoteReactNative 
but attached to your Github account. Your fork of WeVoteReactNative will appear here: 
https://github.com/\<YOUR GITHUB NAME\>/WeVoteReactNative

3. Change into the `/Users/<YOUR NAME HERE>/MyProjects/` folder on your local machine and clone your fork  


    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects
    (WebAppEnv) $ git clone https://github.com/<YOUR USERNAME HERE>/WeVoteReactNative.git

4. cd into your local WeVoteReactNative repository folder, and set up a remote for upstream.


    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    (WebAppEnv) $ git remote add upstream git@github.com:wevote/WeVoteReactNative.git

### Needed if you have NOT installed WebApp previously

5. Create ssh keys: `ssh-keygen -t rsa -C "youremail@somedomain.com"`  

6.`ssh-add ~/.ssh/id_rsa` OR `ssh-add ~/.ssh/github_rsa`

7.`pbcopy < ~/.ssh/id_rsa.pub` OR `pbcopy < ~/.ssh/github_rsa.pub`

8.Go paste your keys into http://github.com, under SSH Keys for your account.  


## Other notes:

This project has an active Wiki page with some uptodate notes.  Take a look at [ReactNativeWiki](https://github.com/wevote/WeVoteReactNative/wiki)

This list of preferred libraries might be dated (as of September 27, 2017): 

    > 1) react router we can use [react-router-native](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-native)
    > 2) react bootstrap we can use [react-native-elements](https://github.com/react-native-training/react-native-elements) and [ReactNativeKatas](https://github.com/jondot/ReactNativeKatas)
    > 3) react-addons-css-transition-group
    > 4) react-svg-icons look into [react-native-svg](https://github.com/react-native-community/react-native-svg)
    > 5) react-player
    > 6) react-text-truncate
    > 7) react-bootstrap-toggle
    > 8) react-copy-to-clipboard

Rewrite the code using the new libraries.

After all the browser oriented libraries have been replaced with those for react-native, we will have a functional native 
WeVote ballot App (See `scenes/Ballot/Ballot.js`)

There are a few `.jsx` files in this repo. They cannot be used with react-native, I haven't removed them as they may 
have dependencies. If so, when running `react-native run-ios` missing dependencies will be flagged, to fix this we just 
need to rename the extension to `.js` and rewrite the unused libraries (if any).

There are some components we can use within the react-native library, see [this link](https://facebook.github.io/react-native/docs/components-and-apis.html). (`Modal`, `Slider` we were using from `react-bootstrap` and `react-slick` respectively are in `react-native`), we may have to refactor how it's written but it should save a lot of work. Infact, a lot of the 3rd party libraries are included in the docs as well (eg. navigation).

Other errors such as `Expected a component class, got [object, object]` are raised because in react-native can't use HTML 
tags like `<div>`.  In the case of each `<div>` from the WebApp code, we will instead we'll be using react-native's `<View>` component.

I've commented out most of the libraries which cannot be used within the files.

Please ping @RohanVB on slack if there's any need for clarification.



---

Next: [Running WeVoteReactNative for the First Time](RUNNING_FIRST_TIME.md)

[Go back to Readme Home](../../README.md)

