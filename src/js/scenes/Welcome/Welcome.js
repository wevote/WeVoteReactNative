import React, { Component } from "react";
import { Image, ImageBackground, Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions } from 'react-native-router-flux';

import AnalyticsActions from "../../actions/AnalyticsActions";
import FacebookStore from "../../stores/FacebookStore";
import FacebookActions from "../../actions/FacebookActions";
import VoterActions from "../../actions/VoterActions";
import VoterConstants from "../../constants/VoterConstants";
import VoterStore from "../../stores/VoterStore";
// import { validateEmail } from "../utils/email-functions";
//import CookieStore from "../../stores/CookieStore";



import styles from "../../stylesheets/components/baseStyles"
import welcomeStyles from "../../stylesheets/components/welcomeStyles"
import RouteConst from "../RouteConst";
const logging = require("../../utils/logging");

// the export line from the WebApp Welcome.jsx:  "export default class Intro extends Component { "

export default class Welcome extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newsletter_opt_in_true: false,
      voter: {},
      is_verification_email_sent: false,
      show_features_ballot: false,
      show_features_organizations: false,
      show_features_positions: false,
      show_features_network: false,
      show_features_vision: false,
      show_features_vote: false,
      facebook_friends_image_width: 60,
      facebook_friends_image_height: 60,
      maximum_friends_display: 5,
      facebook_friends_using_we_vote_list: FacebookStore.facebookFriendsUsingWeVoteList(),
      submit_enabled: false,
      voter_email_address: "",
      voter_full_name: "",
    };
    this._toggleBallotFeature = this._toggleBallotFeature.bind(this);
    this._toggleOrganizationsFeature = this._toggleOrganizationsFeature.bind(this);
    this._togglePositionsFeature = this._togglePositionsFeature.bind(this);
    this._toggleNetworkFeature = this._toggleNetworkFeature.bind(this);
    this._toggleVisionFeature = this._toggleVisionFeature.bind(this);
    this._toggleVoteFeature = this._toggleVoteFeature.bind(this);
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to Welcome: currentScene = " + Actions.currentScene);
    Actions.refresh({dummy: 'hello'});  // triggers componentWillReceiveProps
  };

  static onExit = () => {
    Actions.refresh({came_from: RouteConst.KEY_WELCOME, forward_to_ballot: false})
    logging.rnrfLog("onExit from Welcome: currentScene = " + Actions.currentScene);
  };

  componentWillReceiveProps(nextProps) {
    logging.rnrfLog("Welcome: componentWillReceiveProps ");
  }

  // Doesn't work in react-native? // componentDidMount () {
  componentWillMount () {
    console.log("Welcome ++++ MOUNT currentScene = " + Actions.currentScene);

    this._onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    AnalyticsActions.saveActionWelcomeVisit(VoterStore.election_id());
    FacebookActions.facebookFriendsAction();
    this._onFacebookStoreChange();
    this.facebookStoreListener = FacebookStore.addListener(this._onFacebookStoreChange.bind(this));
    // let we_vote_branding_off_from_url = this.props.location.query ? this.props.location.query.we_vote_branding_off : 0;
    // let we_vote_branding_off_from_cookie = CookieStore.getItem("we_vote_branding_off");
    // this.setState({
    //   we_vote_branding_off: we_vote_branding_off_from_url || we_vote_branding_off_from_cookie,
    // });
  }

  componentWillUnmount () {
    console.log("Welcome ---- UN mount");
    this.voterStoreListener.remove();
    this.facebookStoreListener.remove();
  }

  _toggleBallotFeature () {
    this.setState({ show_features_ballot: !this.state.show_features_ballot });
  }

  _toggleOrganizationsFeature () {
    this.setState({ show_features_organizations: !this.state.show_features_organizations });
  }

  _togglePositionsFeature () {
    this.setState({ show_features_positions: !this.state.show_features_positions });
  }

  _toggleNetworkFeature () {
    this.setState({ show_features_network: !this.state.show_features_network });
  }

  _toggleVisionFeature () {
    this.setState({ show_features_vision: !this.state.show_features_vision });
  }

  _toggleVoteFeature () {
    this.setState({ show_features_vote: !this.state.show_features_vote });
  }

  _onVoterStoreChange () {
    // console.log("is_verification_email_sent:  " + VoterStore.isVerificationEmailSent());
    this.setState({
      newsletter_opt_in_true: VoterStore.getNotificationSettingsFlagState(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN),
      // is_verification_email_sent: VoterStore.isVerificationEmailSent(),
      voter: VoterStore.getVoter(),
    });
  }

  _onFacebookStoreChange () {
    this.setState({
      facebook_friends_using_we_vote_list: FacebookStore.facebookFriendsUsingWeVoteList(),
    });
  }

  goToGetStarted () {
    var getStartedNow = "/ballot";
    browserHistory.push(getStartedNow);
  }

  updateVoterFullName (event) {
    this.setState({
      voter_full_name: event.target.value
    });
  }

  updateVoterEmailAddress (event) {
    // let is_email_valid = validateEmail(event.target.value);
    // let submit_enabled = false;
    // if (is_email_valid) {
    //   submit_enabled = true;
    // }
    // this.setState({
    //   voter_email_address: event.target.value,
    //   submit_enabled: submit_enabled,
    // });
  }

  voterEmailAddressSignUpSave (event) {
    // Only proceed after we have a valid email address, which will enable the submit
    if (this.state.submit_enabled) {
      event.preventDefault();
      let send_link_to_sign_in = true;
      VoterActions.voterEmailAddressSave(this.state.voter_email_address, send_link_to_sign_in);
      VoterActions.voterFullNameSoftSave("", "", this.state.voter_full_name);
      VoterActions.voterUpdateNotificationSettingsFlags(VoterConstants.NOTIFICATION_NEWSLETTER_OPT_IN);
      this.setState({loading: true});
    }
  }

  shareToFacebookButton () {
    window.FB.ui({
      display: "popup",
      redirect_uri: web_app_config.WE_VOTE_HOSTNAME + "/welcome",
      method: "share",
      mobile_iframe: true,
      href: web_app_config.WE_VOTE_HOSTNAME,
      quote: "Check out https://WeVote.US! View your ballot. Learn from friends. Share your vision. @WeVote #Voting #WeVote",
    }, function (response) {
      if ( response === undefined || response.error_code === 4201 ) {
        console.log("Voter Canceled the share request");
      } else if ( response ) {
        //console.log("Successfully Shared", response);
      }
    });
  }

  shareToTwitterButton () {
    let url = "https://twitter.com/share?url=https%3A%2F%2FWeVote.US%2F%20&text=Check%20out%20https%3A%2F%2FWeVote.US%2F!%20View%20your%20ballot.%20Learn%20from%20friends.%20Share%20your%20vision.%20@WeVote&hashtags=Voting,WeVote";
    let title = "Share On Twitter";
    let default_width = 600;
    let default_height = 600;
    let half_screen_width = screen.width / 2;
    let half_default_width = default_width / 2;
    let half_screen_height = screen.height / 2;
    let half_default_height = default_height / 2;
    var left = half_screen_width - half_default_width;
    var top = half_screen_height - half_default_height;
    return window.open(url, title, "toolbar=no, width=" + default_width + ", height=" + default_height + ", top=" + top + " left=" + left);
  }


  render () {
    let actual_full_name = "";
    let voter_signed_in = false;
    let mailto_url = "mailto:" + "?subject=Check out We Vote" + "&body=I am using We Vote to discuss what is on my ballot. You can see it at https://WeVote.US too.";
    if (this.state.voter) {
      voter_signed_in = this.state.voter.is_signed_in;
      if (this.state.voter.first_name || this.state.voter.last_name) {
        actual_full_name = this.state.voter.full_name;
        if (actual_full_name.startsWith("voter")) {
          actual_full_name = "";
        }
      }
    }

    let local_counter = 0;
    // const facebook_friends_using_we_vote_list_for_display = this.state.facebook_friends_using_we_vote_list.map( (friend) => {
    //   local_counter++;
    //   if (friend.facebook_profile_image_url_https && local_counter <= this.state.maximum_friends_display) {
    //     const friendName = friend.facebook_user_name ? <Tooltip id="tooltip">{friend.facebook_user_name}</Tooltip> : <span />;
    //     return <OverlayTrigger key={friend.facebook_user_id} placement="bottom" overlay={friendName} >
    //       <img className="friends-list__welcome-image"
    //            src={friend.facebook_profile_image_url_https}
    //            height={this.state.facebook_friends_image_height}
    //            width={this.state.facebook_friends_image_width} />
    //     </OverlayTrigger>;
    //   } else {
    //     return null;
    //   }
    // });

    let Svg = React.createFactory(require('react-native').Svg);

    return <ScrollView>
        <ImageBackground source={require('../../../img/welcome/header-image-desktop.png')} style={{
          flex: 1,
          width: null,
          height: null,
        }} >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={[welcomeStyles.textH1, {paddingTop: 30}]}>View your ballot.</Text>
            <Text style={[welcomeStyles.textH1,{paddingTop: 10, paddingBottom: 25}]}>Learn from friends.</Text>

                      {/*{ this.state.facebook_friends_using_we_vote_list.length > 0 ?*/}
                        {/*<div className="u-flex-row friends-list__welcome">*/}
                          {/*{ facebook_friends_using_we_vote_list_for_display }*/}
                        {/*</div> :*/}
                        {/*null*/}
                      {/*}*/}

            <TouchableOpacity onPress = {() => Actions.ballot()} style={welcomeStyles.getStartedButton}>
              <Text style={welcomeStyles.bigButtonText}>Get Started</Text>
            </TouchableOpacity>

            <Text style={[welcomeStyles.textH1,{paddingTop: 40, paddingBottom: 40}]}>Share your vision.</Text>
            {/*onClick={() => browserHistory.push("/voterguidegetstarted") */}
            <TouchableOpacity onPress = {() => Actions.ballot()} style={[welcomeStyles.getStartedButton, welcomeStyles.callToActionBlue]}>
              <Text style={welcomeStyles.bigButtonText}>Create Voter Guide</Text>
            </TouchableOpacity>

            <Text style={{paddingBottom: 60}}/>
          </View>
        </ImageBackground>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1c2f4b',
        }}>
          <Text style={[welcomeStyles.textH1,{paddingTop: 40}]}>Your Mission:</Text>
          <Text style={welcomeStyles.textH3White}>Make the world a better place.</Text>

          <Image source={require('../../../img/welcome/benefits/viewYourBallot.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>View Your Ballot</Text>

          <Image source={require('../../../img/welcome/benefits/learnFromOrgs.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Learn From Organizations</Text>

          <Image source={require('../../../img/welcome/benefits/seePosition.png')} style={{width: 150, height: 50}}/>
          <Text style={welcomeStyles.textH3White}>See Your Network's Positions</Text>

          <Image source={require('../../../img/welcome/benefits/chooseFriends.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Invite Friends to Your We Vote Network</Text>

          <Image source={require('../../../img/welcome/benefits/shareVision.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Share Your Vision</Text>

          <Image source={require('../../../img/welcome/benefits/decideAndVote.png')} style={{width: 150, height: 150}}/>
          <Text style={welcomeStyles.textH3White}>Decide & Vote</Text>
          <Text style={{paddingTop: 40, paddingBottom: 40}} />
          <TouchableOpacity onPress = {() => Actions.ballot()}
                            style={[welcomeStyles.getStartedButton, welcomeStyles.dangerRed]}>
              <Text style={welcomeStyles.bigButtonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={{paddingTop: 40, paddingBottom: 40}} />
        </View>
    </ScrollView>;


      {/*/!* Sign up for email list *!/*/}
      {/*{ voter_signed_in ?*/}
        {/*null :*/}
        {/*<section className="form-section">*/}
          {/*<div className="container">*/}
            {/*<Row>*/}
              {/*<div className="col-md-12">*/}
                {/*{ this.state.we_vote_branding_off ? null :*/}
                  {/*<span>*/}
                    {/*{ this.state.newsletter_opt_in_true ?*/}
                      {/*<h1 className="u-f1 u-bold u-stack--lg">Please check your email for a verification link.</h1> :*/}
                      {/*<div className="form-container">*/}
                        {/*<h2 className="form-header">Sign up to get updates about We Vote.</h2>*/}

                        {/*<form className="row form-inline" onSubmit={this.voterEmailAddressSignUpSave.bind(this)}>*/}
                          {/*<FormGroup className="col-md-4">*/}
                            {/*<label className="sr-only" htmlFor="name">Name</label>*/}
                            {/*<input className="form-control"*/}
                                   {/*type="text"*/}
                                   {/*name="voter_full_name"*/}
                                   {/*id=""*/}
                                   {/*value={this.state.voter_full_name}*/}
                                   {/*onChange={this.updateVoterFullName.bind(this)}*/}
                                   {/*placeholder="Name"/>*/}
                          {/*</FormGroup>*/}
                          {/*<FormGroup className="col-md-4">*/}
                            {/*<label className="sr-only" htmlFor="exampleEmail">Email</label>*/}
                            {/*<input className="form-control"*/}
                                   {/*type="email"*/}
                                   {/*name="voter_email_address"*/}
                                   {/*id=""*/}
                                   {/*value={this.state.voter_email_address}*/}
                                   {/*onChange={this.updateVoterEmailAddress.bind(this)}*/}
                                   {/*placeholder="Email Address"/>*/}
                          {/*</FormGroup>*/}
                          {/*<FormGroup className="col-md-4">*/}
                            {/*{this.state.submit_enabled ?*/}
                              {/*<Button className="form-control"*/}
                                      {/*bsStyle="success"*/}
                                      {/*type="submit"*/}
                                      {/*onClick={this.voterEmailAddressSignUpSave.bind(this)}*/}
                              {/*>Sign Up</Button> :*/}
                              {/*<Button className="form-control form-button-disabled"*/}
                                      {/*bsStyle="success"*/}
                                      {/*type="submit"*/}
                                      {/*disabled*/}
                                      {/*onClick={this.voterEmailAddressSignUpSave.bind(this)}*/}
                              {/*>Enter Your Email to Sign Up</Button>*/}
                            {/*}*/}
                          {/*</FormGroup>*/}
                        {/*</form>*/}
                      {/*</div>*/}
                    {/*}*/}
                  {/*</span>*/}
                {/*}*/}
              {/*</div>*/}
            {/*</Row>*/}
          {/*</div>*/}
        {/*</section>*/}
      {/*}*/}

      {/* We Vote Partners */}
      {/*{ this.state.we_vote_branding_off ? null :*/}
        {/*<section className="network-section">*/}
          {/*<div className="container">*/}
            {/*<h2 className="u-f2 u-stack--lg">Our Network</h2>*/}
            {/*<div className="partner-logos">*/}
              {/*<img className="partner-logo u-push--lg u-stack--lg" src="/img/welcome/partners/google-logo.svg" alt="Google" width="150" />*/}
              {/*<img className="partner-logo u-push--lg u-stack--lg" src="/img/welcome/partners/center-for-technology.png" alt="Center for Technology and Civic Life" width="200" />*/}
              {/*<img className="partner-logo u-push--lg u-stack--lg" src="/img/welcome/partners/vote-org.png" alt="Vote.org" width="169" />*/}
              {/*<img className="partner-logo u-push--lg u-stack--lg" src="/img/welcome/partners/voting-information-project.png" alt="Voting Information Project" width="193" />*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</section>*/}
      {/*}*/}

      {/* Dark blue section with share buttons and footer links */}
      {/*<section className="footer-section">*/}
        {/*<div className="container">*/}
          {/*{ this.state.we_vote_branding_off ? null :*/}
            {/*<span>*/}
              {/*<h3 className="u-f3 u-stack--lg">Please share or donate to help us reach more voters.</h3>*/}
              {/*<div className="u-stack--xl">*/}
                {/*<Button className="btn btn-social btn-facebook u-push--sm"*/}
                        {/*bsStyle="danger"*/}
                        {/*type="submit"*/}
                        {/*onClick={this.shareToFacebookButton}>*/}
                  {/*<span className="fa fa-facebook" /> Facebook*/}
                {/*</Button>*/}
                {/*<Button className="btn btn-social btn-twitter u-push--sm"*/}
                        {/*bsStyle="danger"*/}
                        {/*onClick={this.shareToTwitterButton}>*/}
                  {/*<span className="fa fa-twitter" /> Twitter*/}
                {/*</Button>*/}
                {/*<a href={mailto_url} title="Submit this to Email">*/}
                  {/*<button className="btn btn-social btn--email u-push--sm">*/}
                    {/*<span className="fa fa-envelope" />Email*/}
                  {/*</button>*/}
                {/*</a>*/}
                {/*<Link to="/more/donate">*/}
                  {/*<button className="btn btn-social btn-danger u-push--sm">*/}
                    {/*<span className="fa fa-heart" /> Donate*/}
                  {/*</button>*/}
                {/*</Link>*/}
              {/*</div>*/}


              {/*<ul className="footer-nav u-f4 list-unstyled list-inline u-stack--xl">*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/more/about"}>About</Link>*/}
                {/*</li>*/}
                  {/*<li className="u-push--md u-stack--sm">*/}
                    {/*<Link to={"/more/vision"}>Our Vision</Link>*/}
                  {/*</li>*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/more/team"}>Our Team</Link>*/}
                {/*</li>*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/intro/sample_ballot"}>Get Started</Link>*/}
                {/*</li>*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/more/sign_in"}>Sign In</Link>*/}
                {/*</li>*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/more/tools"}>Tools For Your Website</Link>*/}
                {/*</li>*/}
                {/*<li className="u-push--md u-stack--sm">*/}
                  {/*<Link to={"/more/elections"}>Supported Elections</Link>*/}
                {/*</li>*/}
              {/*</ul>*/}
            {/*</span>*/}
          {/*}*/}

          {/*<div className="u-f--small u-stack--lg">*/}
            {/*<p>*/}
              {/*WeVote.US is brought to you by a partnership between two registered nonprofit organizations,*/}
              {/*one <span className="u-no-break">501(c)(3)</span> and one <span className="u-no-break">501(c)(4)</span>.*/}
              {/*<br />*/}
              {/*We do not support or oppose any political candidate or party.*/}
            {/*</p>*/}
            {/*<p>*/}
              {/*<a href="https://github.com/WeVote" target="_blank">The software that powers We Vote is open source and built by volunteers.</a>*/}
            {/*</p>*/}
          {/*</div>*/}

          {/*<ul className="u-tc list-unstyled list-inline">*/}
            {/*<li className="u-push--lg">*/}
              {/*<Link to="/more/privacy">Privacy Policy</Link>*/}
            {/*</li>*/}
            {/*<li className="u-push--lg">*/}
              {/*<Link to="/more/terms">Terms of Use</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
              {/*<a href="https://help.wevote.us/hc/en-us/requests/new" target="_blank">Contact</a>*/}
            {/*</li>*/}
          {/*</ul>*/}

        {/*</div>*/}
      {/*</section>*/}

  } // render
} // class

