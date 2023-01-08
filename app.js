import MongoStore from 'connect-mongo';
import express from 'express';
import passport from 'passport';
import connectDB from './database';
import { initAuth } from './middlewares/auth';
import CORS from './middlewares/cors';
import Session from './middlewares/session';
import getRouter from './routes';

const appURI = 'http://localhost:3000';
const appPort = 3000;
const mongoURI =
  'mongodb://gsadmin:THISISNOTACUTEGSHEPHERD@139.162.39.223:27017/gshepherd';

const app = express();
const router = getRouter();

await connectDB(mongoURI).catch((err) => {
  return;
});
const store = MongoStore.create({
  mongoUrl: mongoURI,
  ttl: 7 * 24 * 60 * 60,
  collectionName: 'session',
});
initAuth();

app.use(CORS(appURI));
app.use(Session('GSHEPHERD', store));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(router);
app.listen(appPort, () => {
  console.log(`Server is up on port ${appPort}`);
});
