import TTimer from '../Timer';

const models = require('../../models');

const Post = models.Post;
const Account = models.Account;

/* Builds the where clause for the posts search.
 * If there is a user account, looks for all of their posts.
 * If not, just filters by date
 * TODO: Add some filtering by date/number for pagination
 */
const buildGetPostWhere = (userAccountId) => {
  const ttimer = new TTimer();

  const lastTime = ttimer.lastTimestamp;
  if (userAccountId) {
    return ({
      $or: [
        { AccountId: userAccountId },
        {
          createdAt: {
            $lt: new Date(lastTime),
          },
        },
      ],
    });
  }
  return ({
    createdAt: {
      $lt: new Date(lastTime),
    },
  });
};

/* Get all posts. Filters by the release date.
 */
const getPostsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  let accountId = null;
  if (req.user) {
    accountId = req.user.id;
  }
  const whereClause = buildGetPostWhere(accountId);
  console.log('Where clause');
  console.dir(whereClause);
  Post.findAll({
    where: whereClause,
    include: [{
      model: Account,
      attributes: ['displayName'],
    }],
    attributes: ['id', 'message', 'edited', 'createdAt', 'updatedAt', 'AccountId'],
    limit: 30,
    order: [
      ['createdAt', 'DESC'],
    ],
  })
  .then((items) => {
    if (!items) {
      throw new Error('Post not found');
    }
    res.status(200).json({
      success: true,
      posts: items,
    });
  })
  .catch((err) => {
    res.statusMessage = err.message; // eslint-disable-line no-param-reassign
    res.status(404).end();
  });
};

/* Get a post by id.
 *  @param {number} postId in params
 *  TODO Does not filter by date or id. This is a hole that someone could exploit to get
 *    non-released posts.
 */
const getSinglePostEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const itemId = req.params.postId;
  if (!itemId) {
    res.status(422).json({ success: false, messages: 'No PostId provided.' });
  }
  Post.find(
    {
      where: { id: itemId },
      include: [{
        model: Account,
        attributes: ['displayName'],
      }],
      attributes: ['id', 'message', 'edited', 'createdAt', 'updatedAt', 'AccountId'],
    })
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

/* Get all posts since the datestamp provided. Also gets any posts updated in the time slot.
 */
const getPostsSinceDate = (sinceDateStamp) => { // eslint-disable-line consistent-return
  const ttimer = new TTimer();
  const lastTime = ttimer.lastTimestamp;
  return Post.findAll({
    where: {
      createdAt: {
        $lt: new Date(lastTime),
        $gt: new Date(sinceDateStamp),
      },
      updatedAt: {
        $lt: new Date(lastTime),
        $gt: new Date(sinceDateStamp),
      },
    },
    include: [{
      model: Account,
      attributes: ['displayName'],
    }],
    attributes: ['id', 'message', 'edited', 'createdAt', 'updatedAt', 'AccountId'],
    limit: 30,
    order: [
      ['createdAt', 'DESC'],
    ],
  })
  .then((items) => {
    if (!items) {
      throw new Error('Post not found');
    }
    return items;
  })
  .catch((err) => { // eslint-disable-line arrow-body-style
    return err;
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
    AccountId: accountId,
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
        AccountId: accountId,
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
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
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
        AccountId: accountId,
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
  getPostsEndpoint,
  getSinglePostEndpoint,
  getPostsSinceDate,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
};
