/* eslint-disable @typescript-eslint/camelcase */
import express, { Response, Request } from 'express';
import {
  AuthorizationParameters,
  generators,
  Issuer,
  Strategy,
  StrategyOptions,
} from 'openid-client';
import passport from 'passport';

import { ensureLoggedIn } from '../middlewares';

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
    client_id: process.env.IDENTIX_OAUTH2_CLIENT_ID as string,
    redirect_uri: process.env.IDENTIX_OAUTH2_CLIENT_REDIRECT_URI as string,
    response_type: 'code',
    scope: 'openid profile email',
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
    console.log('passport.deserializeUser(', obj);
    done(null, obj);
  });

  router.use(
    '/login',
    (req, res, next) => {
      const { nextUrl } = req.query;
      req.session.nextUrl = nextUrl;
      next();
    },
    passport.authenticate('openid-client')
  );

  router.use(
    '/cb',
    passport.authenticate('openid-client', { failureRedirect: '/error' }),
    (req, res) => {
      const { nextUrl } = req.session;
      res.redirect(nextUrl || '/');
    }
  );
  /*router.use('/cb', (req, res, next) => {
    const optionsx = { successRedirect: '/', failureRedirect: '/login' };
    passport.authenticate('openid-client', optionsx, (err, user, info) => {
      if (err) {
        console.log(`ERROR: ${err.error}: ${err.error_description}`);
        return next(err);
      }
      if (!user) return res.redirect(optionsx.failureRedirect);
      return next();
    })(req, res, next);
  });*/

  router.use('/profile', ensureLoggedIn(), (req, res, next) => {
    res.send(req.user);
  });

  return router;
};
