'use strict';

function isLive(stream) {
    return stream.length === 0;
}

function isVOD(stream) {
  return !isLive(stream);
}

var ListItemStreamWrapper = React.createClass({
  render: function() {
    return (
      <div className="streamItem">
        <OSMFStream {...this.props} />
      </div>
    );
  }
});

var OSMFStream = React.createClass({
  embedSWF: function() {

      var stream_info = this.props.stream_info

      var thumbnail_url = stream_info.thumbnail_url
      var stream_url = stream_info.stream_url
      var stream_id = stream_info.stream_id

      var parameters = {
          src: stream_url,
          autoPlay: isLive(stream_info),
          verbose: true,
          volume: 0,
          controlBarAutoHide: true,
          controlBarAutoHideTimeout: 0,
          controlBarPosition: "bottom",
          poster: thumbnail_url,
          javascriptCallbackFunction: "jsbridge",
          plugin_hls: "https://s3.amazonaws.com/kickflip-static/swf/HLSProviderOSMF.swf"
      };

      var wmodeOptions = ["direct", "opaque", "transparent", "window"];
      
      //Embed the player SWF:              
      swfobject.embedSWF(
        "https://s3.amazonaws.com/kickflip-static/swf/StrobeMediaPlayback.swf",
        stream_id,
        180,
        120,
        "10.1.0",
        "https://s3.amazonaws.com/kickflip-static/swf/expressInstall.swf",
        parameters,
        {
          allowFullScreen: true,
          wmode: wmodeOptions[0],
          allowscriptaccess: "always",
          scale: "exactFit",
          menu: false
        }
      );
  },

  render: function() {
    return (
      <object id={this.props.stream_info.stream_id}>
        <embed src="https://s3.amazonaws.com/kickflip-static/swf/StrobeMediaPlayback.swf"
          type="application/x-shockwave-flash"/>
      </object>
    );
  },
  componentDidMount: function() {
    this.embedSWF();
  }
});

var StreamList = React.createClass({
  
  updateStreamList: function() {

    var KICKFLIP_API_URL = "./api"
    var endpoint = KICKFLIP_API_URL + '/search'
    
    var self = this;
    
    $.post(endpoint, {},
    function(data, status){
      
      if (status === "success") {

        var newState = {
          live_streams: data.streams.filter(isLive),
          vod_streams: data.streams.filter(isVOD),
        }

        self.setState(newState)

      } else {
        console.log("Could not fetch stream list: " + status)
      }

    });
  },
  getInitialState: function() {
    return {live_streams:[], vod_streams:[]};
  },
  componentDidMount: function() {
    var REFRESH_RATE = 10000
    this.updateStreamList()
    setInterval(this.updateStreamList, REFRESH_RATE);
  },
  render: function() {

    var live_list = this.state.live_streams
    var vod_list = this.state.vod_streams

    return (
      <div className="streamLists">
        <h1>Present</h1>
        <hr/>
        <div className="center liveStreamList">
          {live_list.map(function(e) {
             return <ListItemStreamWrapper key={e.stream_id} stream_info={e}/>;
          })}
        </div>
        <h1>Past</h1>
        <hr/>
        <div className="center vodStreamList">
          {vod_list.map(function(e) {
             return <ListItemStreamWrapper key={e.stream_id} stream_info={e}/>;
          })}
        </div>
      </div>
    );
  }
});

React.render(
  <StreamList />,
  document.getElementById('streams')
);