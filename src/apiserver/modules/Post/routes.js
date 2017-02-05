import { Router } from 'express';
import {
  getPostsEndpoint,
  getSinglePostEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
} from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();
// Get a specific post
routes.get('/posts/:postId', getSinglePostEndpoint);
// Get all posts
routes.get('/posts', getPostsEndpoint);
// Add a post
routes.post('/posts', ensureLoggedIn(), addPostEndpoint);
// Update a post with the id in the url
routes.put('/posts/:postId', ensureLoggedIn(), updatePostEndpoint);
// Update a post with the postId in the body
routes.put('/posts/', ensureLoggedIn(), updatePostEndpoint);
// Delete a post
routes.delete('/posts/:postId', ensureLoggedIn(), removePostEndpoint);

export default routes;
