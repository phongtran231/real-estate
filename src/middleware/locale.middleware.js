import i18n from 'i18n';
import config from '../config';

export const locale = (req, res, next) => {
  const lang = req.header('accept-language') || config.server.default_locale;
  i18n.setLocale(lang);
  return next();
}