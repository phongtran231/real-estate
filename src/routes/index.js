import { AuthHandler } from '../components/auth/handler';
import { Auth } from '../middleware/auth.middleware';

require('express-group-routes');

export default app => {
  app.use('*', Auth.verifyToken)
  app.group('/auth', auth => {
    const handler = new AuthHandler();
    auth.get('/user-info', handler.getInfo.bind(handler));
  })
}