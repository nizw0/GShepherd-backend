import bcrypt from 'bcrypt';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from '../models/user';
import { checkObjectId } from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createUser(req, res) {
  const { password } = req.body;
  const user = new User(req.body);
  user.validate().catch((err) => {
    return res.status(400).json({ msg: err.message });
  });
  user.setPassword(password);

  User.register(user, password).then((data) => {
    passport.authenticate('local')(req, res, () => {
      User.findById(user.id)
        .catch((err) => {
          console.log(err);
          return res.status(500).end();
        })
        .then(() => {
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
  const { id, password } = req.params;
  const isValid = checkObjectId(id);
  const data = req.body;
  if (!isValid) return res.status(404).end();

  const user = await User.findById(id);
  if (!(user instanceof User)) return res.status(404).end();

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    data.password = User.encryptPassword(password);
  }

  await User.findByIdAndUpdate(id, data)
    .catch((err) => {
      res.status(500).end();
    })
    .then(() => {
      user.changePassword(password, data.password);
    });
  return res.json({ msg: 'success' });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteUser(req, res) {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(404).end();

  User.findByIdAndDelete(id)
    .catch((err) => res.status(500).end())
    .then((data) => res.json({ msg: 'success' }));
}
