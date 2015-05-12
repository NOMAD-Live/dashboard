var CineIOStream = React.createClass({
  playStream: function () {
    var id = this.state.stream.id;

    if (!id) { return; }

    var defaultPlayOptions = {
      stretching: 'uniform',
      width: "50%",
      aspectratio: '16:9',
      primary: 'flash',
      autostart: true,
      metaData: true,
      mute: false,
      controls: true
    };

    var playOptions = this.state.playOptions || defaultPlayOptions;

    CineIO.play(id, id, playOptions);

  },
  componentDidMount: function () {
    if (this.props.stream) {
        this.setState({stream: this.props.stream});
    }
    if (this.props.playOptions) {
        this.setState({playOptions: this.props.playOptions});
    }
    // Waits for state before playing
    this.setState({}, this.playStream);
  },
  getInitialState: function () {
    return {stream: {id: -1}, playOptions: {}};
  },
  updateStream: function (stream) {
    this.setState({stream: stream});
  },
  render: function () {
    return (
      <div id={this.props.stream.id} />
    )
  }
});


var MainStream = React.createClass({
  render: function () {
    return (
      <div className="cineio-stream center">
        <CineIOStream {...this.props} />
      </div>
    )
  }
});


var CineIOAPIStream = React.createClass({
  render: function () {
    var stream = this.props.stream;
    var playOptions = {
      stretching: 'uniform',
      width: "32%",
      aspectratio: '16:9',
      primary: 'flash',
      autostart: true,
      metaData: true,
      mute: true,
      controls: false
    };
    return (
      <div className="cineio-stream">
        <CineIOStream {...this.props} stream={stream} playOptions={playOptions} />
      </div>
    )
  }
});

