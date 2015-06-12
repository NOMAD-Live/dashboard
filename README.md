[![Stories in Ready](https://badge.waffle.io/NOMAD-Live/nomad-live-dashboard.png?label=ready&title=Ready)](https://waffle.io/NOMAD-Live/nomad-live-dashboard)
`nomad-live-dashboard`
======================

You can access the dashboard at http://nomad-live.github.io/nomad-live-dashboard/


### ~~How To Run~~ (Switched to Cine.IO)

Create a secrets.json file with the correct credentials from kickflip.io (those won't work) :

```json
{
	"KICKFLIP_CLIENT_ID" : "_YPOGaq7!ge2UT30h8ECKFyB45h6k;dPH-4qqw6d",
	"KICKFLIP_CLIENT_SECRET" : "-@YHm0TKVC60f-jTwz0jFBgupaXAzfE_fJQz@ko7dwTVKeMmD-DhE.C!TzqemN.==.6tj2pId6o1fiSxjoWAmt2@ImBg7MZOuENx8H:D!4rI3t;3dfWL3BpA6Ow.TkJv"
}
```

Then run the server with `python server.py`.


It will redirect all requests as such:
```
localhost:8000/api/<path>     --> https://kickflip.io/api/1.1/<path>
localhost:8000/<path>         --> localhost:8000/public_html/<path>
```
