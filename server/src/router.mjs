import express from 'express';
import routes from './routes';

const router = express.Router();

const checkAuth = routes.auth.check;
const checkConnection = routes.dashboard.checkConnection;

router.post('/auth', routes.auth.create);
router.post('/logout', routes.auth.remove);

router.post('/actions/:hash', routes.actions.submit);

router.get('/users/me', checkAuth, routes.users.info);
router.get('/users', checkAuth, routes.users.list);
router.post('/users', routes.users.create);
router.post('/users/resetPassword', routes.users.resetPassword);
router.put('/users', checkAuth, routes.users.update);

router.post('/connect', checkAuth, routes.dashboard.connect);

router.get(
  '/dashboard/info',
  checkAuth,
  checkConnection,
  routes.dashboard.info,
);

router.post('/products/test', checkAuth, checkConnection, routes.products.test);

export default router;
