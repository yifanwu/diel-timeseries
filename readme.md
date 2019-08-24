# How to run

There are two parts to making the application work: the UI and the server.

The UI part is contained in this repo, which you start by running the following

```bash
npm install
npm run start
```

For the backend, since we are still in development mode, it's easier to just run the websocket server directly in the backend wrapper repo (so that we don't have to run `npm pack` and copy the file everytime).

So the temporary solution is as follows: clone https://github.com/yifanwu/diel-db-server, then follow the set up instruction (`npm install && npm run build`), then run `npm run timeseries`.

`