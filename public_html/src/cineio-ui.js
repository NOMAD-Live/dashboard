var CineIOStream = React.createClass({
  playStream: function () {

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

    var playOptions = this.props.playOptions || defaultPlayOptions;

    CineIO.play(this.props.streamId, this.props.streamId, playOptions);

  },
  componentDidMount: function () {
    this.playStream();
  },
  render: function () {
    return (
      <div id={this.props.streamId} />
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
    return (
      <div className="cineio-stream">
        <CineIOStream {...this.props} streamId={stream.id} />
      </div>
    )
  }
});


var Project = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var projectSecretKey = React.findDOMNode(this.refs.projectSecretKey).value.trim();
    
    // Do nothing if no value
    if (!projectSecretKey) return;
    
    if (this.props.onProjectSecretKeyUpdate) {
      this.props.onProjectSecretKeyUpdate({secret_key: projectSecretKey});
    }
    alert("aaa");
    return;
  },
  getInitialState: function() {
    return {secret_key:[]};
  },
  render: function () {
    return (
      <div className="project">
        <div className="project settings">
          <input type="text" defaultValue="960dc609fab24e922c3605d1152f48e4" placeholder="Project Secret Key" ref="projectSecretKey" />
          <button onclick={this.handleSubmit} >Update</button>
        </div>
        <div className="stream-list">
          {mock.streams.map(function(e) {
             return <CineIOAPIStream key={e.id} stream={e}/>;
          })}
        </div>
      </div>
    )
  }
});