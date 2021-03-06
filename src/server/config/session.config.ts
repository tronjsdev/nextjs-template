import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient(process.env.REDIS_URL as any);

redisClient.on('error', e => {
  console.error('redis connection error', e);
});

export const sessionConfig = session({
  name: process.env.SESSION_COOKIE_NAME,
  secret: 'keyboard cat',
  // Forces the session to be saved back to the session store,
  // even if the session was never modified during the request.
  // Should set to false if using a store
  resave: false,
  saveUninitialized: false,
  // If true, force the session identifier cookie to be set on every response,
  // this can no need to use if using redis store with ttl option
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: new RedisStore({
    client: redisClient,
    // Session expires will be reset on every users interact with the server. The session will be lost when browser get closed
    //ttl: 24 * 60 * 60, // 1 day (ttl means Time To Live, in second)
  }),
});
