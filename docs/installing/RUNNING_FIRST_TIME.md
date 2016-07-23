# Running WeVoteReactNative for the First Time

Please make sure you have read:

* [Preparing the Environment on Your Machine](ENVIRONMENT.md)

* [Bringing Code to Your Machine](CLONING_CODE.md)


## Install and start emulator


    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    (WebAppEnv) $ npm -g install gulp-cli      // try sudo if it does not work
    (WebAppEnv) $ npm install
    (WebAppEnv) $ gulp
    (WebAppEnv) $ npm rebuild node-sass

You should be able to visit WebApp here.

## Using We Vote API server Locally: OPTIONAL

The default configuration connections to our live API server at: https://api.wevoteusa.org, so this step is optional.

IFF you would like to install the We Vote API server locally, start by reading the instructions 
[install WeVoteServer](https://github.com/wevote/WeVoteServer/blob/master/README_API_INSTALL.md)


---

Next: [Working with WeVoteReactNative Day-to-Day](../working/README_WORKING_WITH_WEB_APP.md)

[Go back to Readme Home](../../README.md)
