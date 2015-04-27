var stream_info = {
        'user_display_name': 'bej48snvvthy',
        'private': false,
        'kickflip_url': 'https://kickflip.io/e83a515e-fe69-4b19-afba-20f30d56b719',
        'extra_info': '',
        'city': 'Montreal',
        'title': '04/14/2015 12:45 PM',
        'state': 'Quebec',
        'type': 'HLS',
        'user_avatar': 'https://kick-us-east-1.s3.amazonaws.com/nomad-alpha/bej48snvvthy/avatars/avatar.jpg',
        'description': '',
        'deleted': false,
        'user_username': 'bej48snvvthy',
        'start_lat': '',
        'time_finished': '04/14/2015 16:46:43',
        'end_lon': -73.56478346,
        'time_started': '04/14/2015 16:45:47',
        'success': true,
        'start_lon': '',
        'country': 'Canada',
        'chat_url': 'Not implemented yet',
        'stream_id': 'e83a515e-fe69-4b19-afba-20f30d56b719',
        'length': 55,
        'thumbnail_url': 'https://kick-us-west-2.s3.amazonaws.com/nomad-alpha/bej48snvvthy/e83a515e-fe69-4b19-afba-20f30d56b719/thumb.jpg',
        'flags': 0,
        'end_lat': 45.51771212,
        'stream_url': 'https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/bej48snvvthy/e83a515e-fe69-4b19-afba-20f30d56b719/vod.m3u8'
    };

var stream_info_2 = {'user_display_name': 'gy1x8t48dcst', 'private': false, 'kickflip_url': 'https://kickflip.io/dff1af65-5797-4f7c-90d7-dd58a38f0aa1', 'extra_info': '', 'city': 'Montreal', 'title': '04/22/2015 04:50 PM', 'state': 'Quebec', 'type': 'HLS', 'user_avatar': 'https://kick-us-east-1.s3.amazonaws.com/nomad-alpha/gy1x8t48dcst/avatars/avatar.jpg', 'description': '', 'deleted': false, 'user_username': 'gy1x8t48dcst', 'start_lat': '', 'time_finished': '04/22/2015 20:51:23', 'end_lon': -73.6070529, 'time_started': '04/22/2015 20:50:31', 'success': true, 'start_lon': '', 'country': 'Canada', 'chat_url': 'Not implemented yet', 'stream_id': 'dff1af65-5797-4f7c-90d7-dd58a38f0aa1', 'length': 51, 'thumbnail_url': 'https://kick-us-west-2.s3.amazonaws.com/nomad-alpha/gy1x8t48dcst/dff1af65-5797-4f7c-90d7-dd58a38f0aa1/thumb.jpg', 'flags': 0, 'end_lat': 45.5274959, 'stream_url': 'https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/gy1x8t48dcst/dff1af65-5797-4f7c-90d7-dd58a38f0aa1/vod.m3u8'};

var short_info = {stream_url: 'https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/bej48snvvthy/e83a515e-fe69-4b19-afba-20f30d56b719/vod.m3u8'};

var stream_list = [];

stream_list.push(stream_info);
stream_list.push(stream_info_2);

var ListItemStreamWrapper = React.createClass({
  render: function() {
    return (
      <div class="streamItem">
        <OSMFStream {...this.props} />
      </div>
    );
  }
});

var OSMFStream = React.createClass({
  embedSWF: function() {

      thumbnail_url = stream_info.thumbnail_url
      stream_info = this.props.stream_info
      stream_url = stream_info.stream_url
      stream_id = stream_info.stream_id

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
          autoPlay: true,
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
    return (
      <div class="streamList">
        {this.props.stream_list.map(function(e) {
           return <ListItemStreamWrapper key={e.stream_id} stream_info={e}/>;
        })}
      </div>
    );
  }
});

$(".button.getStreams").click(function(){

  KICKFLIP_API_URL = "./api"

  endpoint = KICKFLIP_API_URL + '/search'
  
  $.post(endpoint, {},
  function(data, status){
    
    console.log(data)
    
    React.render(
      <StreamList stream_list={data.streams} />,
      document.getElementById('streams')
    );

  });
});