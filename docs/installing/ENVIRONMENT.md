# Preparing the Environment on Your Machine

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

## Set up your environment

Create a place to put all of the code from Github:

    $ mkdir /Users/<YOUR NAME HERE>/MyProjects/


---

Next: [Bringing Code to Your Machine](CLONING_CODE.md)

[Go back to Readme Home](../../README.md)

