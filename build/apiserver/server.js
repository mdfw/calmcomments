/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _http = __webpack_require__(1);\n\nvar _bodyParser = __webpack_require__(2);\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _expressSession = __webpack_require__(4);\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _morgan = __webpack_require__(5);\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _passport = __webpack_require__(6);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\n__webpack_require__(12);\n\nvar _postgresConnect = __webpack_require__(7);\n\nvar _postgresConnect2 = _interopRequireDefault(_postgresConnect);\n\nvar _redisConnect = __webpack_require__(9);\n\nvar _redisConnect2 = _interopRequireDefault(_redisConnect);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RedisStore = __webpack_require__(11)(_expressSession2.default);\n/* Routes */\n// import { accountRoutes, recipientRoutes, authenticationRoutes, postRoutes } from './modules';\n/* Configurations */\n/* Base imports */\n\n\nvar port = process.env.API_SERVER_PORT;\nif (!port) {\n  port = 3009;\n}\n\nvar app = (0, _express2.default)();\n\n/* Middleware setup */\napp.use(function (err, req, res, next) {\n  if (res.headersSent) next(err);\n  res.status(err.status || port).render('500');\n});\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\napp.use((0, _expressSession2.default)({\n  name: 'snss',\n  secret: 'MmyWTLNNsTi15L8n3iUH8kls',\n  resave: true,\n  saveUninitialized: false,\n  store: new RedisStore({ client: _redisConnect2.default })\n}));\napp.use(_passport2.default.initialize());\napp.use(_passport2.default.session());\napp.use((0, _morgan2.default)('combined'));\n\n/* Routes */\n// app.use('/api/v1', [accountRoutes, recipientRoutes, authenticationRoutes, postRoutes]);\n\napp.get('/', function baseReturn(req, res) {\n  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');\n});\n\nprocess.on('SIGTERM', function () {\n  console.log('Closing server.');\n  app.close();\n});\n\napp.on('close', function () {\n  console.log('Closing redis.');\n  _redisConnect2.default.quit();\n  _postgresConnect2.default.close();\n});\n\n/* Start the API Server */\nvar server = (0, _http.Server)(app);\nserver.listen(port, function reportOnListen(error) {\n  if (error) {\n    console.log('API Server ERROR on startup: ' + error);\n  } else {\n    console.log('API Server listening on http://localhost:' + port + '.');\n  }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/apiserver.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/apiserver.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"http\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22http%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///external_%22express%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express-session\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express-session\"\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"morgan\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"morgan\"\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = require(\"passport\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"passport\"\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _sequelize = __webpack_require__(8);\n\nvar _sequelize2 = _interopRequireDefault(_sequelize);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar sequelize = new _sequelize2.default('calmcomment', 'mdw', 'null', {\n  dialect: 'postgres', // or 'sqlite', 'postgres', 'mariadb'\n  port: 5432 });\n\nsequelize.authenticate().then(function () {\n  console.log('Connection has been established successfully.');\n}, function (err) {\n  console.log('Unable to connect to the database:', err);\n});\n\nexports.default = sequelize;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/postgresConnect.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/postgresConnect.js?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = require(\"sequelize\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"sequelize\"\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redis = __webpack_require__(10);\n\nvar _redis2 = _interopRequireDefault(_redis);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar REDIS_URL = process.env.REDIS_URL;\n\n/* Connect to redis */\nvar redisClient = _redis2.default.createClient(REDIS_URL);\n\nredisClient.on('error', function redisErrorReport(err) {\n  console.log('Redis connection error ' + err);\n});\n\nexports.default = redisClient;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/redisConnect.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/redisConnect.js?");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = require(\"redis\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"redis\"\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = require(\"connect-redis\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"connect-redis\"\n// module id = 11\n// module chunks = 0\n//# sourceURL=webpack:///external_%22connect-redis%22?");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _dotenv = __webpack_require__(13);\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nvar _requireEnvironmentVariables = __webpack_require__(14);\n\nvar _requireEnvironmentVariables2 = _interopRequireDefault(_requireEnvironmentVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* 'As early as possible in your application, require and configure dotenv.'\n *   - https://www.npmjs.com/package/dotenv\n *\n * However, we aren't going to load these in production as it could lead to sloppy deploys.\n */\nif (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {\n  _dotenv2.default.load();\n} else {\n  _dotenv2.default.load();\n}\n\n/* If any of the environment variables(process.env.REDIS_URL) don't exist,\n *   the process exits with code 400.\n * https://github.com/bjoshuanoah/require-environment-variables\n */\n(0, _requireEnvironmentVariables2.default)(['REDIS_URL', 'API_SERVER_PORT', 'MAIN_SERVER_PORT', 'ACCOUNT_PEPPER_1', 'ACCOUNT_ENCRYPT_CURRENT_PEPPER', 'IDIER_WORKER_ID']);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/environment.js\n// module id = 12\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/environment.js?");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("module.exports = require(\"dotenv\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"dotenv\"\n// module id = 13\n// module chunks = 0\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("module.exports = require(\"require-environment-variables\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require-environment-variables\"\n// module id = 14\n// module chunks = 0\n//# sourceURL=webpack:///external_%22require-environment-variables%22?");

/***/ }
/******/ ]);