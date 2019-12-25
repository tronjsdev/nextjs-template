import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export const sessionConfig = session({
  name: process.env.SESSION_COOKIE_NAME,
  secret: 'keyboard cat',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request. Should set to false if using a store
  saveUninitialized: false,
  rolling: true, // Force the session identifier cookie to be set on every response, this can no need to use if using redis store with ttl option
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: new RedisStore({
    client: redisClient,
    // Session expires will be reset on every users interact with the server. The session will be lost when browser get closed
    // ttl: 24 * 60 * 60, // 1 day (ttl means Time To Live, in second)
  }),
});
