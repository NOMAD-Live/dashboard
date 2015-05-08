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
window.CineIOStream = CineIOStream;

var MainStream = React.createClass({
    render: function () {
    return (
      <div className="cineio-stream center">
        <CineIOStream {...this.props} />
      </div>
    )
  }
});
window.MainStream = MainStream;