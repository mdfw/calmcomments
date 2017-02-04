const models = require('../../models');

const Post = models.Post;

/* Get a post by id.
 * Params needed in req.body:
 *  @param {number} postId req.body.postId OR
 *  @param {number} postId in params
 */
const getPostEndpoint = (req, res) => { // eslint-disable-line consistent-return
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.status(422).json({ success: false, messages: 'No PostId provided.' });
  }
  Post.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new Error('Post not found');
      }
      res.status(200).json({
        success: true,
        posts: item.toJSON(),
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Adds a post to the Post database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} message - the main message body
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for
 */
const addPostEndpoint = (req, res) => {
  const accountId = req.user.id;
  if (!accountId) {
    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  const newPost = Post.build({
    message: req.body.message,
    accountID: accountId,
  });
  newPost.save()
    .then((createdItem) => {
      if (!createdItem) {
        throw new Error('Post could not be created');
      }
      const cleanedPost = createdItem.toJSON();
      res.status(201).json({
        success: true,
        message: 'Successfully created post',
        post: cleanedPost,
      });
    })
    .catch((err) => {
      let errorMessage = 'Post could not be created.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Updates a post
 *  @param {string} message - the main message body
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 */
const updatePostEndpoint = (req, res) => {
  const accountId = req.user.id;
  if (!accountId) {
    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.status(422).json({ success: false, messages: 'No PostId provided.' });
  }
  if (req.body.message.length === 0) {
    res.status(422).json({ success: false, messages: 'Nothing to update.' });
  }
  Post.findOne(
    {
      where: {
        id: itemId,
        accountID: accountId,
      },
    })
  .then(function updateIt(post) {
    if (!post) {
      throw new Error('Post could not be found to update');
    }
    const thePost = post;
    thePost.message = req.body.message;
    thePost.edited = true;
    return thePost.save();
  })
  .then(() => {
    res.status(205).json({
      success: true,
      message: 'Successfully updated post',
    });
  })
  .catch((err) => {
    let errorMessage = 'Post could not be updated.';
    if (err.message) {
      errorMessage = err.message;
    }
    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
    res.status(422).end();
  });
};


/* Removes a post (marks the status to 'removed')
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const removePostEndpoint = (req, res) => {
  const accountId = req.user.id;
  if (!accountId) {
    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.statusMessage = 'No postId provided.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Post.findOne(
    {
      where: {
        id: itemId,
        accountID: accountId,
      },
    })
  .then(function destroyIt(post) {
    return post.destroy();
  })
  .then(() => {
    res.status(204).end();
  })
  .catch((err) => {
    let errorMessage = 'Post could not be removed.';
    if (err.message) {
      errorMessage = err.message;
    }
    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
    res.status(422).end();
  });
};


export {
  getPostEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
};
