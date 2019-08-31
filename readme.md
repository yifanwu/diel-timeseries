# How to run

## Set-Up for New Users:
- Make sure npm is installed (https://www.npmjs.com/get-npm)
- If you also have Python3 installed, configure npm to run Python2.7 by running `npm config set python python2.7`
- Install tsc by running `npm install -g typescript`
- Install better-sqlite3 with `npm install -g typescript`




There are two parts to making the application work: the UI and the server.

The UI part is contained in this repo, which you start by running the following

```bash
npm install
npm run start
```

For the backend, since we are still in development mode, it's easier to just run the websocket server directly in the backend wrapper repo (so that we don't have to run `npm pack` and copy the file everytime).

So the temporary solution is as follows: clone [diel-db-server](https://github.com/yifanwu/diel-db-server), then follow the set up instruction (`npm install && npm run build`), then run `npm run timeseries`. (NOTE: For new users, make sure to run `tsc` in the src directory first in diel-db-server to build the output files)
