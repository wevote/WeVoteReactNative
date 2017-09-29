# Running the app:

From within the root directory after cloning,


Run:

```
npm install
```

This will add all required dependencies from package.json

Alternatively, if you use yarn, run:

```
yarn install
```

To run on iOS:

```
react-native run-ios
```

To run on android:

```
react-native run-android
```

# Current Thoughts About Our Native Project:

Please read and contribute to our [WeVoteReactNative Wiki!](https://github.com/wevote/WeVoteReactNative/wiki)

# We Vote React Native - README Home

This repository contains We Vote's iOS and Android versions built with ReactNative. It is being built based on
 specifications created and tested in the [We Vote WebApp](https://github.com/wevote/WebApp) Using data we have
 gathered in our [API Server](https://api.wevoteusa.org/apis/v1/docs/) from
 Google Civic API, Vote Smart, MapLight, TheUnitedStates.io and the Voting Information Project.
We give voters a social way to interact with ballot data.

Interested in volunteering? [Starting presentation here](https://prezi.com/5v4drd74pt6n/we-vote-introduction-strategic-landscape/). Please also [read about our values](https://wevote.hackpad.com/Community-Rules-C0sn7DhZhDt) and [see our Code of Conduct](CODE_OF_CONDUCT.md)

You can see our current wireframe mockup for a San Francisco ballot here:
http://start.wevoteusa.org/

And finally, the current live demo version of the mobile website version is here: https://wevote.me
(Our iPhone and Android versions are not available to the public yet.)

## Learn about React Native

Some articles to orient you:

<a href="https://www.infoq.com/articles/react-native-introduction" target="_blank">Writing Cross-Platform Apps with React Native</a>

Our commentary: If you know ReactJS, the transition to React Native is very logical -- BUT we are finding that all rendering
is new code, and we are not able to bring over too much from our wevote/WebApp repo. We believe that we will be able to use the same data Store and Action code.

The React Native documentation is a great place to start.

These are some videos which'll give you a brief overview of React Native.

<a href="https://www.youtube.com/watch?v=KVZ-P-ZI6W4" target="_blank">React.js Conf 2015 Keynote - Introducing React Native</a> (32 minutes)

<a href="https://www.youtube.com/watch?v=7rDsRXj9-cU" target="_blank">React.js Conf 2015 Keynote 2 - A Deep Dive into React Native</a> (30 minutes)


## Installing WeVoteReactNative

*NOTE: For developing on macOS the environment installation will likely need
10-15gb of drive space.  Android SDK and Android Studio installation and emulation will likely require approximately 40gb of drive space.*

1. [Preparing the Environment on Your Machine](docs/installing/ENVIRONMENT.md)

2. [Bringing Code to Your Machine](docs/installing/CLONING_CODE.md)

3. [Running WeVoteReactNative for the First Time](docs/installing/RUNNING_FIRST_TIME.md)

## Working with WeVoteReactNative
1. [Working with WeVoteReactNative Day-to-Day](docs/working/README_WORKING_WITH_REACT_NATIVE.md)

2. [Debugging Tools and Tips](docs/working/DEBUGGING_TOOLS.md)

3. [Issues and Reporting Bugs](docs/working/ISSUES.md)

## Contributing to the Project
Please read the following before you start contributing to the project. Thank you!

[Coding Standards and Best Practices](docs/contributing/CONTRIBUTING_STANDARDS.md)

## How to Submit Code / Pull Requests
1. [What the Heck is a Pull Request?](docs/contributing/PULL_REQUEST_BACKGROUND.md)

2. [Before Your First Pull Request](docs/contributing/PULL_REQUEST_SETUP.md)

3. [Creating a Pull Request](docs/contributing/CREATING_PULL_REQUEST.md)

4. [Pull Request Advanced Tips & Tricks](docs/contributing/PULL_REQUEST_ADVANCED.md)

5. [Troubleshooting Pull Request Problems](docs/contributing/PULL_REQUEST_TROUBLESHOOTING.md)

6. [Approving Pull Requests](docs/contributing/APPROVING_PULL_REQUESTS.md)
