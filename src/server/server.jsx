/* Core imports */
import http from 'http';
import httpProxy from 'http-proxy';
import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';

/* Configurations */

import '../config/environment';

/* Set up proxy routes to the api server */
let apiServerPort = process.env.API_SERVER_PORT;
if (!apiServerPort) {
  apiServerPort = 3006;
}
const apiProxy = httpProxy.createProxyServer();
const apiServer = `http://localhost:${apiServerPort}`;

let ourPort = process.env.MAIN_SERVER_PORT;
if (!ourPort) {
  ourPort = 3001;
}

const app = express();

app.use(favicon('build/public/assets/favicon.ico'));

/* Configure middleware */
app.use(morgan('combined'));


app.use(express.static('build/public'));

/* Proxy all api calls through to the api server */
app.all('/api/*', function allapiTraffic(req, res) {
  apiProxy.web(req, res, { target: apiServer });
});

const server = http.createServer(app);
const port = process.env.PORT || ourPort;
server.listen(port);
server.on('listening', function reportOnListen(error) {
  if (error) {
    console.log(`Main Server ERROR on startup: ${error}`);
  } else {
    console.log(`Main Server listening on http://localhost:${port}.`);
  }
});
