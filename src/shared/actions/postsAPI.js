import fetch from 'isomorphic-fetch';
import {
  receivePosts,
  receivePostsError,
  fetchPosts,
} from './posts';
import { formUpdate, formClear, CREATE_POST_FORM_NAME } from './forms';

// ------- //
// HELPERS //
// ------- //

/* Check that we did not receive an error from api server
 * Returns server error.statusText on non-201 status
 * Returns the server response object on 201 status
 */
function checkAPIReturn(response) {
  if (response.status === 201 || response.status === 200 || response.status === 204) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


// -------- //
// FETCHING //
// -------- //
/* The main fetching api for posts - this is exported */
const fetchPostsAPI = function fetchPostsAPI() {
  return function fetchPostsDispatch(dispatch) {
    const url = '/api/v1/posts';
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function returnPostsData(response) {
      return dispatch(
        receivePosts(response.posts),
      );
    })
    .catch(function receiveError(error) {
      console.log('Fetching error');
      console.dir(error);
      return dispatch(
        receivePostsError(error),
      );
    });
  };
};


// ------ //
// ADDING //
// ------ //


/* Clears the new account data from the store
  */
function dispatchNewPostFormClear(dispatch) {
  return dispatch(
    formClear(CREATE_POST_FORM_NAME),
  );
}
/* The heavy lifting work of adding a post.
 * @param {string} message
 * @param {string=} subject
 * Calls to the api endpoint to create a post. If successful, clears form,
 *   and calls the fetch.
 * TODO: probably better to just insert into the posts array instead of calling back.
 */
const addPostAPI = function addPostAPI(message) {
  return function fetchAddPostDispatch(dispatch) {
    if (!message || message.length === 0) {
      throw new Error('Missing message for post.');
    }
    // Set the submitting flag
    dispatch(formUpdate(CREATE_POST_FORM_NAME, {
      submitting: true,
    }));
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        message: message,
      }),
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispatchNewPostFormClear(dispatch))
    .then(function getUpdatedPosts() {
      return dispatch(
        fetchPosts(),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(formUpdate(CREATE_POST_FORM_NAME, {
        submitting: false,
        submitError: errMsg,
      }));
    });
  };
};

// ------ //
// UPDATING //
// ------ //


/* Clears the new account data from the store
  */
function dispatchEditPostFormClear(dispatch, formName) {
  return dispatch(
    formClear(formName),
  );
}
/* The heavy lifting work of adding a post.
 * @param {string} message
 * @param {string=} subject
 * Calls to the api endpoint to create a post. If successful, clears form,
 *   and calls the fetch.
 * TODO: probably better to just insert into the posts array instead of calling back.
 */
const updatePostAPI = function updatePostAPI(message, postId, formName) {
  return function fetchUpdatePostDispatch(dispatch) {
    if (!message || message.length === 0) {
      throw new Error('Missing message for post.');
    }
    // Set the submitting flag
    dispatch(formUpdate(formName, {
      submitting: true,
    }));
    fetch(`/api/v1/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        message: message,
      }),
    })
    .then(checkAPIReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(dispatchEditPostFormClear(dispatch, formName))
    .then(function getUpdatedPosts() {
      return dispatch(
        fetchPosts(),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(formUpdate(formName, {
        submitting: false,
        submitError: errMsg,
      }));
    });
  };
};

// -------- //
// DELETING //
// -------- //


/* The heavy lifting work of deleting a post.
 * @param {number} postId
 * Calls to the api endpoint to delete a post. If successful, clears form,
 *   and calls the fetch.
 */
const deletePostAPI = function deletePostAPI(postId) {
  return function fetchDeletePostDispatch() {
    if (!postId || postId.length === 0) {
      throw new Error('Missing postId for post.');
    }
    fetch(`/api/v1/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(checkAPIReturn)
    .catch(function submitError(error) {
      const errMsg = error.message;
      console.log(`Could not delete! ${errMsg}`);
    });
  };
};

export { fetchPostsAPI, addPostAPI, updatePostAPI, deletePostAPI };
