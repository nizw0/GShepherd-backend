import express from 'express';
import Room from '../models/room';
import { checkObjectId, getRandomCode } from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createRoom(req, res) {
  const id = req.user.id;
  let data = req.body;
  data.admins = [id];
  data.createdBy = id;
  data.code = getRandomCode();
  const room = await Room.create(data);
  await room
    .save()
    .catch((err) => res.status(500).json(room.toJSON()))
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getRoom(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Room.findById(id)
    .catch((err) => {
      return res.status(500).end();
    })
    .then((data) => {
      return res.json(data);
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllRooms(req, res) {
  await Room.find({})
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      if (data === null) return res.status(404).end();
      return res.json(data);
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateRoom(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Room.findByIdAndUpdate(id, req.body)
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      if (data === null) return res.status(404).end();
      return res.json({ msg: 'success' });
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteRoom(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Room.findByIdAndDelete(id)
    .catch((err) => {
      return res.status(500).end();
    })
    .then((data) => {
      if (data === null) return res.status(404).end();
      return res.json({ msg: 'success' });
    });
}
