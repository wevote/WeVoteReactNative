/**
 * We Vote's iOS and Android React Native App, sister to the mobile website "WebApp"
 * https://github.com/wevote/WeVoteReactNative
 * @WeVote
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Navigator
} from 'react-native';
import Position_list from './assets/stubs/position_list';
import Header from './components/Header';
import Loading from './components/Loading';

let CandidateCard = require('./components/candidateCard').default;
let ListCandidateCard = require('./components/listCard').default;
let OrganizationalCard = require('./components/organizationalCard').default;




class WeVoteReactNative extends Component {
  static propTypes = {
    params: PropTypes.object
  };

  constructor(props){
    super(props);

    this.organizationRetrieve=this.organizationRetrieve.bind(this);
    this.candidateRetrieve=this.candidateRetrieve.bind(this);
    this.state={
      "candidates_on_organization_scene": Position_list
      // "organizations_on_candidate_scene": Position_list
    };
  }

  componentWillMount () {
    this.organizationRetrieve("wv02org204");
    // this.candidateRetrieve("wv02cand2092");
  }

  async candidateRetrieve(we_vote_id) {
    try {
      // Clear out the previous organization (in We Vote we often alternate between candidate and organization)
      this.setState({organization: undefined});

      // Reach out to WeVoteServer and pull the candidate data
      let response = await fetch("https://api.wevoteusa.org/apis/v1/candidateRetrieve/" +
          "?voter_device_id=" + "2VQ4w0mpBIjaIR81yJXMpu9eIARa87QTLqlgM3aj9cBNADqlqMBSd4gFGefdOD0pz8X02srVljj6uopGprgeeq09" +
          "&candidate_we_vote_id=" + we_vote_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let responseJson = await response.json();
    
      // Put the contents of the organization JSON into the state so the app can react
      console.log("responseJson: ", responseJson);
      this.setState({candidate: responseJson});
  
    } catch(error) {
      console.error(error);
    }
  }

  async organizationRetrieve(we_vote_id) {
    try {
      // Clear out the previous candidate (in We Vote we often alternate between candidate and organization)
      this.setState({candidate: undefined});

      // Reach out to WeVoteServer and pull the organizational data
      let response = await fetch("https://api.wevoteusa.org/apis/v1/organizationRetrieve/" +
          "?voter_device_id=" + "2VQ4w0mpBIjaIR81yJXMpu9eIARa87QTLqlgM3aj9cBNADqlqMBSd4gFGefdOD0pz8X02srVljj6uopGprgeeq09" +
          "&organization_we_vote_id=" + we_vote_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let responseJson = await response.json();

      // Put the contents of the organization JSON into the state so the app can react
      console.log("responseJson: ", responseJson);
      this.setState({organization: responseJson});
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    // If neither organization nor candidate have data, show loading screen
    if (!this.state.organization && !this.state.candidate) {
      return <Loading>We Vote USA</Loading>;
    }

    var id,
        ballot_item_display_name,
        candidate_photo_url,
        twitter_description,
        update_candidate,
        organization_name,
        organization_photo_url,
        candidates_on_organization_scene,
        organizations_on_candidate_scene,
        update_organization;


    if(!this.state.organization){
        id = 'Candidate';
        ballot_item_display_name = this.state.candidate.ballot_item_display_name;
        candidate_photo_url = this.state.candidate.candidate_photo_url;
        twitter_description = this.state.candidate.twitter_description;
        organizations_on_candidate_scene = this.state.organizations_on_candidate_scene;
        update_candidate = this.updateCandidate;
        update_organization = this.updateOrganization;
    }

    if(!this.state.candidate){
        id = 'Organization';
        organization_name = this.state.organization.organization_name;
        organization_photo_url = this.state.organization.organization_photo_url;
        twitter_description = this.state.organization.twitter_description;
        candidates_on_organization_scene = this.state.candidates_on_organization_scene;
        update_candidate = this.updateCandidate;
        update_organization = this.updateOrganization;
    }


    return (
      <Navigator
        initialRoute = {{
          id: id,
          index:0,
          organization_name:                organization_name,
          organization_photo_url:           organization_photo_url,
          twitter_description:              twitter_description,
          candidates_on_organization_scene: candidates_on_organization_scene,
          organizations_on_candidate_scene: organizations_on_candidate_scene,
          update_organization:              update_organization,
          ballot_item_display_name:         ballot_item_display_name,
          candidate_photo_url:              candidate_photo_url,
          update_candidate:                 update_candidate
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }

  updateOrganization(we_vote_id){
    // this.organizationRetrieve(we_vote_id);
  }
  updateCandidate(we_vote_id){
    // this.candidateRetrieve(we_vote_id);
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    console.log("In navigatorRenderScene, route: ", route);
    var twitter_description = "";
    console.log(route.id);
    switch(route.id){
      case 'Candidate':
        var ballot_item_display_name = (route.ballot_item_display_name === undefined) ? "" : route.ballot_item_display_name;
        //var organization_photo_url = (route.organization_photo_url === undefined) ? "" : route.organization_photo_url;
        var candidate_photo_url = "https://static.votesmart.org/canphoto/26732_lg.jpg"
        twitter_description = (route.twitter_description === undefined) ? "" : route.twitter_description;

        return <ScrollView>
          <View style={styles.container}>
            <CandidateCard ballot_item_display_name={ ballot_item_display_name }
                                  candidate_photo_url={ candidate_photo_url }
                                  twitter_description={ twitter_description }
                                  update={route.update_organization}
            />
          </View>
        </ScrollView>;

      case 'Organization':
        var organization_name = (route.organization_name === undefined) ? "" : route.organization_name;
        var organization_photo_url = (route.organization_photo_url === undefined) ? "" : route.organization_photo_url;
        twitter_description = (route.twitter_description === undefined) ? "" : route.twitter_description;

        const candidate_rows = (route.candidates_on_organization_scene === undefined) ? {} :
            route.candidates_on_organization_scene.map((card,i) => {
          //Add props to your ListCandidateCard just as you would normally.
          return <ListCandidateCard key={i} ballot_item_display_name={card.ballot_item_display_name}
                           ballot_item_image_url_https={card.ballot_item_image_url_https}
                           is_positive_rating={card.is_positive_rating}
                           vote_smart_rating={card.vote_smart_rating}
                           vote_smart_time_span={card.vote_smart_time_span}
                           ballot_item_we_vote_id={card.ballot_item_we_vote_id}
                           update={route.update_candidate}
                           />
        });

        return <ScrollView>
          <Header></Header>
          <View style={styles.container}>
            <OrganizationalCard organization_name={ organization_name }
                                organization_photo_url={ organization_photo_url }
                                twitter_description={ twitter_description }
            />
            <View>
              {candidate_rows}
            </View>
          </View>
        </ScrollView>;

      case 'Second':
        return(
          <View style={styles.container}>
            <Second navigator={navigator}  />
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  image: {
        width: 40,
        height: 40,
        flex: 1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  card: {
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  button:{
    backgroundColor: 'powderblue',
    fontSize:20
  }
});

AppRegistry.registerComponent('WeVoteReactNative', () => WeVoteReactNative);
