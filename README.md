`nomad-live-dashboard`
======================

Run the server with :

```bash
python server.py
```

It will redirect all requests as such:
```
localhost:8000/api/<path>     --> https://kickflip.io/api/1.1/<path>
localhost:8000/<path>         --> localhost:8000/public_html/<path>
```