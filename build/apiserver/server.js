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

	eval("'use strict';\n\nvar _http = __webpack_require__(1);\n\nvar _bodyParser = __webpack_require__(2);\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _expressSession = __webpack_require__(4);\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _morgan = __webpack_require__(5);\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _modules = __webpack_require__(6);\n\n__webpack_require__(23);\n\nvar _redisConnect = __webpack_require__(26);\n\nvar _redisConnect2 = _interopRequireDefault(_redisConnect);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Configurations */\n/* Base imports */\nvar RedisStore = __webpack_require__(28)(_expressSession2.default);\n// import passport from 'passport';\n/* Routes */\n\n\nvar port = process.env.API_SERVER_PORT;\nif (!port) {\n  port = 3009;\n}\n\nvar app = (0, _express2.default)();\n\n/* Middleware setup */\napp.use(function (err, req, res, next) {\n  if (res.headersSent) next(err);\n  res.status(err.status || port).render('500');\n});\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\napp.use((0, _expressSession2.default)({\n  name: 'snss',\n  secret: 'MmyWTLNNsTi15L8n3iUH8kls',\n  resave: true,\n  saveUninitialized: false,\n  store: new RedisStore({ client: _redisConnect2.default })\n}));\n// app.use(passport.initialize());\n// app.use(passport.session());\napp.use((0, _morgan2.default)('combined'));\n\n/* Routes */\napp.use('/api/v1', [_modules.accountRoutes]);\n\napp.get('/', function baseReturn(req, res) {\n  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');\n});\n\nprocess.on('SIGTERM', function () {\n  console.log('Closing server.');\n  app.close();\n});\n\napp.on('close', function () {\n  console.log('Closing redis.');\n  _redisConnect2.default.quit();\n});\n\n/* Start the API Server */\nvar server = (0, _http.Server)(app);\nserver.listen(port, function reportOnListen(error) {\n  if (error) {\n    console.log('API Server ERROR on startup: ' + error);\n  } else {\n    console.log('API Server listening on http://localhost:' + port + '.');\n  }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/apiserver.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/apiserver.js?");

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
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Account = __webpack_require__(7);\n\nObject.keys(_Account).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _Account[key];\n    }\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/modules/index.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/modules/index.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.AccountController = exports.accountRoutes = undefined;\n\nvar _routes = __webpack_require__(8);\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _controller = __webpack_require__(9);\n\nvar AccountController = _interopRequireWildcard(_controller);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.accountRoutes = _routes2.default;\nexports.AccountController = AccountController;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/modules/Account/index.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/modules/Account/index.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _controller = __webpack_require__(9);\n\n// import { ensureLoggedIn } from '../Authentication';\n\nvar routes = new _express.Router();\n// import { addAccountEndpoint, getAccountInfoEndpoint } from './controller';\n\n\nroutes.route('/account').post(_controller.addAccountEndpoint);\n\n// routes.get('/account', ensureLoggedIn(), getAccountInfoEndpoint);\n\nexports.default = routes;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/modules/Account/routes.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/modules/Account/routes.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar models = __webpack_require__(10);\n\nvar Account = models.Account;\n\n/* Returns either the current account's accountId or, if onBehalfOfId is passed in\n *  to the body, it will verify if the current account can act on behalf of the passed\n *  in id and return that.\n *  @param {object} req - the request object that has a user account attached\n *  @returns {string} accountId - the accountId to use in searches.\n *   TODO: need to move it to it's own module since we're duplicating it in every controller.\n */\nvar activeAccountId = function getAccount(req) {\n  var currentAccount = req.user;\n  var onBehalfOfId = req.body.onBehalfOfId;\n  if (onBehalfOfId && onBehalfOfId.length > 0) {\n    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {\n      return onBehalfOfId;\n    }\n  }\n  if (req.user && req.user.accountId) {\n    return req.user.accountId;\n  }\n  return null;\n};\n\n/* Adds an account to the Accounts database based on the fields passed in.\n * Params needed in body:\n *   @param {string} email - the email address\n *   @param {string} password - the user's password. Must pass owasp tests.\n *   @param {string} displayName - the name to display on the users page.\n */\nvar addAccountEndpoint = function addAccountEndpoint(req, res) {\n  var _req$body = req.body,\n      email = _req$body.email,\n      password = _req$body.password,\n      displayName = _req$body.displayName;\n  // const newAccount = new Account({ email, password, displayName });\n\n  var newAccount = Account.build({\n    email: email,\n    displayName: displayName\n  });\n  newAccount.setPassword(password).then(function () {\n    // eslint-disable-line arrow-body-style\n    return newAccount.save();\n  }).then(function (createdAccount) {\n    console.log('createdAccount');\n    console.dir(createdAccount);\n    var cleanedAccount = createdAccount.toJSON();\n    res.status(201).json({\n      success: true,\n      message: 'Successfully Registered',\n      account: cleanedAccount\n    });\n  }).catch(function (err) {\n    if (err.code === 11000) {\n      res.statusMessage = 'Account with that email already exists'; // eslint-disable-line no-param-reassign\n      res.status(409).end();\n      return;\n    }\n    var errorMessage = 'Account could not be created.';\n    if (err.message) {\n      errorMessage = err.message;\n    }\n    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign\n    res.status(422).end();\n  });\n};\n\n/* Get account info for accountId.\n * Params needed in req.body:\n *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account\n *      can act on behalf of it.\n *  @param {number} accountId - Will be pulled from req.user.\n *  Uses activeAccountId() to get the search parameters.\n */\nvar getAccountInfoEndpoint = function getAccountInfoEndpoint(req, res) {\n  // eslint-disable-line consistent-return\n  var accountId = activeAccountId(req);\n  if (!accountId) {\n    return res.status(422).json({ success: false, message: 'No accountId provided' });\n  }\n  Account.findOneAccount(accountId, false).then(function (item) {\n    var cleanedItem = item.toJSON();\n    res.status(201).json({\n      success: true,\n      account: cleanedItem\n    });\n  }).catch(function (err) {\n    res.statusMessage = err.message; // eslint-disable-line no-param-reassign\n    res.status(422).end();\n  });\n};\n\nvar updateAccountEndpoint = function updateAccountEndpoint(req, res) {\n  res.status(418).json({\n    message: 'Brewing'\n  });\n};\n\nexports.addAccountEndpoint = addAccountEndpoint;\nexports.updateAccountEndpoint = updateAccountEndpoint;\nexports.getAccountInfoEndpoint = getAccountInfoEndpoint;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/modules/Account/controller.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/modules/Account/controller.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _sequelize = __webpack_require__(13);\n\nvar _sequelize2 = _interopRequireDefault(_sequelize);\n\nvar _Account = __webpack_require__(15);\n\nvar _Account2 = _interopRequireDefault(_Account);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar allConfigs = {\n  development: {\n    username: 'mdw',\n    password: null,\n    database: 'calmcomment',\n    host: '127.0.0.1',\n    dialect: 'postgres'\n  },\n  test: {\n    username: 'root',\n    password: null,\n    database: 'database_test',\n    host: '127.0.0.1',\n    dialect: 'postgres'\n  },\n  production: {\n    username: 'root',\n    password: null,\n    database: 'database_production',\n    host: '127.0.0.1',\n    dialect: 'postgres'\n  }\n};\n\nvar env = process.env.NODE_ENV || 'development';\nvar config = allConfigs[env];\nvar sequelize = null;\nif (process.env.DATABASE_URL) {\n  sequelize = new _sequelize2.default(process.env.DATABASE_URL);\n} else {\n  sequelize = new _sequelize2.default(config.database, config.username, config.password, config);\n}\nvar db = {};\n\nsequelize.authenticate().then(function (err) {\n  console.log('Connection has been established successfully.');\n}, function (err) {\n  console.log('Unable to connect to the database:', err);\n});\n\nvar accountModel = (0, _Account2.default)(sequelize, _sequelize2.default);\ndb[accountModel.name] = accountModel;\n\nObject.keys(db).forEach(function associateThem(modelName) {\n  if ('associate' in db[modelName]) {\n    db[modelName].associate(db);\n  }\n});\n\nsequelize.sync({ force: true }).then(function (err) {\n  console.log('It worked!');\n}, function (err) {\n  console.log('An error occurred while creating the table:', err);\n});\n\ndb.sequelize = sequelize;\ndb.Sequelize = _sequelize2.default;\n\nmodule.exports = db;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/models/index.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/models/index.js?");

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	eval("module.exports = require(\"sequelize\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"sequelize\"\n// module id = 13\n// module chunks = 0\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _passwordEncryption = __webpack_require__(16);\n\nvar _appraise = __webpack_require__(19);\n\nmodule.exports = function (sequelize, DataTypes) {\n  var Account = sequelize.define('Account', {\n    displayName: {\n      type: DataTypes.STRING,\n      allowNull: false,\n      validate: {\n        notEmpty: true,\n        len: [1, 50]\n      }\n    },\n    email: {\n      type: DataTypes.STRING,\n      allowNull: false,\n      validate: {\n        isEmail: true,\n        notEmpty: true,\n        len: [1, 50]\n      }\n    },\n    encryptedPasswordHash: {\n      type: DataTypes.STRING,\n      allowNull: false,\n      validate: {\n        notEmpty: true\n      }\n    },\n    encryptedPasswordPepperId: {\n      type: DataTypes.STRING,\n      allowNull: false,\n      validate: {\n        notEmpty: true\n      }\n    }\n  }, {\n    instanceMethods: {\n      setPassword: function setPassword(password) {\n        var self = this;\n        return Promise.resolve((0, _appraise.appraisePassword)(password)).then(function checkAppraisal(appraisalMessages) {\n          if (appraisalMessages.length > 0) {\n            throw new Error(appraisalMessages.join(', '));\n          }\n          return password;\n        }).then(function runHashing(passwordValue) {\n          return (0, _passwordEncryption.encryptPassword)(passwordValue);\n        }).then(function (encryptedValue) {\n          console.log('Got encrypted value: ');\n          console.dir(encryptedValue);\n          self.encryptedPasswordHash = encryptedValue.encrypted;\n          self.encryptedPasswordPepperId = encryptedValue.pepperId;\n        }).catch(function (err) {\n          throw err;\n        });\n      },\n      toJSON: function toJSON() {\n        var values = Object.assign({}, this.get());\n        delete values.encryptedPasswordHash;\n        return values;\n      }\n\n    }\n  });\n  return Account;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/models/Account.js\n// module id = 15\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/models/Account.js?");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.passwordsMatch = exports.aesHash = exports.bcryptHash = exports.hashPassword = exports.deAesHash = exports.encryptPassword = undefined;\n\nvar _bcrypt = __webpack_require__(17);\n\nvar _crypto = __webpack_require__(18);\n\nvar _crypto2 = _interopRequireDefault(_crypto);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Hashes the password into a SHA512 hex hash */\nvar hashPassword = function hashPassword(password) {\n  var hasher = _crypto2.default.createHash('sha512');\n  hasher.update(password);\n  var hashed = hasher.digest('hex');\n  return hashed;\n};\n\n/* Bcrypts a string (expects a hash) with 10 rounds and a per user salt\n * Salt is returned as part of the hash and thus saved.\n * Note that this version of bcrypt only takes the first 72 characters.\n  */\nvar bcryptHash = function bcryptHash(passwordhash) {\n  var saltRounds = 10;\n  return (0, _bcrypt.hash)(passwordhash, saltRounds);\n};\n\n/* Encrypts the bcrypted string using aes256 using a pepper stored\n *   in the environment. This is what should be finally saved.\n */\nvar aesHash = function aesHash(passwordhash) {\n  var currentPepperId = process.env.ACCOUNT_ENCRYPT_CURRENT_PEPPER;\n  var pepper = process.env[currentPepperId];\n  var algorithm = 'aes-256-ctr';\n  var cipher = _crypto2.default.createCipher(algorithm, pepper);\n  var crypted = cipher.update(passwordhash, 'utf8', 'hex');\n  crypted += cipher.final('hex');\n  return { encrypted: crypted, pepperId: currentPepperId };\n};\n\n/* Encrypting a password.\n   Follows dropbox's pattern of hashing, bcrypting, then encrypting.\n   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/\n*/\nvar encryptPassword = function encryptPassword(rawPassword) {\n  return Promise.resolve(rawPassword).then(hashPassword).then(bcryptHash).then(aesHash);\n};\n\n/* Decrypts the encrypted bcrypt hash using aes256 using a pepper stored\n *   in the environment. Should use this only with the bcrypted, hashed password.\n */\nvar deAesHash = function deAesHash(passwordhash, pepperId) {\n  var pepper = process.env[pepperId];\n  if (!pepper) {\n    return new Error('Pepper not found.');\n  }\n  var algorithm = 'aes-256-ctr';\n  var decipher = _crypto2.default.createDecipher(algorithm, pepper);\n  var decrypted = decipher.update(passwordhash, 'hex', 'utf8');\n  decrypted += decipher.final('utf8');\n  return decrypted;\n};\n\n/* Compare passwords.\n * Because we are using hashing and encrypting, we have to do that before we compare.\n */\nvar passwordsMatch = function passwordsMatch(candidatePassword, encryptedPasswordHash, pepperId) {\n  // compare the submitted password to encrypted password in database.\n  var candidateHashed = hashPassword(candidatePassword);\n  var decryptedPass = deAesHash(encryptedPasswordHash, pepperId);\n  return (0, _bcrypt.compare)(candidateHashed, decryptedPass);\n};\n\nexports.encryptPassword = encryptPassword;\nexports.deAesHash = deAesHash;\nexports.hashPassword = hashPassword;\nexports.bcryptHash = bcryptHash;\nexports.aesHash = aesHash;\nexports.passwordsMatch = passwordsMatch;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/apiserver/models/passwordEncryption.js\n// module id = 16\n// module chunks = 0\n//# sourceURL=webpack:///./src/apiserver/models/passwordEncryption.js?");

/***/ },
/* 17 */
/***/ function(module, exports) {

	eval("module.exports = require(\"bcrypt\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"bcrypt\"\n// module id = 17\n// module chunks = 0\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ },
/* 18 */
/***/ function(module, exports) {

	eval("module.exports = require(\"crypto\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"crypto\"\n// module id = 18\n// module chunks = 0\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.appraisePostMessage = exports.appraisePostSubject = exports.appraiseAccountId = exports.appraisePasswordErrors = exports.appraisePasswordExtra = exports.appraisePassword = exports.appraiseDisplayName = exports.appraiseEmail = exports.appraiseThese = undefined;\n\nvar _validator = __webpack_require__(20);\n\nvar _owaspPasswordStrengthTest = __webpack_require__(21);\n\nvar _owaspPasswordStrengthTest2 = _interopRequireDefault(_owaspPasswordStrengthTest);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Is the email valid? Uses the validator library to test.\n */\nvar appraiseEmail = function appraiseEmail(emailAddress) {\n  var messages = [];\n  if ((0, _validator.isEmpty)(emailAddress)) {\n    messages.push('Email address is required.');\n  }\n  if (!(0, _validator.isEmpty)(emailAddress) && !(0, _validator.isEmail)(emailAddress)) {\n    messages.push('Email address does not appear to be valid.');\n  }\n  return messages;\n};\n\n/* Test for the validity of the displayName.\n *  Currently only checks if it's empty.\n */\nvar appraiseDisplayName = function appraiseDisplayName(displayName) {\n  var messages = [];\n  if ((0, _validator.isEmpty)(displayName)) {\n    messages.push('Display name is required.');\n  }\n  return messages;\n};\n\n/* Tests a password.\n * Must be valid and pass the owasp validation tests.\n */\nvar appraisePassword = function appraisePassword(password) {\n  var messages = [];\n  if ((0, _validator.isEmpty)(password)) {\n    messages.push('Password is required.');\n  } else {\n    var owaspResults = _owaspPasswordStrengthTest2.default.test(password);\n    if (!owaspResults.strong) {\n      messages = messages.concat(owaspResults.errors);\n    }\n  }\n  return messages;\n};\n\nvar appraisePasswordErrors = {\n  minLength: 0,\n  maxLength: 1,\n  repeating: 2,\n  needLowercase: 3,\n  needUppercase: 4,\n  needNumber: 5,\n  needCharacter: 6\n};\n\n/* A wrapper for awasp tests that returns this\n * {\n *   errors              : [],\n *   failedTests         : [],\n *   requiredTestErrors  : [],\n *   optionalTestErrors  : [],\n *   passedTests         : [ 0, 1, 2, 3, 4, 5, 6 ],\n *   isPassphrase        : false,\n *   strong              : true,\n *   optionalTestsPassed : 4\n * }\n */\nvar appraisePasswordExtra = function appraisePasswordExtra(password) {\n  return _owaspPasswordStrengthTest2.default.test(password);\n};\n\n/* Tests for the presense of an accountID.\n *  Only checks if it's empty.\n *  TODO: Check if the account actually exists.\n */\nvar appraiseAccountId = function appraiseAccountId(accountId) {\n  var messages = [];\n  if ((0, _validator.isEmpty)(accountId)) {\n    messages.push('AccountId is required.');\n  }\n  return messages;\n};\n\n/* Validates multiple options. Pass in an object with one of the following:\n * email: {string} validates an email (or empty}\n * displayName; {string} checks for empty\n * password: {string} validates a password\n * accountId: {string} validates the accountId\n * @returns: an object (see validator object below)\n */\nvar appraiseThese = function appraiseThese(what) {\n  var appraised = {\n    success: true, // Did all tests pass\n    tested: [], // Which tests where done? Check this to make sure things were passed in correctly.\n    errors: {} };\n  if ('email' in what) {\n    appraised.tested.push('email');\n    var messages = appraiseEmail(what.email);\n    if (messages && messages.length > 0) {\n      appraised.success = false;\n      appraised.errors.email = messages;\n    }\n  }\n  if ('password' in what) {\n    appraised.tested.push('password');\n    var _messages = appraisePassword(what.password);\n    if (_messages && _messages.length > 0) {\n      appraised.success = false;\n      appraised.errors.password = _messages;\n    }\n  }\n  if ('displayName' in what) {\n    appraised.tested.push('displayName');\n    var _messages2 = appraiseDisplayName(what.displayName);\n    if (_messages2 && _messages2.length > 0) {\n      appraised.success = false;\n      appraised.errors.displayName = _messages2;\n    }\n  }\n  if ('accountId' in what) {\n    appraised.tested.push('accountId');\n    var _messages3 = appraiseAccountId(what.accountId);\n    if (_messages3 && _messages3.length > 0) {\n      appraised.success = false;\n      appraised.errors.accountId = _messages3;\n    }\n  }\n  return appraised;\n};\n\n/* Tests for the presense of a post message.\n *  Only checks if it's empty.\n *  Here for future functionality.\n */\nvar appraisePostMessage = function appraisePostMessage(postMessage) {\n  var messages = [];\n  if (!postMessage || (0, _validator.isEmpty)(postMessage)) {\n    messages.push('A message is required.');\n  }\n  return messages;\n};\n\n/* Tests for the presense of a post subject.\n *  Runs no checks.\n *  Here for future functionality.\n */\n/* eslint-disable no-unused-vars */\nvar appraisePostSubject = function appraisePostSubject(postSubject) {\n  return [];\n};\n/* eslint-enable no-unused-vars */\n\nexports.appraiseThese = appraiseThese;\nexports.appraiseEmail = appraiseEmail;\nexports.appraiseDisplayName = appraiseDisplayName;\nexports.appraisePassword = appraisePassword;\nexports.appraisePasswordExtra = appraisePasswordExtra;\nexports.appraisePasswordErrors = appraisePasswordErrors;\nexports.appraiseAccountId = appraiseAccountId;\nexports.appraisePostSubject = appraisePostSubject;\nexports.appraisePostMessage = appraisePostMessage;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/shared/helpers/appraise.js\n// module id = 19\n// module chunks = 0\n//# sourceURL=webpack:///./src/shared/helpers/appraise.js?");

/***/ },
/* 20 */
/***/ function(module, exports) {

	eval("module.exports = require(\"validator\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"validator\"\n// module id = 20\n// module chunks = 0\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ },
/* 21 */
/***/ function(module, exports) {

	eval("module.exports = require(\"owasp-password-strength-test\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"owasp-password-strength-test\"\n// module id = 21\n// module chunks = 0\n//# sourceURL=webpack:///external_%22owasp-password-strength-test%22?");

/***/ },
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _dotenv = __webpack_require__(24);\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nvar _requireEnvironmentVariables = __webpack_require__(25);\n\nvar _requireEnvironmentVariables2 = _interopRequireDefault(_requireEnvironmentVariables);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* 'As early as possible in your application, require and configure dotenv.'\n *   - https://www.npmjs.com/package/dotenv\n *\n * However, we aren't going to load these in production as it could lead to sloppy deploys.\n */\nif (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {\n  _dotenv2.default.load();\n} else {\n  _dotenv2.default.load();\n}\n\n/* If any of the environment variables(process.env.REDIS_URL) don't exist,\n *   the process exits with code 400.\n * https://github.com/bjoshuanoah/require-environment-variables\n */\n(0, _requireEnvironmentVariables2.default)(['REDIS_URL', 'API_SERVER_PORT', 'MAIN_SERVER_PORT', 'ACCOUNT_PEPPER_1', 'ACCOUNT_ENCRYPT_CURRENT_PEPPER', 'IDIER_WORKER_ID']);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/environment.js\n// module id = 23\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/environment.js?");

/***/ },
/* 24 */
/***/ function(module, exports) {

	eval("module.exports = require(\"dotenv\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"dotenv\"\n// module id = 24\n// module chunks = 0\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ },
/* 25 */
/***/ function(module, exports) {

	eval("module.exports = require(\"require-environment-variables\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require-environment-variables\"\n// module id = 25\n// module chunks = 0\n//# sourceURL=webpack:///external_%22require-environment-variables%22?");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redis = __webpack_require__(27);\n\nvar _redis2 = _interopRequireDefault(_redis);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar REDIS_URL = process.env.REDIS_URL;\n\n/* Connect to redis */\nvar redisClient = _redis2.default.createClient(REDIS_URL);\n\nredisClient.on('error', function redisErrorReport(err) {\n  console.log('Redis connection error ' + err);\n});\n\nexports.default = redisClient;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/redisConnect.js\n// module id = 26\n// module chunks = 0\n//# sourceURL=webpack:///./src/config/redisConnect.js?");

/***/ },
/* 27 */
/***/ function(module, exports) {

	eval("module.exports = require(\"redis\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"redis\"\n// module id = 27\n// module chunks = 0\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ },
/* 28 */
/***/ function(module, exports) {

	eval("module.exports = require(\"connect-redis\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"connect-redis\"\n// module id = 28\n// module chunks = 0\n//# sourceURL=webpack:///external_%22connect-redis%22?");

/***/ }
/******/ ]);