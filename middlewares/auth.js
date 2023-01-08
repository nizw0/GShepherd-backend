import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { Record } from '../models/record';
import Room from '../models/room';
import User from '../models/user';
import checkObjectId from '../utils';

export function initAuth() {
  passport.use(new Strategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function eventAuthLayer(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end();
  const user = req.user;

  const method = req.method;
  const path = req.url.substring(1);
  const id = req.baseUrl.substring(1);

  switch (method) {
    case 'GET':
    case 'POST':
      break;
    case 'PUT':
    case 'DELETE': {
      const isValid = checkObjectId(id);
      if (!isValid) return res.status(400).end();

      const room = await Room.findById(id)
        .catch((err) => {
          return res.status(500).end();
        })
        .then((data) => {
          return data;
        });
      if (
        !(room instanceof Room) ||
        !room.admins.includes(user.id) ||
        room.createdBy !== user.id
      ) {
        return res.status(400).end();
      }
      break;
    }
    default:
      return res.status(405).end();
  }
  next();
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function recordAuthLayer(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end();
  const user = req.user;

  const method = req.method;
  const path = req.url.substring(1);
  const id = req.baseUrl.substring(1);

  switch (method) {
    case 'GET':
    case 'POST':
      break;
    case 'PUT':
    case 'DELETE': {
      const isValid = checkObjectId(id);
      if (!isValid) return res.status(400).end();

      const record = await Record.findById(id)
        .catch((err) => {
          return res.status(500).end();
        })
        .then((data) => {
          return data;
        });
      if (record.userId !== user.id) return res.status(400).end();
      break;
    }
    default:
      return res.status(405).end();
  }
  next();
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function roomAuthLayer(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end();
  const user = req.user;

  const method = req.method;
  const path = req.url.substring(1);
  const id = req.baseUrl.substring(1);

  switch (method) {
    case 'GET':
    case 'POST':
      break;
    case 'PUT':
    case 'DELETE': {
      const isValid = checkObjectId(id);
      if (!isValid) return res.status(400).end();

      const room = await Room.findById(id)
        .catch((err) => {
          return res.status(500).end();
        })
        .then((data) => {
          return data;
        });
      if (
        !(room instanceof Room) ||
        !room.admins.includes(user.id) ||
        room.createdBy !== user.id
      ) {
        return res.status(400).end();
      }
      break;
    }
    default:
      return res.status(405).end();
  }
  next();
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function userAuthLayer(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).end();
  const user = req.user;
  const id = req.baseUrl.substring(1);
  if (user.id !== id) return res.status(403).end();
  next();
}
