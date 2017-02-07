/* Base imports */
import { Server } from 'http';
import favicon from 'serve-favicon';
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
let ourPort = process.env.MAIN_SERVER_PORT;
if (!ourPort) {
  ourPort = 3009;
}

const app = express();
const server = Server(app);
const io = new SocketIO(server);

/* Timer setup */
const triggerTime = function triggerTime(lastTimeStamp) {
  PostController.getPostsSinceDate(lastTimeStamp)
    .then(function allPosts(newMessages) {
      if (newMessages) {
        io.emit('messages', newMessages);
      }
    });
};

const tickTime = function tickTime(now, later) {
  io.emit('tick', now, later);
};

const ttimer = new TTimer(5, triggerTime, tickTime); // eslint-disable-line no-unused-vars

/* Middleware setup */
app.use(favicon('build/public/assets/favicon.ico'));
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  res.status(err.status || port).render('500');
});
app.use(express.static('build/public'));
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

// On socket connection, figure out who's still listening and send the list around.
const findAndEmitListeners = function findAndEmitListeners() {
  // TODO: this is likely inefficient at large loads
  const listeners = [];
  let guestCounter = 0;
  const clients = Object.keys(io.eio.clients);

  clients.forEach(function findNames(client) {
    const clientSession = io.eio.clients[client].request.session;
    if (clientSession &&
      clientSession.passport &&
      clientSession.passport.user
    ) {
      listeners.push(clientSession.passport.user.displayName);
    } else {
      guestCounter += 1;
    }
  });
  if (guestCounter > 0) {
    listeners.push(`${guestCounter} guests`);
  }
  io.emit('listeners', listeners);
};

/* Socket options */
io.on('connection', function onConnect(socket) { // onConnect(socket)
  console.log('CONNECTION');
  findAndEmitListeners();
  socket.on('nick', function sendNick(name) {
    socket.nick = name; // eslint-disable-line no-param-reassign
    findAndEmitListeners();
  });
});

// TODO: need a disconnect listener

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
const port = process.env.PORT || ourPort;
server.listen(port, function reportOnListen(error) {
  if (error) {
    console.log(`Server ERROR on startup: ${error}`);
  } else {
    console.log(`Server listening on http://localhost:${port}.`);
  }
});

