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
      <div className="col-sm-4 streamItem">
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

      function jsbridge(playerId, event, data) {
        switch(event) {
          case "timeChange":
          case "timeupdate":
          case "progress":
            break;
          default:
            console.log(event, data);
        }
      }

      var wmodeOptions = ["direct", "opaque", "transparent", "window"];

      var parameters = {
          src: stream_url,
          autoPlay: stream_info['length'] === 0,
          verbose: true,
          controlBarAutoHide: true,
          controlBarPosition: "bottom",
          poster: thumbnail_url,
          javascriptCallbackFunction: "jsbridge",
          plugin_hls: "https://s3.amazonaws.com/kickflip-static/swf/HLSProviderOSMF.swf"
      };

      //Embed the player SWF:              
      swfobject.embedSWF(
        "https://s3.amazonaws.com/kickflip-static/swf/StrobeMediaPlayback.swf",
        stream_id,
        360,
        240,
        "10.1.0",
        "https://s3.amazonaws.com/kickflip-static/swf/expressInstall.swf",
        parameters,
        {
          allowFullScreen: true,
          wmode: "direct",
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
  render: function() {

    var stream_list = this.props.stream_list
    var live_list = stream_list.filter(isLive)
    var vod_list = stream_list.filter(isVOD)

    return (
      <div className="streamLists">
        <h1>Present</h1>
        <div className="row liveStreamList">
          {live_list.map(function(e) {
             return <ListItemStreamWrapper key={e.stream_id} stream_info={e}/>;
          })}
        </div>
        <h1>Past</h1>
        <div className="row vodStreamList">
          {vod_list.map(function(e) {
             return <ListItemStreamWrapper key={e.stream_id} stream_info={e}/>;
          })}
        </div>
      </div>
    );
  }
});

$(".getStreams").click(function(){

  var KICKFLIP_API_URL = "./api"

  var endpoint = KICKFLIP_API_URL + '/search'
  
  $.post(endpoint, {},
  function(data, status){
    
    console.log(data)
    
    React.render(
      <StreamList stream_list={data.streams} />,
      document.getElementById('streams')
    );

  });
});
