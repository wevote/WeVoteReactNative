import React, { Component } from "react";
import { Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions } from 'react-native-router-flux';


import styles from "../../stylesheets/components/baseStyles"
const logging = require("../../utils/logging");


export default class Credits extends Component {
  constructor (props) {
    super(props);
  }

  static getProps () {
    return {};
  }

  render () {
    logging.renderLog("Credits  scene = " + Actions.currentScene);

    return  <ScrollView>
      <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <Text style={styles.title}>Credits</Text>

          <Text style={styles.title}>We are grateful for these organizations that are critical to our work.</Text>
          <View >
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Ballotpedia</Text ><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Center for Technology and Civic Life</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Change.org</Text><Text> Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}CivicMakers</Text><Text>- Event Collaborations</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Code for San Francisco & Code for America</Text><Text>- Our Home for Volunteer Work</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}DLA Piper</Text><Text>- Legal</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Facebook</Text><Text>- Authentication & Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Google Civic</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}League of Women Voters</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}MapLight</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Microsoft</Text><Text>- For supporting Code for San Francisco</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Sunlight Foundation</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}TurboVote, Democracy Works</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Twitter</Text><Text>- Authentication & Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Vote Smart</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Voting Information Project, Pew Charitable Trusts</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}We Vote Education</Text><Text>- Data</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Wikipedia</Text><Text>- Data</Text ></View>
          </View>

        <Text style={styles.title}>{'\n'}Special thanks to our team of volunteers.</Text>
        <Text >You are the best! {'\n'}</Text>
          <Text >(This is a list of volunteers who have contributed 10 or more hours, in rough order of hours contributed.){'\n'}</Text>
          <View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Dale McGrew </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jenifer Fernandez Ancona </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Anisha Jain </Text><Text>- San Jose, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Rob Simpson </Text><Text>- Warrenton, VA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jeff French </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Neelam Joshi </Text><Text>- Columbus, OH</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Alicia Kolar Prevost </Text><Text>- Washington, DC</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Bharath D N Reddy </Text><Text>- Mountain View, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Sarah Clements </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Zach Monteith </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Lisa Cho </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Nicolas Fiorini </Text><Text>- Arlington, VA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Colette Phair </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jennifer Holmes </Text><Text>- Pacifica, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Joe Evans </Text><Text>- Santa Cruz, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Andrea Moed </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Steve Podell </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Matt Holford </Text><Text>- New York, NY</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Edward Ly </Text><Text>- Gresham, OR</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}YuanHsin Chang </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Ciero Kilpatrick </Text><Text>- Washington, DC</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Eric Ogawa </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Mary O'Connor </Text><Text>- Sebastopol, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Harsha Dronamraju </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Rohan Bhambhoria </Text><Text>- Mississauga, Ontario, Canada</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Nitin Garg </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Niko Barry </Text><Text>- Berkeley, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Adam Barry </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Marissa Luna </Text><Text>- Lansing, MI</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Aaron Borden </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Judy Johnson </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Irene Florez </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Udi Davidovich </Text><Text>- Walnut Creek, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Chris Arya </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Josh Southern </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Tom Furlong </Text><Text>- Menlo Park, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Paul A. "Dash" McLean </Text><Text>- E. Palo Alto, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Eric Olivera </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Emily Hittle </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Mikel Duffy </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Robin Braverman </Text><Text>- Walnut Creek, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Mike McConnell </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Niyati Kothari </Text><Text>- Alpharetta, GA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Dan Ancona </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Zak Zaidman </Text><Text>- Ojai, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Debra Cleaver </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}William Winters </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Anat Shenker-Osorio </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Kad Smith </Text><Text>- Berkeley, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Courtney Gonzales </Text><Text>- Benicia, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jenna Haywood </Text><Text>- Berkeley, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Mansi Desai </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jayadev Akkiraju </Text><Text>- Santa Clara, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Raphael Merx </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Susan Clark </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Kim Anderson </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Betsy Neely Sikma </Text><Text>- Taylors, SC</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Keith Underwood </Text><Text>- Alameda, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Jesse Aldridge </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Josh Levinger </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Leslie Castellanos </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Miguel Elasmar </Text><Text>- Sarasota, FL</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Cindy Cruz </Text><Text>- Daly City, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Nicole Shanahan </Text><Text>- Palo Alto, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Steve Whetstone </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Brian Bordley </Text><Text>- Berkeley, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Marcus Busby </Text><Text>- San Francisco, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}lulu </Text><Text>- New York, NY</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Chris Griffith </Text><Text>- Santa Cruz, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Nathan Stankowski </Text><Text>- San Rafael, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Sean McMahon </Text><Text>- Redwood City, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Scott Wasserman </Text><Text>- Philadelphia, PA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Adrienne Yang </Text><Text>- Oakland, CA</Text ></View>
            <View style={{flexDirection: 'row'}}><Text style={[styles.bold, styles.indent]}>{`\u2022  `}Mark Rosenthal </Text><Text>- Oakland, CA</Text ></View>
          </View>

          <Text style={styles.title}>{'\n'}Join Us!</Text >
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text>{'\n'}We couldn’t do what we do without volunteers and donors. Please sign up to volunteer at</Text>
            <TouchableOpacity onPress = {() => Linking.openURL('http://WeVoteTeam.org/volunteer')}>
              <Text style={styles.hyperLink}>http://WeVoteTeam.org/volunteer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>;
  }
}
