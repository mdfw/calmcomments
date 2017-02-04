import { Router } from 'express';
import {
  getPostEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
} from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();
routes.get('/posts/:postId', getPostEndpoint);
routes.post('/posts', ensureLoggedIn(), addPostEndpoint);
routes.put('/posts/:postId', ensureLoggedIn(), updatePostEndpoint);
routes.put('/posts/', ensureLoggedIn(), updatePostEndpoint);
routes.delete('/posts/:postId', ensureLoggedIn(), removePostEndpoint);

export default routes;
