/* Base imports */
import { Server } from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import TTimer from './modules/Timer';

/* Routes */
import { accountRoutes, authenticationRoutes, postRoutes } from './modules';

/* Configurations */
import '../config/environment';
import redisClient from '../config/redisConnect';

const RedisStore = require('connect-redis')(session);


let port = process.env.API_SERVER_PORT;
if (!port) {
  port = 3009;
}

const app = express();

const triggerTime = function triggerTime() {
  console.log('Time triggered');
};

const tickTime = function tickTime(now, later) {
 /* const nowDate = new Date(now);
  const laterDate = new Date(later);
  console.log(`now: ${nowDate.toString()} later: ${laterDate.toString()}`);
  */
};

const ttimer = new TTimer(5, triggerTime, tickTime);

/* Middleware setup */
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  res.status(err.status || port).render('500');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'ccs',
  secret: 'MmyWTLNNsTi15L8n3iUH8kls',
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

/* Routes */
app.use('/api/v1', [accountRoutes, authenticationRoutes, postRoutes]);

app.get('/', function baseReturn(req, res) {
  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');
});

process.on('SIGTERM', () => {
  console.log('Closing server.');
  app.close();
});

app.on('close', () => {
  console.log('Closing redis.');
  redisClient.quit();
});

/* Start the API Server */
const server = Server(app);
server.listen(port, function reportOnListen(error) {
  if (error) {
    console.log(`API Server ERROR on startup: ${error}`);
  } else {
    console.log(`API Server listening on http://localhost:${port}.`);
  }
});

