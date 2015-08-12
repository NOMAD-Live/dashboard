var CINE_IO_PUBLIC_KEY = "196634661c8541dc5b188255cdc16cbf";
var streamId = "554cf071fc71760b00a78aad";

// JW Player 7 (Self-Hosted) --> "Error setting up player: Invalid license key"
// CineIO.init(CINE_IO_PUBLIC_KEY, {"jwPlayerKey":"LFTMC+7jkHPOBl9ZQoPERU6uXxtsvhAhtyhlCw=="});

// JW Player 6 (Self-Hosted) --> Logo still present
// CineIO.init(CINE_IO_PUBLIC_KEY, {"jwPlayerKey":"ajxiC0l4ALyAx9YOJM8pTZ2R7Q8HPL0CPh59Rg=="});

CineIO.init(CINE_IO_PUBLIC_KEY, {});

React.render(
  <BGUStream />,
  document.getElementById('bg-stream')
);

React.render(
  <Project />,
  document.getElementById('project')
);
