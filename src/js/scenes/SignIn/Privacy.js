import React, { Component } from "react";
import { Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions} from 'react-native-router-flux';

import CookieStore from "../../stores/CookieStore";
import styles from "../../stylesheets/components/baseStyles"
import TabStore from "../../stores/TabStore";
const logging = require("../../utils/logging");


export default class Privacy extends React.Component {
  constructor (props) {
    super(props);
  }

  static getProps () {
    return {};
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to Privacy: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from Privacy: currentScene = " + Actions.currentScene);
    // For an explanation see "0mkara commented on Jun 10" at https://github.com/aksonov/react-native-router-flux/issues/1801
    // First saveoff the destination scene (which is actually the tab that was just clicked)
    let destinationScene = Actions.currentScene;
    // Second navigate to the bottom of this rnrf stack
    Actions.signIn();
    // Then navigate to the destinationScene, on another tab
    Actions.push(destinationScene);
  };

  componentWillMount () {
    console.log("Privacy ++++ MOUNT currentScene = " + Actions.currentScene);
    this.tabStoreListener = TabStore.addListener(this.onTabStoreChange.bind(this));
  }

  componentWillUnmount () {
    console.log("Privacy ---- UN mount");
    this.tabStoreListener.remove();
  }

  // Scenes on the SignIn stack, respond to clicking the SignIn tab icon, by toggling the AccountMenuModal
  onTabStoreChange () {
    Actions.signIn();  //Move to the top of the stack
  }

  render () {
    logging.renderLog("Privacy  scene = " + Actions.currentScene);

    return  <ScrollView>
      <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <View style={styles.termsCenteredTitle}>
            <Text style={[styles.title, {marginBottom: 10}]}>WeVote.US Privacy Policy</Text>
          </View>
          <Text style={[styles.title_text, {marginBottom: 10}]}>Last updated: December 26, 2016</Text>
          <Text style={styles.title}>Overview</Text>
          <Text>We Vote USA has created this privacy policy to explain how We Vote (or “we”) uses information that we collect from you while you visit the We Vote websites, currently located at </Text>
          <TouchableOpacity onPress = {() => Linking.openURL(CookieStore.getJumpURLWithCookie('http://WeVote.US'))}>
            <Text style={styles.hyperLink}>WeVote.US</Text>
          </TouchableOpacity>
          <Text>or while you use a portion of We Vote that is embedded on another website (the “Services”).  We Vote may modify this policy from time to time, so we encourage you to check this page when revisiting the Site.  The date of the most recent revision is listed below.{'\n'}</Text>
          <Text style={styles.title}>How we use your information</Text>
          <Text>When you request your ballot, send messages to friends, donate, join our newsletter, or take any other action on this Site, we may ask you to give us contact information, including your name, address, email address and telephone number. We may also obtain information about you from outside sources and combine it with the information we collect through this Site. We use this information to operate this Site, to sends you news and information about We Vote, to measure the effectiveness of our programs, and to send you timely election reminders.
            You may opt-out of receiving messages from We Vote by sending any email to </Text>
          <TouchableOpacity onPress = {() => Linking.openURL('mailto:info@WeVote.US?subject=Privacy=')}>
            <Text style={styles.hyperLink}>info@WeVote.US</Text>
          </TouchableOpacity>
          <Text> and asking that you not receive future email messages.  You may also opt-out by following the unsubscribe link at the bottom of each email.{'\n'}</Text>
          <Text>Some information on our mailing lists, such as names, email addresses, and addresses, may be exchanged with named partners and other organizations with principles and/or missions that overlap with those of We Vote. Subscribers may opt out of such mailing list exchanges at any time. Our purpose is to protect your information while making sure you have what you need to make an informed decision on Election Day.{'\n'}</Text>
          <Text style={styles.title}>Donations and credit card information</Text>
          <Text>When you contribute to We Vote online, we collect credit card information from you. That information is used solely for processing your contribution; it is not maintained by We Vote; and is never disclosed to anyone, for any other purpose other than for processing your contribution.{'\n'}</Text>
          <Text style={styles.title}>Security</Text>
          <Text>We Vote uses industry standard security measures to protect the information collected by this Site, but we cannot guarantee complete security.{'\n'}</Text>
          <Text style={styles.title}>Use of services by minors</Text>
          <Text>We Vote does not knowingly solicit personally identifying information from children under 13 years of age.  We will promptly remove any personal information from children under 13 upon notice to us.{'\n'}</Text>
          <Text style={styles.title}>Advertising</Text>
          <Text>We may place online advertising with third-party vendors, including Google, which will be shown on other sites on the internet. In some cases, those third-party vendors may decide which ads to show you based on your prior visits to the Site. At no time will you be personally identified to those third-party vendors, nor will any of the personal information you share with us be shared with those third-party vendors. If you prefer to opt out of the use of these third-party cookies on the Site, you can do so by visiting the Network Advertising Initiative opt out page.{'\n'}</Text>
          <Text style={styles.title}>Cookies and data tracking</Text>
          <Text>In order to better serve you, we use cookies and periodically analyze web logs.  Some cookies are used to pre-populate forms for you so that on repeat visits to the Site you don’t need to re-enter certain information.  You can set your browser to disable cookies, but then you would not have the advantage of having certain sections of forms being pre-populated for you, and you may not be able to access certain parts of the Site.  We may also use third-party services such as Google Analytics. This helps us understand traffic patterns and know if there are problems with our Site. We may also use embedded images in emails to track open rates for our mailings, so that we can tell which mailings appeal most to We Vote subscribers.{'\n'}</Text>
          <Text>The information generated by a cookie about your use of our Site (including your IP address) is transmitted to and stored by Google on servers in the United States. Google may also transfer this information to third parties where Google is legally required, or where such third parties process the information on Google’s behalf. Google can combine your IP address with any other data held by Google. By using this Site, you consent to the processing of data by Google in the manner and for the purposes set out above.{'\n'}</Text>
          <Text>URLs contained in emails may contain an ID that enables us to correctly identify the person who takes an action using a web page. We use these URLs to simplify the process of helping you to prepare to vote. We may occasionally present a shortened URL that references a longer URL which you can see in the browser’s address bar when you access the page.{'\n'}</Text>
          <Text style={styles.title}>Links to other sites</Text>
          <Text>This Privacy Policy does not apply to ANY external links or any website not owned and operated by We Vote. Third party sites will have their own policies which may be different from ours and we recommend that you check the privacy policy of each site that you visit.{'\n'}</Text>
          <Text style={styles.title}>Disclosure of information</Text>
          <Text>We Vote will challenge any attempt to gain access to the information you give us by government agencies or private organizations. In the unlikely event that we are required by law to disclose any of your information we will do our best to contact you first so that you may have the opportunity to object to the disclosure. We will also independently object to any requests for access to information about users of our Site that we believe to be improper.{'\n'}</Text>
          <Text style={styles.title}>Amendments and consent to this privacy policy</Text>
          <Text>By using and/or visiting our Site, you understand and  agree to be bound by this Privacy Policy.  If you do not agree to this Privacy Policy, please do not use the Site or the Services.{'\n'}</Text>
          <Text style={styles.title}>How to contact us</Text>
          <Text>If you have any questions about this Privacy Policy, you may contact us by sending an e-mail to </Text>
          <TouchableOpacity onPress = {() => Linking.openURL('mailto:info@WeVote.US?subject=Privacy')}>
            <Text style={styles.hyperLink}>info@WeVote.US</Text>
          </TouchableOpacity>

          <Text>{'\n'}You can also write to us at the following address:{'\n'}</Text>
          <View style={styles.leftIndent} >
            <Text style={styles.bold}>We Vote USA</Text>
            <Text>Attn: Terms of Service</Text>
            <Text>1717 Clemens Rd</Text>
            <Text>Oakland, CA 94602</Text>
          </View>
        </View>
      </View>
    </ScrollView>;
  }
}
