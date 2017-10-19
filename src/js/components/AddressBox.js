/* global google */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from "react-native-router-flux";
import { FormInput } from 'react-native-elements'
import LoadingWheel from "../components/LoadingWheel";
import VoterActions from "../actions/VoterActions";
import VoterStore from "../stores/VoterStore";
//import { Button } from "react-bootstrap";
//import { browserHistory } from "react-router";

export default class AddressBox extends Component {
  static propTypes = {
    _toggleSelectAddressModal: PropTypes.func,
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
    this.setState({ voter_address: VoterStore.getAddressObject() });
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
    if (this.props._toggleSelectAddressModal){
       this.props._toggleSelectAddressModal();
     }
    if (this.state.voter_address){
      Actions.pop();  // browserHistory.push(this.props.saveUrl);
    } else {
      this.setState({ voter_address: VoterStore.getAddressObject(), loading: false });
    }
  }

  _ballotLoaded (){
    browserHistory.push(this.props.saveUrl);
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
    event.preventDefault();
    VoterActions.voterAddressSave(this.state.voter_address);
    this.setState({loading: true});
  }

  render () {
    if (this.state.loading){
      return <LoadingWheel />;
    }
    let {width} = Dimensions.get('window');
    return <View>
        <FormInput style={{height: 40, width: width-100, borderColor: 'lightgray', borderWidth: 0.3}}
          onChangeText={(value) => this.setState({voter_address: value})}
          onSubmitEditing={this.voterAddressSave}
          value={this.state.voter_address}
          ref="autocomplete"
          placeholder="Enter address where you are registered to vote" />

        <View>
          <TouchableOpacity onPress={this.voterAddressSave}>
            <Text> Save </Text>
          </TouchableOpacity>
        </View>
      </View>;
  }
}
