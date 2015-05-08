var CINE_IO_PUBLIC_KEY = "009d6ee9b26138c215803e644a90e739";
var streamId = "553e46f75484820b000bb76e";
var domId = "mainPlayer";

CineIO.init(CINE_IO_PUBLIC_KEY, {});

React.render(
  <MainStream streamId={streamId}/>,
  document.getElementById('mainPlayer')
);
