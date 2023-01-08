import MongoStore from 'connect-mongo';
import session from 'express-session';

/**
 * @param {string} secret
 * @param {MongoStore} store
 * @returns {Session}
 */
export default function sessionLayer(secret, store) {
  return session({
    secret,
    store,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 },
  });
}
