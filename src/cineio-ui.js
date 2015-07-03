'use strict';

var Project = React.createClass({
  fetchWithKey: function (secretKey, callback) {
    var endpoint = "https://www.cine.io/api/1/-/streams";

    $.ajax({
      url: endpoint,
      type: 'POST',
      dataType: 'jsonp',
      data: {secretKey:secretKey.value},
      success: function(data) {

        this.setState({streams: data});

        // Executes the callback if present
        typeof callback === 'function' && callback();

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(endpoint, status, err.toString());
        typeof callback === 'function' && callback(err);
      }.bind(this),
    });
  },
  componentDidMount: function () {
    // Initially hide the settings
    // $('.settings').hide();
  },
  getInitialState: function () {
    return {secret_key: [], streams: []};
  },
  render: function () {
    return (
      <div className={"project"}>
        <div className="settings-wrapper">
          <div className="settings">
            <ProjectSettings onSubmit={this.fetchWithKey} />
            <NomadApiInterface />
          </div>
        </div>
        <div className={"stream-list"}>
          {this.state.streams.map(function(e) {
             return <CineIOAPIStream key={e.id} stream={e}/>;
          })}
        </div>
      </div>
    )
  }
});


var NomadApiInterface = React.createClass({
  cleanStreams: function () {
    var endpoint = "http://api.nomadlive.tv/streams/clean";
    this.getURL(endpoint, function (data) {
      console.log("NomadAPI:cleanedStreams. " + data);
    });
  },
  syncStreams: function () {
    var endpoint = "http://api.nomadlive.tv/streams/sync";
    this.getURL(endpoint, function (data) {
      console.log("NomadAPI:syncedStreams. " + data);
    });
  },
  getURL: function (endpoint, callback) {
    this.setState({
      status: 'loading',
      message: 'Getting... ' + endpoint
    });

    $.ajax({
      url: endpoint,
      success: function(data) {

        var count = data ? data.length : 0;

        // Report how much streams we got.
        this.setState({
          streams: data,
          status: 'success',
          message: 'Got ' + count + ' streams.'
        });

        // Executes the callback if present
        typeof callback === 'function' && callback(data);

      }.bind(this),
      error: function(xhr, status, err) {

        console.error(endpoint, status, err.toString());

        this.setState({
          streams: [],
          status: 'error',
          message: status
        });

        // Executes the callback if present
        typeof callback === 'function' && callback(err);
      }.bind(this),
    });
  },
  getInitialState: function () {
    return {status: 'iddle', streams: [], message:'No message'};
  },
  render: function () {
    return (
      <div className={"api-interface"}>

        <button className="action-button"
          onClick={this.updateContent}
          title="Toggle the video player in the background."
          ref="bgstreamButton">Ustream?</button>

        <button className="action-button" onClick={this.cleanStreams}
          title="Clean streams not used in the last 15s." ref="cleanButton">
          <i className="fa fa-trash-o"></i>
        </button>
        <button className="action-button" onClick={this.syncStreams}
          title="Fetch streams from Cine.IO." ref="syncButton">
          <i className="fa fa-download"></i>
        </button>
        <StatusIndicator status={this.state.status}
          message={this.state.message} ref="status">
        </StatusIndicator>
      </div>
    )
  }
});

/**
 * Handles the top settings bar on the screen.
 */
var ProjectSettings = React.createClass({
  /**
   * Loads the project_secret_key from first the url parameter,
   * then the local storage. If none is present, just leave it empty. 
   */
  getProjectSecretKey: function() {
    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    var local = localStorage.getItem("project_secret_key");
    var half = location.search.split("key" + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : local;
  },
  onUpdateContentDone: function (err) {
    if (err) {
      this.setState({status:'error'});
      this.setAutoUpdate(0);
    } else {
      this.setState({
        status:'success',
        message: 'Refreshing every ' + this.state.update_every + 'ms.'
      });

      this.setAutoUpdate(this.state.update_every);
    }
  },
  /**
   * Allows to refresh using the enter key.
   */
  handleEnterKey: function (e) {
    if (e && e.keyCode == 13) {
      React.findDOMNode(this.refs.submitButton).click();
    }
  },
  /**
   * Loads the project_secret_key from first the url parameter,
   * then the local storage. If none is present, just leave it empty. 
   */
  updateContent: function (e) {

    var text = React.findDOMNode(this.refs.textfield).value.trim();

    // Do nothing if no value
    if (!text) {
      console.log("ProjectSettings:noContent");
      return;
    }

    // Shows loading
    this.setState({status:'loading'});

    if (this.props.onSubmit) {

      this.props.onSubmit({value: text}, this.onUpdateContentDone);
    }

    // Save the item (even if the key is invalid)
    localStorage.setItem("project_secret_key", text);
  },
  /**
   * Makes sure there is just one timer that auto-updates.
   * If the delay is zero, it will disable the auto-update mechanism.
   */
  setAutoUpdate: function (delay) {
    
    if (0 < delay) {

      // Do nothing if the interval is already set.
      if (this._interval) return;

      this._interval = setInterval(function () {
        this.updateContent();
      }.bind(this), delay);

    } else {
      // We should stop auto-updating.
      clearTimeout(this._interval);
    }
  },
  componentWillUnmount: function(){
    // Clears the timeout when the component unmounts.
    clearTimeout(this._interval); 
  },
  getInitialState: function() {
    return {
      status:'iddle',
      message: 'No message.',
      update_every: 5000
    };
  },
  componentDidMount: function() {

    var text = React.findDOMNode(this.refs.textfield).value.trim();

    // Auto update if there is a value in the text field
    if (text) {
      this.updateContent();
    }
  },
  render: function () {
    return (
      <div className="cine-io-interface">

        <input type="text" size="36" maxLength="32" ref="textfield"
          className="project-secret-key"
          onKeyUp={this.handleEnterKey}
          placeholder="Project Secret Key"
          defaultValue={this.getProjectSecretKey()} />

        <div className="action-button">

          <button className="action-button"
            onClick={this.updateContent}
            title="Refresh the stream list."
            ref="submitButton">Refresh</button>

          <StatusIndicator
            status={this.state.status}
            message={this.state.message}
            ref="status"></StatusIndicator>

        </div>

      </div>
    )
  }
});


var BGUStream = React.createClass({
  toggle: function () {
    if (this.state.enabled) {
      this.setState({ enabled: false });
    } else {
      this.setState({ enabled: true });
    }
  },
  getInitialState: function() {
    return { enabled: true };
  },
  render: function () {
    if (this.state.enabled) {
      return (
          <div className="bg-video-wrapper">
            <iframe
              src="https://www.ustream.tv/embed/18155672?wmode=direct&showtitle=false&autoplay=true&volume=0"
              className="bg-video-iframe"  webkitallowfullscreen allowFullScreen
              frameBorder="no" width="100%" height="100%">
            </iframe>
          </div>
        );
    } else {
      return (<div></div>);
    }
  }
});


/**
 * A user friendly feedback to the user.
 * Uses exclusively icones and displays more information on hover.
 */
var StatusIndicator = React.createClass({
  getDefaultProps: function() {
    return {
      states: {
        'iddle': '<i class="fa fa-paper-plane status iddle" ></i>',
        'loading': '<i class="fa fa-refresh status loading" ></i>',
        'success': '<i class="fa fa-check-circle status success" ></i>',
        'error': '<i class="fa fa-exclamation-circle status error" ></i>',
      }
    };
  },
  render: function () {
    var html = this.props.states[this.props.status];
    if (!html) {
      console.log("StatusIndicator:warning: Injecting empty HTML.");
    }
    return (
      <div className="status-indicator" title={this.props.message}
        dangerouslySetInnerHTML={{__html: html}}>
      </div>
    )
  }
});
