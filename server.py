# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import Response
from flask import render_template
from flask import stream_with_context
from flask import send_from_directory

from oauthlib.oauth2 import MobileApplicationClient
from requests_oauthlib import OAuth2Session

import requests
import json


KICKFLIP_BASE_URL = "https://api.kickflip.io/"

KICKFLIP_API_URL = "https://kickflip.io/api/1.1/"

# Loads credentials from the secrets.json file.
with open('secrets.json') as data_file:

    data = json.load(data_file)

    KICKFLIP_CLIENT_ID = data['KICKFLIP_CLIENT_ID']
    KICKFLIP_CLIENT_SECRET = data['KICKFLIP_CLIENT_SECRET']


connected = False


def connect():
    global connected
    global kickflip_session
    global KICKFLIP_CLIENT_ID
    global KICKFLIP_CLIENT_SECRET
    global KICKFLIP_API_URL

    if not connected:

        endpoint = KICKFLIP_BASE_URL + '/o/token/'

        parameters = ({
            'client_secret': KICKFLIP_CLIENT_SECRET,
            'grant_type': 'client_credentials',
            'client_id': KICKFLIP_CLIENT_ID,
        })

        response = requests.post(endpoint, parameters)

        if response.status_code != 200:
            raise Exception("Couldn't connect to Kickflip...")

        token = response.json()

        client = MobileApplicationClient(KICKFLIP_CLIENT_ID)

        kickflip_session = OAuth2Session(
            KICKFLIP_CLIENT_ID,
            client=client,
            token=token,
        )

        connected = True
        print "CONNECTED WITH CLIENT_ID", KICKFLIP_CLIENT_ID

    return connected


app = Flask(
    __name__,
    static_folder='public_html'
)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.route('/api/<path:url>', methods=['GET', 'POST'])
def api(url):

    if not connected:
        connect()

    response = {}

    if request.method == 'POST':
        endpoint = KICKFLIP_API_URL + url

        response = kickflip_session.post(endpoint, request.data)

    if request.method == 'GET':
        endpoint = KICKFLIP_API_URL + url

        response = kickflip_session.post(endpoint, {})

    return Response(
        response,
        content_type="text/json",
    )


@app.route('/<path:url>')
def catch_all(url):
    if url.startswith('api/'):
        return api(url)
    else:
        return send_from_directory(app.static_folder, url)


@app.route('/')
def home():
    return catch_all("index.html")

if __name__ == '__main__':
    # connect()
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )
