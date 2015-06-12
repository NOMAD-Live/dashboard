var mock_stream_info = {
  "streamName": "Xyjs_Qk0",
        "name": "First Stream",
          "id": "554cf071fc71760b00a78aad",
  "play": {
        "rtmp": "rtmp://fml.cine.io/20C45E/cines/Xyjs_Qk0",
         "hls": "http://hls.cine.io/Xyjs_Qk0.m3u8",
  },
  "publish": {
      "stream": "Xyjs_Qk0?earth49",
         "url": "rtmp://publish-sfo1.cine.io/live",
  },
  "assignedAt": "2015-05-08T18:43:54.452Z",
  "expiration": "2035-05-08T00:00:00.000Z",
    "password": "earth49",
      "record": false,
};

var mock = {};

mock.stream = mock_stream_info;
mock.streams = [mock_stream_info];
