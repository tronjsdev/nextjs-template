import express, { Response, Request } from 'express';
import fetch from 'isomorphic-unfetch';

export const authRouter = app => {
  // base = /auth
  const router = express.Router();

  // invoked for any requests passed to this router
  router.use((req, res, next) => {
    // .. some logic here .. like any other middleware
    next();
  });

  router.get('/login', (req, res, next) => {
    res.redirect(
      `https://127.0.0.1:3000/oauth2/auth?client_id=0-0-0-1&response_type=code&scope=openid%20profile%20email%20offline_access&redirect_uri=https://127.0.0.1:3001/auth/cb`
    );
  });

  router.get('/cb', async (req: Request, res, next) => {
    try {
      const { code } = req.query;
      const url = `https://127.0.0.1:3000/oauth2/token`;
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'https://127.0.0.1:3001/auth/cb');
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic MC0wLTAtMTpjb29vb2xfbm9kZWpz`,
        },
        body: params,
      }).then(j => j.json());
      req.session.tokenData = data;
      res.redirect('/session');
    } catch (err) {
      throw new Error(err);
    }
  });

  return router;
};
