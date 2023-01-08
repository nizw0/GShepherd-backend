import express from 'express';
import passport from 'passport';
import {
  eventAuthLayer,
  recordAuthLayer,
  roomAuthLayer,
  userAuthLayer,
} from '../middlewares/auth';
import AuthRoute from './auth';
import EventRoute from './event';
import RecordRoute from './record';
import RoomRoute from './room';
import UserRoute from './user';

/**
 * @returns {express.Router}
 */
export default function getRouter() {
  /**
   * @type {express.Router}
   */
  const router = new express.Router();

  router.use('/auth', AuthRoute);
  router.use('/event', eventAuthLayer, EventRoute);
  router.use('/record', recordAuthLayer, RecordRoute);
  router.use('/room', roomAuthLayer, RoomRoute);
  router.use('/user', userAuthLayer, UserRoute);
  router.use('/', (req, res) => {
    return res.end();
  });

  return router;
}
