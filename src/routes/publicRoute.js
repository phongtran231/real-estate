import { AuthHandler } from '../components/auth/handler';
import { loginValidate } from '../components/auth/validate';
import { LocationHandler } from '../components/location/handler';
import { locale } from '../middleware/locale.middleware';
import { validator } from '../middleware/validator.middleware';

require('express-group-routes');

export default app => {
  app.group('/auth', auth => {
    const handler = new AuthHandler();
    auth.post('/login', loginValidate, [locale, validator], handler.login.bind(handler));
  });

  app.group('/location', location => {
    const handler = new LocationHandler();
    location.get('/city', handler.getCity.bind(handler));
    location.get('/province-by-city/:cityId', handler.getProvinceByCityId.bind(handler));
    location.get('/ward-by-province/:provinceId', handler.getWardByProvicneId.bind(handler));
  });
}
