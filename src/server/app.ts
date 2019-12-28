/* eslint-disable @typescript-eslint/camelcase */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference,spaced-comment
/// <reference path="../@types/global.d.ts" />

import next from 'next';
import express from 'express';
import passport from 'passport';
import { Issuer } from 'openid-client';

import { sessionConfig } from './config';
import { nextDevRouter, authRouter } from './routers';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const appPromise = async () => {
  const identixIssuer = await Issuer.discover(process.env.IDENTIX_OAUTH2_SERVER_ENDPOINT as any);
  await nextApp.prepare();
  const app = express();
  //app.enable('trust proxy');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.locals.identixIssuer = identixIssuer;

  if (dev) {
    app.use(nextDevRouter(handle));
  }

  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', authRouter(app));

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // express error handler
  /*app.use((err, req, res, _next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
  });*/

  return app;
};

export { appPromise };
