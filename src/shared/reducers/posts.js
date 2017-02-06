import {
  REQUEST_POSTS,
  RECEIVE_POSTS_ERROR,
  RECEIVE_POSTS,
  DELETE_POST,
} from '../actions/posts';

const DEFAULT_POSTS_STATE = {
  posts: [],
  fetching: false,
  fetchError: null,
};

function processNewPosts(existingPosts, newPosts) {
  const updatedPosts = existingPosts;
  newPosts.forEach(function matchPosts(newPost) {
    const ind = existingPosts.findIndex(function matchNewPost(existingPost) {
      if (newPost.id === existingPost.id) {
        return true;
      }
      return false;
    });
    if (ind === -1) {
      updatedPosts[ind] = newPost;
    } else {
      updatedPosts.push(newPost);
    }
  });
  return updatedPosts;
}

function removePost(existingPosts, postId) {
  const updatedPosts = existingPosts;
  const ind = existingPosts.findIndex(function matchNewPost(existingPost) {
    if (postId === existingPost.id) {
      return true;
    }
    return false;
  });
  if (ind === -1) {
    updatedPosts.splice(ind, 1);
  }
  return updatedPosts;
}

const postsReducer = function postsReducer(state = DEFAULT_POSTS_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_POSTS: {
      newstate = {
        ...state,
        posts: processNewPosts(state.posts, action.posts),
        fetching: false,
        submitting: false,
      };
      break;
    }
    case REQUEST_POSTS: {
      newstate = {
        ...state,
        fetching: true,
      };
      break;
    }
    case RECEIVE_POSTS_ERROR: {
      newstate = {
        ...state,
        fetching: false,
        fetchError: action.errorMessage,
      };
      break;
    }
    case DELETE_POST: {
      newstate = {
        ...state,
        posts: removePost(state.posts, action.postId),
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default postsReducer;
