import express from "express";
import config from "./config";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import publicRoute from "./routes/publicRoute";
import i18n from "i18n";
import routes from "./routes";
import httpContext from 'express-http-context';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(i18n.init);
app.get('/healthz', (req, res) => {
  res.send('OK')
})
app.use(httpContext.middleware)

publicRoute(app);
routes(app);

i18n.configure({
  locales: ['en', 'vn'],
  directory: __dirname + '/locales',
  defaultLocale: config.server.default_locale,
});

app.listen(config.server.port, () => {
  const connectionStr = `${config.database.host}/${config.database.db_name}?retryWrites=true&w=majority&readPreference=secondaryPreferred`;
  mongoose
    .connect(connectionStr, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => console.log(JSON.stringify(err.reason)));

  const db = mongoose.connection;
  db.on('error', err => {
    console.error('> Error occurred from the database');
    console.error(err);
  });
  db.once('open', () => {
    console.log('> Connected to database successfully');
  });

  app.use((err, req, res, next) => {
    if (err.name === "AppError") {
      const message = {
        data: '',
        message: err.message,
        code: err?.code | 400
      };
      return res.status(err?.code | 400).json(message);
    }
    return res.status(err?.statusCode | err?.code | 500).json();
  })

})