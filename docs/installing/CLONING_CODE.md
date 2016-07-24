# Bringing Code to Your Machine

## Setting up your repository for work

1. Install and configure git on your local machine.

2. Create a fork of wevote/WeVoteReactNative.git  

3. Change into the `/Users/<YOUR NAME HERE>/MyProjects/` folder and clone your fork  

`git clone https://github.com/<YOUR USERNAME HERE>/WeVoteReactNative.git`  

4. cd into your local WeVoteReactNative repository folder, and set up a remote for upstream:  
`$ git remote add upstream git@github.com:wevote/WeVoteReactNative.git`  

### Needed if you have NOT installed WebApp previously

5. Create ssh keys: `ssh-keygen -t rsa -C "youremail@somedomain.com"`  

6.`ssh-add ~/.ssh/id_rsa` OR `ssh-add ~/.ssh/github_rsa`

7.`pbcopy < ~/.ssh/id_rsa.pub` OR `pbcopy < ~/.ssh/github_rsa.pub`

8.Go paste your keys into http://github.com, under SSH Keys for your account.  

9.Set up a git client where origin is a fork of the repository (e.g.
  pertrai1/WebApp), and upstream is the real deal (e.g. wevote/WebApp) 

## Install React Native

Facebook has [excellent installation instructions (go there)](https://facebook.github.io/react-native/docs/getting-started.html).
This is the summary of commands to run:

    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    (WebAppEnv) $ npm -g install gulp-cli      // try sudo if it does not work



---

Next: [Running WeVoteReactNative for the First Time](RUNNING_FIRST_TIME.md)

[Go back to Readme Home](../../README.md)

