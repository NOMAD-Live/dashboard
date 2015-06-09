'use strict';

var Project = React.createClass({
  fetchWithKey: function (secretKey) {
    var endpoint = "https://www.cine.io/api/1/-/streams";

    $.ajax({
      url: endpoint,
      type: 'POST',
      dataType: 'jsonp',
      data: {secretKey:secretKey.value},
      success: function(data) {
        console.log("Project:newStreams.");
        this.setState({streams: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(endpoint, status, err.toString());
      }.bind(this),
    });
  },
  getInitialState: function () {
    return {secret_key: [], streams: []};
  },
  render: function () {
    return (
      <div className={"project " + this.props.className}>
        <hr/>
        <SimpleSubmit onSubmit={this.fetchWithKey} />
        <hr/>
        <div className={"stream-list " + this.props.className}>
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
    if (!text) { console.log("SimpleSubmit:noContent"); return; }
    
    if (this.props.onSubmit) {
      console.log("SimpleSubmit:onSubmit");
      this.props.onSubmit({value: text});
    }

    localStorage.setItem("project_secret_key", text); // save the item
  },
  componentDidMount: function() {

    var text = React.findDOMNode(this.refs.textfield).value.trim();
    
    if (text) {
      this.updateContent();
    }
  },
  render: function () {
    
    function get_project_secret_key() {
      // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
      var local = localStorage.getItem("project_secret_key");
      var half = location.search.split("key" + '=')[1];
      return half !== undefined ? decodeURIComponent(half.split('&')[0]) : local;
    }

    return (
      <div className="project settings center">
        <input type="text" size="36" maxLength="32" ref="textfield" 
          placeholder="Project Secret Key"
          defaultValue={get_project_secret_key()} />
        <button onClick={this.updateContent} >Update</button>
      </div>
    )
  }
});
