# Working with WeVoteReactNative Day-to-Day

If you are returning to work on WeVoteReactNative and other developers have made changes, follow these steps.

Grab the latest code from https://github.com/wevote/WeVoteReactNative (more instructions below).

Activate the virtual environment:

    $ cd /Users/<YOUR NAME HERE>/NodeEnvironments/WebAppEnv/
    $ . bin/activate

Navigate to the directory and run from the command line:

    (WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative
    (WebAppEnv) $ react-native run-ios

Or, better yet, run [WeVoteReactNative from XCode](../installing/RUNNING_FIRST_TIME.md).

## Watch your memory
If you see your JavaScript reload times go from a couple of seconds, to much much longer, you are 
probably swapping (relying on virtual memory on the disk).

* Chrome tabs, especially debugging tabs, can take 1 to 6G of RAM
* Android Studio  1 to 5g
* Xcode starts at 250M, but after a long debugging session it once was at 50G! (Thanks Apple!)
* node 720M to 2G and up
* Slack 600M
* PyChar 500M to 2G
* pgAdmin4 400M and up
* iOS Simulator 150M
* postgres 60M

Macs with 8G are usable, 16G is very nice.

# How to Update to Latest Changes from “master” Branch

Lets assume you are working on a branch called "dale_work_feb28". Then:

`(WebAppEnv) $ cd /Users/<YOUR NAME HERE>/MyProjects/WeVoteReactNative` 

`(WebAppEnv) $ git fetch` # Sync your changes with what's upstream

`(WebAppEnv) $ git branch -a`  # See what branch you are currently set to (look for "*" on left of listing)

`(WebAppEnv) $ git checkout master`  # If you aren’t set to the master branch, switch to that

`(WebAppEnv) $ git pull upstream master`  # Tell your personal fork on your local machine to get the latest from wevote/WeVoteReactNative

`(WebAppEnv) $ git push origin master`  # Push this latest version of master up to your Personal Fork on the github servers

`(WebAppEnv) $ git checkout -b <your-feature-branch>`  # Create a new branch to work on

Or if you have code you are already working on:

`(WebAppEnv) $ git checkout <your-feature-branch>`  # Switch to your existing branch

Now you need to merge locally the latest code from "master" with your branch name. Dale does this merging with 
the PyCharm IDE. How you do this depends on the development environment you use. 


---

Next: [Debugging Tools and Tips](DEBUGGING_TOOLS.md)

[Go back to Readme Home](../../README.md)
