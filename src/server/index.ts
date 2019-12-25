// eslint-disable-next-line @typescript-eslint/triple-slash-reference,spaced-comment
/// <reference path="../@types/global.d.ts" />

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

import next from 'next';
import express from 'express';

import { sessionConfig, port } from './config';
import { nextDevRouter, authRouter } from './routers';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
nextApp.prepare().then(() => {
  let server;
  (async () => {
    const app = express();
    app.enable('trust proxy');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(sessionConfig);

    if (dev) {
      app.use(nextDevRouter(handle));
    }

    app.use('/session', (req, res)=>{
      res.send(req.session?.tokenData)
    })
    app.use('/auth', authRouter(app));

    app.all('*', (req, res) => {
      return handle(req, res);
    });

    https
      .createServer(
        {
          key: fs.readFileSync(path.join(__dirname, '/certs/server.key')),
          cert: fs.readFileSync(path.join(__dirname, '/certs/server.cert')),
        },
        app
      )
      .listen(3001, () => {
        console.log(
          `> Ready on https://localhost:${port}, check its /.well-known/openid-configuration`
        );
      });
  })().catch(err => {
    if (server && server.listening) server.close();
    console.error(err);
    process.exitCode = 1;
  });
});
