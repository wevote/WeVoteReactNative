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
https://github.com/<YOUR USERNAME HERE>/WeVoteReactNative

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


---

Next: [Running WeVoteReactNative for the First Time](RUNNING_FIRST_TIME.md)

[Go back to Readme Home](../../README.md)

