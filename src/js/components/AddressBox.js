/* global google */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { FormInput, FormLabel } from 'react-native-elements'
import LoadingWheel from "../components/LoadingWheel";
import VoterActions from "../actions/VoterActions";
import VoterStore from "../stores/VoterStore";
import styles from "../stylesheets/BaseStyles";

export default class AddressBox extends Component {
  static propTypes = {
    toggleFunction: PropTypes.func.isRequired,
    saveUrl: PropTypes.string.isRequired
  };

  constructor (props) {
      super(props);
      this.state = {
        loading: false,
        voter_address: ""
      };

    this.updateVoterAddress = this.updateVoterAddress.bind(this);
    this.voterAddressSave = this.voterAddressSave.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount () {
    this.setState({ voter_address: VoterStore.getTextForMapSearch() });
    this.voterStoreListener = VoterStore.addListener(this._onVoterStoreChange.bind(this));
    // October 10, 2017:  We do want google autocomplete if possible in native
    // let addressAutocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete);
    // this.googleAutocompleteListener = addressAutocomplete.addListener("place_changed", this._placeChanged.bind(this, addressAutocomplete));
  }

  componentWillUnmount (){
    this.voterStoreListener.remove();
    // this.googleAutocompleteListener.remove();
  }

  _onVoterStoreChange () {
    // There are two different address objects that can be in the VoterStore (unfortunately)
    let addressString = VoterStore.getAddressFromObjectOrTextForMapSearch();
    if (this.props.toggleFunction && addressString.length > 0 ){
      this.setState({ voter_address: addressString, loading: false });
      console.log("AddressBox _onVoterStoreChange, VoterStore changed and Address round tripped -- calling toggleFunction. ");
      this.props.toggleFunction();
    } else {
      console.log("AddressBox _onVoterStoreChange, VoterStore changed, but the Address has been not yet been saved. addressString = '" + addressString + "'");
    }
  }

  _ballotLoaded (){
    //browserHistory.push(this.props.saveUrl);
  }

  _placeChanged (addressAutocomplete) {
    let place = addressAutocomplete.getPlace();
    if (place.formatted_address) {
      this.setState({
        voter_address: place.formatted_address
      });
    } else {
      this.setState({
        voter_address: place.name
      });
    }
  }

  updateVoterAddress (event) {
    this.setState({voter_address: event.target.value});
  }

  handleKeyPress (event) {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      setTimeout(() => {
        VoterActions.voterAddressSave(this.state.voter_address);
        this.setState({loading: true});
      }, 250);
    }
  }

  voterAddressSave (event) {
    console.log("AddressBox voterAddressSave, VoterActions.voterAddressSave(" + this.state.voter_address +");" );
    event.preventDefault();
    VoterActions.voterAddressSave(this.state.voter_address);
    this.setState({loading: true});
  }

  render () {
    if (this.state.loading) {
      return <LoadingWheel />;
    }
    let {height, width} = Dimensions.get('window');
    return <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
         <View>
          <FormLabel style={{marginTop: height/6}}>Enter address where you are registered to vote</FormLabel>
          <FormInput style={{marginTop: height/16, marginBottom: height/13, height: height/17, width: width*0.9,
                             borderWidth: 1, padding: 5}}
                     onChangeText={text => this.setState({voter_address: text})}
                     onSubmitEditing={this.voterAddressSave}
                     value={this.state.voter_address}
                     ref="autocomplete"
                     placeholder="Enter address" />
        </View>
        <View style={{marginTop: height/3}}>
          <TouchableOpacity style = {styles.button} onPress={this.voterAddressSave}>
            <Text> Save </Text>
          </TouchableOpacity>
        </View>
      </View>;
  }
}
