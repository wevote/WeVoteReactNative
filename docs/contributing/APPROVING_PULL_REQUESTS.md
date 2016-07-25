# We Vote Process for Approving Pull Requests
[Go back to Readme Home](../../README.md)

We have a team of engineers who can approve pull requests for WeVoteReactNative (Dale McGrew & Jayadev Akkiraju). 
A few notes about our process:

* Give thumbs up before approving to confirm that you followed this verification process.
* Provide general comments and line comments wherever relevant.
* Try to avoid stopping pull requests if the problems identified are minor, and can be improved through an iteration.
* If the changes are significant and may include breaking changes, the person approving the pull-request 
should pull the pull request to their local machine and verify that functionality isn’t broken.

# Bringing a Pull Request to your Local Machine for Verification
Add the contributor's repository as a remote repo. Here are the core contributors:

    git remote add dalemcgrew https://github.com/dalemcgrew/WeVoteReactNative
    git fetch dalemcgrew
    git remote add Jayadev6191 https://github.com/Jayadev6191/WeVoteReactNative
    git fetch Jayadev6191
    Find the branch that the person is submitting:
    git branch -a
    

If you are wanting to test a PR on your local machine, make sure you have already done a `fetch` on the 
users repo. If you want to see if you have done so, you can do so by `git branch dalemcgrew -a`. This will 
show you all of the branches for that user (from the example above for dalemcgrew). Now you can find the 
branch that is being worked on from the user and create a local branch based on that remote branch. Now 
you can do a `git pull <remote name> <remote branch name>` and it will put you into a local version of that 
users branch. Running `gulp` at this point will have you seeing what has been done for this PR and allow 
you to look at the code.

---

For basic tips about using Pull Requests, see [Creating a Pull Request](CREATING_PULL_REQUEST.md)

See also [Pull Request Advanced Tips & Tricks](PULL_REQUEST_ADVANCED.md)

See also [Troubleshooting Pull Request Problems](PULL_REQUEST_TROUBLESHOOTING.md)

[Go back to Readme Home](../../README.md)
