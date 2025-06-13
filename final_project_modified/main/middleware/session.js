
import session from 'express-session'
import {RedisStore} from "connect-redis"
import redisClient from '../redis_db_config/redis.js'
import dotenv from 'dotenv';

dotenv.config();
// await redisClient.connect();

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sessionID',
  rolling: true, // resets the cookie maxAge on every response
  cookie: {
      secure: process.env.NODE_ENV === 'production', //if true only transmits the cookie via https protocol
      httpOnly: true, // if true prevents client side js from reading the cookie
      sameSite: 'lax', // CSRF protection
      maxAge: 1000 * 60 * 30 // session time in milliseconds (30 mins)
  }
})