const models = require('../../models');

const Account = models.Account;

/* Returns either the current account's accountId or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current account can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user account attached
 *  @returns {string} accountId - the accountId to use in searches.
 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
 */
const activeAccountId = function getAccount(req) {
  const currentAccount = req.user;
  const onBehalfOfId = req.body.onBehalfOfId;
  if (onBehalfOfId && onBehalfOfId.length > 0) {
    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
      return onBehalfOfId;
    }
  }
  if (req.user && req.user.id) {
    return req.user.id;
  }
  return null;
};

/* Adds an account to the Accounts database based on the fields passed in.
 * Params needed in body:
 *   @param {string} email - the email address
 *   @param {string} password - the user's password. Must pass owasp tests.
 *   @param {string} displayName - the name to display on the users page.
 */
const addAccountEndpoint = (req, res) => {
  const { email, password, displayName } = req.body;
  // const newAccount = new Account({ email, password, displayName });
  const newAccount = Account.build({
    email: email,
    displayName: displayName,
  });
  newAccount.setPassword(password)
    .then(() => { // eslint-disable-line arrow-body-style
      return newAccount.save();
    })
    .then((createdAccount) => {
      req.login(createdAccount, function loginFailed(error) {
        console.log(`Failed login after creation: ${error}`);
      });
      const cleanedAccount = createdAccount.toJSON();
      res.status(201).json({
        success: true,
        message: 'Successfully Registered',
        account: cleanedAccount,
      });
    })
    .catch((err) => {
      // TODO: this only works on mongoose. Have to dig into the err object to see where to pick up.
      if (err.code === 11000) {
        res.statusMessage = 'Account with that email already exists'; // eslint-disable-line no-param-reassign
        res.status(409).end();
        return;
      }
      let errorMessage = 'Account could not be created.';
      if (err.message) {
        errorMessage = err.message.replace(/(\r\n|\n|\r)/gm, ' ');
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      // TODO: Return errors better. The err object has an errors array that could be parsed.
      res.status(422).send(JSON.stringify({ errors: err.message }));
    });
};

/* Get account info for accountId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the search parameters.
 */
const getAccountInfoEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const accountId = activeAccountId(req);
  if (!accountId) {
    return res.status(422).json({ success: false, message: 'No accountId provided' });
  }
  Account.findById(accountId)
    .then((item) => {
      const cleanedItem = item.toJSON();
      res.status(201).json({
        success: true,
        account: cleanedItem,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

const updateAccountEndpoint = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { addAccountEndpoint, updateAccountEndpoint, getAccountInfoEndpoint };

