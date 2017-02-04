import { Router } from 'express';
import { addAccountEndpoint, getAccountInfoEndpoint } from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();

routes.route('/accounts')
  .post(addAccountEndpoint);

routes.get('/accounts', ensureLoggedIn(), getAccountInfoEndpoint);

export default routes;
