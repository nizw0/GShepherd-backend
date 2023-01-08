import express from 'express';
import Room from '../models/room';
import checkObjectId from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createRoom(req, res) {
  const room = await Room.create(req.body);
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
    .catch((err) => res.status(404).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllRooms(req, res) {
  await Room.find({})
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateRoom(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Room.updateOne({ id }, req.body)
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteRoom(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Room.deleteOne({ id })
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}
