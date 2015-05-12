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


var Project = React.createClass({
  fetchWithKey: function (secretKey) {
    var endpoint = "https://www.cine.io/api/1/-/streams"
    
    $.ajax({
      url: endpoint,
      dataType: 'jsonp',
      type: 'POST',
      data: {secretKey:secretKey.value},
      success: function(data) {
        this.setState({streams: data});
        console.log("AAAAA");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(endpoint, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {secret_key:[], streams:[]};
  },
  render: function () {
    return (
      <div className="project">
        <SimpleSubmit
          placeholder="Project Secret Key"
          onContentUpdate={this.fetchWithKey} />
        <hr/>
        <div className="stream-list">
          {this.state.streams.map(function(e) {
             return <CineIOAPIStream key={e.id} stream={e}/>;
          })}
        </div>
      </div>
    )
  }
});


var SimpleSubmit = React.createClass({
  updateContent: function (e) {
    
    var text = React.findDOMNode(this.refs.textfield).value.trim();
    
    // Do nothing if no value
    if (!text) { console.log("SimpleSubmit: No content."); return; }
    
    if (this.props.onContentUpdate) {
      console.log("SimpleSubmit:onContentUpdate");
      this.props.onContentUpdate({value: text});
    }

    localStorage.setItem("project_secret_key", text); // save the item
  },
  render: function () {
    var project_secret_key = localStorage.getItem("project_secret_key");
    return (
      <div className="project settings">
        <input type="text" ref="textfield" defaultValue={project_secret_key} {...this.props} />
        <button onClick={this.updateContent} >Update</button>
      </div>
    )
  }
});
