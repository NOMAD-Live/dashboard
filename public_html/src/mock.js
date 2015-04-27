'use strict';

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

var stream_info_live = {
    "flags": 0,
    "state": null,
    "start_lon": null,
    "user_display_name": "2lecn36cj69z",
    "country": null,
    "user_username": "2lecn36cj69z",
    "end_lat": null,
    "user_avatar": "https://kick-us-east-1.s3.amazonaws.com/nomad-alpha/2lecn36cj69z/avatars/avatar.jpg",
    "stream_url": "https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/2lecn36cj69z/eb1a8d3b-f197-46bd-8256-583bd4ef53c9/index.m3u8",
    "thumbnail_url": null,
    "stream_id": "eb1a8d3b-f197-46bd-8256-583bd4ef53c9",
    "time_started": "04/27/2015 20:28:17",
    "start_lat": null,
    "deleted": false,
    "description": null,
    "type": "HLS",
    "title": "04/27/2015 04:27 PM",
    "length": 0,
    "kickflip_url": "https://kickflip.io/eb1a8d3b-f197-46bd-8256-583bd4ef53c9",
    "extra_info": null,
    "city": null,
    "time_finished": "04/27/2015 20:28:17",
    "end_lon": null,
    "private": false,
    "chat_url": "Not implemented yet"
};

var stream_info_2 = {'user_display_name': 'gy1x8t48dcst', 'private': false, 'kickflip_url': 'https://kickflip.io/dff1af65-5797-4f7c-90d7-dd58a38f0aa1', 'extra_info': '', 'city': 'Montreal', 'title': '04/22/2015 04:50 PM', 'state': 'Quebec', 'type': 'HLS', 'user_avatar': 'https://kick-us-east-1.s3.amazonaws.com/nomad-alpha/gy1x8t48dcst/avatars/avatar.jpg', 'description': '', 'deleted': false, 'user_username': 'gy1x8t48dcst', 'start_lat': '', 'time_finished': '04/22/2015 20:51:23', 'end_lon': -73.6070529, 'time_started': '04/22/2015 20:50:31', 'success': true, 'start_lon': '', 'country': 'Canada', 'chat_url': 'Not implemented yet', 'stream_id': 'dff1af65-5797-4f7c-90d7-dd58a38f0aa1', 'length': 51, 'thumbnail_url': 'https://kick-us-west-2.s3.amazonaws.com/nomad-alpha/gy1x8t48dcst/dff1af65-5797-4f7c-90d7-dd58a38f0aa1/thumb.jpg', 'flags': 0, 'end_lat': 45.5274959, 'stream_url': 'https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/gy1x8t48dcst/dff1af65-5797-4f7c-90d7-dd58a38f0aa1/vod.m3u8'};

var short_info = {stream_url: 'https://d3sa2dsf6xa6d8.cloudfront.net/nomad-alpha/bej48snvvthy/e83a515e-fe69-4b19-afba-20f30d56b719/vod.m3u8'};

var stream_list_vod = [];
stream_list_vod.push(stream_info);
stream_list_vod.push(stream_info_2);

var stream_list_mixed = [];
stream_list_mixed = stream_list_vod;
stream_list_mixed.push(stream_info_live);

var mock = {};

mock.stream = stream_info;
mock.streams = stream_list_vod;
mock.live_stream = stream_info_live;
mock.mixed_streams = stream_list_mixed;
