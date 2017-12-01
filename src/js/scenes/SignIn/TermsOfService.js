import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Linking, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Actions, ActionConst } from 'react-native-router-flux';

import RouteConst  from "../RouteConst";
import styles from "../../stylesheets/components/baseStyles"
const logging = require("../../utils/logging");


export default class TermsOfService extends Component {
  constructor (props) {
    super(props);
  }

  static getProps () {
    return {};
  }

  static onEnter = () => {
    logging.rnrfLog("onEnter to TermsOfService: currentScene = " + Actions.currentScene);
  };

  static onExit = () => {
    logging.rnrfLog("onExit from TermsOfService: currentScene = " + Actions.currentScene);
    // For an explanation see "0mkara commented on Jun 10" at https://github.com/aksonov/react-native-router-flux/issues/1801
    // First saveoff the destination scene (which is actually the tab that was just clicked)
    let destinationScene = Actions.currentScene;
    // Second navigate to the bottom of this rnrf stack
    Actions.signIn();
    // Then navigate to the destinationScene, on another tab
    Actions.push(destinationScene);
  };


  render () {
    logging.renderLog("TermsOfService  scene = " + Actions.currentScene);

    return  <ScrollView>
      <View style={styles.outer_gray_pane} >
        <View style={styles.inner_white_pane} >
          <View style={styles.termsCenteredTitle}>
            <Text style={[styles.title, {marginBottom: 10}]}>WeVote.US Terms of Service</Text>
          </View>
          <Text style={[styles.title_text, {marginBottom: 10}]}>Last updated: December 26, 2016</Text>

          <Text style={styles.title}>Overview</Text>
          <Text>This website is operated by We Vote USA. Throughout the site, the terms “We Vote”, “we”, “us” and “our” refer to We Vote USA. We Vote USA offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.{'\n'}</Text>
          <Text>By visiting our site and/or using our tools, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are contributors of content.{'\n'}</Text>
          <Text>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.{'\n'}</Text>
          <Text>Any new features or tools which are added to the current site shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to this website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.{'\n'}</Text>
          <Text style={styles.title}>Website Terms</Text>
          <Text>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.{'\n'}</Text>
          <Text>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).{'\n'}</Text>
          <Text>You must not transmit any worms or viruses or any code of a destructive nature.{'\n'}</Text>
          <Text>A breach or violation of any of the Terms will result in an immediate termination of your Services.{'\n'}</Text>
          <Text style={styles.title}>General Conditions</Text>
          <Text>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.{'\n'}</Text>
          <Text>We Vote grants permission to copy the software that powers this website, made available at https://github.com/WeVote, under the MIT License.{'\n'}</Text>
          <Text>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.{'\n'}</Text>
          <Text style={styles.title}>Accuracy, Completeness and Timeliness of Information</Text>
          <Text>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.{'\n'}</Text>
          <Text>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.{'\n'}</Text>
          <Text style={styles.title}>Modifications to the Service</Text>
          <Text>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.{'\n'}</Text>
          <Text>We shall not be liable to you or to any third-party for any modification, suspension or discontinuance of the Service.{'\n'}</Text>
          <Text style={styles.title}>Optional Tools</Text>
          <Text>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.{'\n'}</Text>
          <Text>You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.{'\n'}</Text>
          <Text>Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).{'\n'}</Text>
          <Text>We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.{'\n'}</Text>
          <Text style={styles.title}>Third-Party Links</Text>
          <Text>Certain content, products and services available via our Service may include materials from third-parties.{'\n'}</Text>
          <Text>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.{'\n'}</Text>
          <Text>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party&#8217;s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.{'\n'}</Text>
          <Text style={styles.title}>Personal Information</Text>
          <Text>Your submission of personal information through the store is governed by our {/*<Link to="/more/privacy">*/}Privacy Policy{/*</Link>*/}.{'\n'}</Text>
          <Text style={styles.title}>Errors, Inaccuracies and Omissions</Text>
          <Text>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information if any information in the Service or on any related website is inaccurate at any time without prior notice.{'\n'}</Text>
          <Text>We undertake no obligation to update, amend or clarify information in the Service or on any related website, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.{'\n'}</Text>
          <Text style={styles.title}>Prohibited Uses</Text>
          <Text>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.{'\n'}</Text>
          <Text style={styles.title}>Disclaimer of Warranties; Limitation of Liability</Text>
          <Text>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.{'\n'}</Text>
          <Text>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.{'\n'}</Text>
          <Text>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.{'\n'}</Text>
          <Text>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all services delivered to you through the service are (except as expressly stated by us) provided &#8216;as is&#8217; and &#8216;as available&#8217; for your use, without any representation, warranties or conditions of any kind, either express or implied.{'\n'}</Text>
          <Text>In no case shall We Vote USA, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.{'\n'}</Text>
          <Text style={styles.title}>Indemnification</Text>
          <Text>You agree to indemnify, defend and hold harmless We Vote USA and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.{'\n'}</Text>
          <Text style={styles.title}>Severability</Text>
          <Text>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.{'\n'}</Text>
          <Text style={styles.title}>Termination</Text>
          <Text>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.{'\n'}</Text>
          <Text>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.{'\n'}</Text>
          <Text>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).{'\n'}</Text>
          <Text style={styles.title}>Entire Agreement</Text>
          <Text>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.{'\n'}</Text>
          <Text>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).{'\n'}</Text>
          <Text>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.{'\n'}</Text>
          <Text style={styles.title}>Governing Law</Text>
          <Text>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the state of California.{'\n'}</Text>
          <Text style={styles.title}>Changes to Terms of Service</Text>
          <Text>You can review the most current version of the Terms of Service at any time at this page.{'\n'}</Text>
          <Text>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.{'\n'}</Text>


          <Text style={styles.title}>How to contact us</Text>
          <Text>If you have any questions about the Terms of Service, you may contact us by sending an e-mail to </Text>
          <TouchableOpacity onPress = {() => Linking.openURL('mailto:info@WeVote.US&subject=Terms%20of%20Service&body=')}>
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
