import React from "react";
import { AppRegistry } from 'react-native';
import { NativeRouter, Route } from "react-router-native";
import App from "./App.js"
import Application from "./Application";
import CookieStore from "../../stores/CookieStore";


const DEBUG = false;

//  TODO: DELETE THIS FILE (soon)
/* ******************************************************************************
Steve September 20, 2017
This component is to be deleted,
We are no longer using "react-router-native" in this way
 */


/****************************** ROUTE-COMPONENTS ******************************/
//import About from "./routes/More/About";
//import Activity from "./routes/Activity";
import Ballot from "../Ballot/Ballot";
import BallotIndex from "../Ballot/BallotIndex";
//import Bookmarks from "./components/Bookmarks/Bookmarks";
//import Candidate from "./routes/Ballot/Candidate";
//import ClaimYourPage from "./routes/Settings/ClaimYourPage";
//import Connect from "./routes/Connect";
//import Credits from "./routes/More/Credits";
//import Donate from "./routes/More/Donate";
//import DonateThankYou from "./routes/More/DonateThankYou";
//import EmailBallot from "./routes/More/EmailBallot";
//import EmptyBallot from "./routes/Ballot/EmptyBallot";
//import FacebookSignInProcess from "./routes/Process/FacebookSignInProcess";
//import FAQ from "./routes/More/FAQ";
//import FacebookInvitableFriends from "./routes/FacebookInvitableFriends";
//import Friends from "./routes/Friends";
//import GetStarted from "./routes/Intro/GetStarted";
//import OrganizationVoterGuide from "./routes/Guide/OrganizationVoterGuide";
//import HowToUse from "./routes/More/HowToUse";
//import Intro from "./routes/Intro/Intro";
//import IntroContests from "./routes/Intro/IntroContests";
//import IntroOpinions from "./routes/Intro/IntroOpinions";
//import IntroStory from "./routes/Intro/IntroStory";
//import IssuesToFollow from "./routes/IssuesToFollow";
//import IssuesFollowed from "./routes/IssuesFollowed";
//import InviteByEmail from "./routes/Friends/InviteByEmail";
import Location from "../Settings/Location";
//import Measure from "./routes/Ballot/Measure";
//import Network from "./routes/Network";
//import NotFound from "./routes/NotFound";
//import Office from "./routes/Ballot/Office";
//import Opinions from "./routes/Opinions";
//import OpinionsFollowed from "./routes/OpinionsFollowed";
//import OpinionsIgnored from "./routes/OpinionsIgnored";
//import Organization from "./routes/More/Organization";
//import Privacy from "./routes/More/Privacy";
//import ProcessingDonation from "./routes/More/ProcessingDonation";
//import SampleBallot from "./routes/Intro/SampleBallot";
//import Settings from "./routes/Settings/Settings";
//import SettingsDashboard from "./routes/Settings/SettingsDashboard";
//import SignIn from "./routes/More/SignIn";
//import FacebookLandingProcess from "./routes/Process/FacebookLandingProcess";
//import FacebookRedirectToWeVote from "./routes/More/FacebookRedirectToWeVote";
//import SignInEmailProcess from "./routes/Process/SignInEmailProcess";
//import Team from "./routes/More/Team";
//import TermsOfService from "./routes/More/TermsOfService";
//import TwitterSignInProcess from "./routes/Process/TwitterSignInProcess";
//import TwitterSignInProcessOld from "./routes/Process/TwitterSignInProcessOld";
//import VerifyEmailProcess from "./routes/Process/VerifyEmailProcess";
//import FriendInvitationByEmailVerifyProcess from "./routes/Process/FriendInvitationByEmailVerifyProcess";
//import VoterGuideFollowing from "./components/VoterGuide/VoterGuideFollowing";
//import VerifyThisIsMe from "./routes/Guide/VerifyThisIsMe";
//import Vision from "./routes/More/Vision";
//import Welcome from "./routes/Welcome";
//import YourPage from "./routes/YourPage";

// See /js/components/Navigation/HeaderBar.jsx for voter_orientation_complete cookie
const firstVisit = !CookieStore.getItem("voter_device_id");

/*
const routes = (
  <Router history={nativeHistory}>
    <Route exact path="/" component={Application}>
      <Route path="/settings/location" component={Location} />  /* Complete path on one line for searching */
 /*     <Route path="/ballot" component={BallotIndex}>
        <IndexRoute component={Ballot}/>
      </Route>
    </Route>
  </Router>
  );

export default routes;
AppRegistry.registerComponent('App', () => () => routes);
*/