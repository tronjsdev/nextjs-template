/* eslint-disable @typescript-eslint/camelcase */
import express, { Response, Request } from 'express';
import fetch from 'isomorphic-unfetch';
import {
  AuthorizationParameters,
  generators,
  Issuer,
  Strategy,
  StrategyOptions,
} from 'openid-client';
import passport from 'passport';

const LOGIN_URL = '/auth/login';

export const authRouter = app => {
  // base = /auth
  const router = express.Router();

  const client = new app.locals.identixIssuer.Client({
    client_id: process.env.IDENTIX_OAUTH2_CLIENT_ID as string,
    client_secret: process.env.IDENTIX_OAUTH2_CLIENT_SECRET as string,
    redirect_uris: [process.env.IDENTIX_OAUTH2_CLIENT_REDIRECT_URI as string],
    response_types: ['code'],
  });

  const params: AuthorizationParameters = {
    client_id: '0-0-0-1',
    response_type: 'code',
    scope: 'openid profile email',
    redirect_uri: process.env.IDENTIX_OAUTH2_CLIENT_REDIRECT_URI as string,
    nonce: generators.nonce(),
  };
  const options = { client, params };

  const verify = (tokenSet, userInfo, done) => {
    console.log('oidc-client Strategy verify result: ', { tokenSet, userInfo });
    // Here we have options to store the user info in session: save full of the info or just the userid and
    // some other basic info.
    // If just the userid to be saved to the session, then in the `passport.deserializeUser` below we should
    // query the full user info from the db
    const userContext = { tokenSet, userInfo };
    return done(null, userContext);
  };

  passport.use('openid-client', new Strategy(options, verify));

  passport.serializeUser((userContext, done) => {
    done(null, userContext);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  router.use('/login', passport.authenticate('openid-client'));

  router.use(
    '/cb',
    passport.authenticate('openid-client', { failureRedirect: '/error' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  return router;
};
