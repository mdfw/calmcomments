/* Base imports */
import { Server } from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import SocketIO from 'socket.io';
import TTimer from './modules/Timer';
/* Routes */
import { accountRoutes, authenticationRoutes, postRoutes, PostController } from './modules';

/* Configurations */
import '../config/environment';
import redisClient from '../config/redisConnect';

const RedisStore = require('connect-redis')(session);

/* Main server setup */
let port = process.env.API_SERVER_PORT;
if (!port) {
  port = 3009;
}

const app = express();
const server = Server(app);
const io = new SocketIO(server);

/* Timer setup */
const triggerTime = function triggerTime(lastTimeStamp) {
  const newMessages = PostController.getPostsSinceDate(lastTimeStamp);
  if (newMessages) {
    console.log(`Emitting messages: ${newMessages.length}`);
    io.emit('messages', newMessages);
  }
  console.log('Time triggered');
};

const tickTime = function tickTime(now, later) {
  io.emit('tick', now, later);
};

const ttimer = new TTimer(5, triggerTime, tickTime); // eslint-disable-line no-unused-vars

/* Middleware setup */
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  res.status(err.status || port).render('500');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sessionMiddleware = session({
  name: 'ccs',
  secret: 'MmyWTLNNsTi15L8n3iUH8kls',
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

/* socket setup */
io.use(function ioSessionSetup(socket, next) {
  // Wrap the express middleware
  sessionMiddleware(socket.request, {}, next);
});

/* API Routes */
app.use('/api/v1', [accountRoutes, authenticationRoutes, postRoutes]);

const findAndEmitListeners = function findAndEmitListeners () {
  const allSockets = io.sockets;
  console.log('allSockets');
  console.dir(allSockets);
}

/* Socket options */
io.on('connection', function onConnect(socket) {
  const userId = socket.request.session.passport.user;
  console.log('Your User ID is', userId);
});


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

server.listen(port, function reportOnListen(error) {
  if (error) {
    console.log(`API Server ERROR on startup: ${error}`);
  } else {
    console.log(`API Server listening on http://localhost:${port}.`);
  }
});

