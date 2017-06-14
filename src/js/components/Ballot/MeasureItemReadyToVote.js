import React, { Component, PropTypes } from "react";
//import { Link } from "react-router";
import GuideStore from "../../stores/GuideStore";
import SupportStore from "../../stores/SupportStore";
import { capitalizeString } from "../../utils/textFormat";


export default class MeasureItemReadyToVote extends Component {
  static propTypes = {
    key: PropTypes.string,
    we_vote_id: PropTypes.string.isRequired,
    measure_subtitle: PropTypes.string,
    measure_text: PropTypes.string,
    kind_of_ballot_item: PropTypes.string.isRequired,
    ballot_item_display_name: PropTypes.string.isRequired,
    link_to_ballot_item_page: PropTypes.bool,
    measure_url: PropTypes.string,
    _togglePopup: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {transitioning: false, showModal: false};
  }

  componentDidMount () {
    this.guideStoreListener = GuideStore.addListener(this._onGuideStoreChange.bind(this));
    this._onGuideStoreChange();
    this.supportStoreListener = SupportStore.addListener(this._onSupportStoreChange.bind(this));
    this.setState({ supportProps: SupportStore.get(this.props.we_vote_id) });
  }

  componentWillUnmount () {
    this.guideStoreListener.remove();
    this.supportStoreListener.remove();
  }

  _onGuideStoreChange (){
    // We just want to trigger a re-render
    this.setState({ transitioning: false });
    // console.log("_onGuideStoreChange");
  }

  _onSupportStoreChange () {
    this.setState({ supportProps: SupportStore.get(this.props.we_vote_id), transitioning: false });
  }
  render () {
    const { supportProps } = this.state;

    let { ballot_item_display_name,
        we_vote_id } = this.props;
    let measureLink = "/measure/" + we_vote_id;

    ballot_item_display_name = capitalizeString(ballot_item_display_name);

    return <div className="card-main measure-card">

      <div className="card-main__content">
        <div className="u-flex u-items-center">

        <div className="u-flex-auto u-cursor--pointer">
          <h2 className="card-main__display-name">
            { this.props.link_to_ballot_item_page ?
              <Link to={measureLink}>{ballot_item_display_name}</Link> :
                ballot_item_display_name
            }
          </h2>
        </div>

        {
          supportProps && supportProps.is_support ?
         <div className="u-flex-none u-justify-end">
           <span className="u-inline--xs">Supported by you</span>
           <img src="/img/global/svg-icons/thumbs-up-color-icon.svg" width="24" height="24" />
         </div> :
          null
        }
        {
          supportProps && supportProps.is_oppose ?
            <div className="u-flex-none u-justify-end">
              <span className="u-inline--xs">Opposed by you</span>
              <img src="/img/global/svg-icons/thumbs-down-color-icon.svg" width="24" height="24" />
            </div> :
              null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count > supportProps.oppose_count ?
          <div className="u-flex-none u-justify-end">
            <span className="u-inline--xs">Your network supports</span>
            <img src= "/img/global/icons/up-arrow-color-icon.svg" className="network-positions__support-icon" width="20" height="20" />
          </div> :
          null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count < supportProps.oppose_count ?
          <div className="u-flex-none u-justify-end">
             <span className="u-inline--xs">Your network opposes</span>
             <img src= "/img/global/icons/down-arrow-color-icon.svg" className="network-positions__oppose-icon" width="20" height="20" />
           </div> :
          null
        }
        {
          supportProps && !supportProps.is_support && !supportProps.is_oppose && supportProps.support_count === supportProps.oppose_count ?
          <div className="u-flex-none u-justify-end">Your network is undecided</div> :
          null
        }

        {/* This is the area *under* the measure title */}
      </div>
      </div> {/* END .card-main__content */}
    </div>;
  }
}
