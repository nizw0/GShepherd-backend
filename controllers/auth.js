import express from 'express';
import passport from 'passport';
import User from '../models/user';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export function checkAuth(req, res) {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ msg: 'unauthenticated' });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function login(req, res) {
  const { username } = req.body;
  await User.findOne({ username }).then((data) => {
    return res.json({ msg: data.id });
  });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function logout(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) return next(err);
    });
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json();
      }
      res.clearCookie('connect.sid', { path: '/' });
      return res.json({ msg: 'success' });
    });
  } else {
    return res.status(400).json({ msg: 'no session exist' });
  }
}
