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

	eval("'use strict';\n\nvar _http = __webpack_require__(1);\n\nvar _http2 = _interopRequireDefault(_http);\n\nvar _httpProxy = __webpack_require__(2);\n\nvar _httpProxy2 = _interopRequireDefault(_httpProxy);\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _morgan = __webpack_require__(4);\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _serveFavicon = __webpack_require__(5);\n\nvar _serveFavicon2 = _interopRequireDefault(_serveFavicon);\n\n__webpack_require__(6);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Set up proxy routes to the api server */\n/* Core imports */\nvar apiServerPort = process.env.API_SERVER_PORT;\n\n/* Configurations */\n\nif (!apiServerPort) {\n  apiServerPort = 3006;\n}\nvar apiProxy = _httpProxy2.default.createProxyServer();\nvar apiServer = 'http://localhost:' + apiServerPort;\n\nvar ourPort = process.env.MAIN_SERVER_PORT;\nif (!ourPort) {\n  ourPort = 3001;\n}\n\nvar app = (0, _express2.default)();\n\napp.use((0, _serveFavicon2.default)('build/public/assets/favicon.ico'));\n\n/* Configure middleware */\napp.use((0, _morgan2.default)('combined'));\n\napp.use(_express2.default.static('build/public'));\n\n/* Proxy all api calls through to the api server */\napp.all('/api/*', function allapiTraffic(req, res) {\n  apiProxy.web(req, res, { target: apiServer });\n});\n\nvar server = _http2.default.createServer(app);\nvar port = process.env.PORT || ourPort;\nserver.listen(port);\nserver.on('listening', function reportOnListen(error) {\n  if (error) {\n    console.log('Main Server ERROR on startup: ' + error);\n  } else {\n    console.log('Main Server listening on http://localhost:' + port + '.');\n  }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server/server.jsx\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/server/server.jsx?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"http\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22http%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"http-proxy\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http-proxy\"\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///external_%22http-proxy%22?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///external_%22express%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"morgan\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"morgan\"\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"serve-favicon\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"serve-favicon\"\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///external_%22serve-favicon%22?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _dotenv = __webpack_require__(7);\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nvar _requireEnvironmentVariables = __webpack_require__(8);\n\nvar _requireEnvironmentVariables2 = _interopRequireDefault(_requireEnvironmentVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* 'As early as possible in your application, require and configure dotenv.'\n *   - https://www.npmjs.com/package/dotenv\n *\n * However, we aren't going to load these in production as it could lead to sloppy deploys.\n */\nif (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {\n  _dotenv2.default.load();\n} else {\n  _dotenv2.default.load();\n}\n\n/* If any of the environment variables(process.env.REDIS_URL) don't exist,\n *   the process exits with code 400.\n * https://github.com/bjoshuanoah/require-environment-variables\n */\n(0, _requireEnvironmentVariables2.default)(['REDIS_URL', 'API_SERVER_PORT', 'MAIN_SERVER_PORT', 'ACCOUNT_PEPPER_1', 'ACCOUNT_ENCRYPT_CURRENT_PEPPER', 'IDIER_WORKER_ID']);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/environment.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/environment.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = require(\"dotenv\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"dotenv\"\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = require(\"require-environment-variables\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require-environment-variables\"\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///external_%22require-environment-variables%22?");

/***/ }
/******/ ]);