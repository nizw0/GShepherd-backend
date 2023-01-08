import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from '../models/user';
import checkObjectId from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createUser(req, res) {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }
    passport.authenticate('local')(req, res, () => {
      User.findOne({ username }).then(() => {
        return res.json({ msg: 'success' });
      });
    });
  });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getUser(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await User.findById(id)
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      if (!(data instanceof User)) {
        return res.status(404).end();
      }
      res.json(data);
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllUsers(req, res) {
  await User.find({})
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      res.json(data);
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateUser(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();
  await User.updateOne({ id }, req.body)
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      res.json(data);
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteUser(req, res) {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(404).end();
  await User.deleteOne({ id })
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}
