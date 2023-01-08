import express from 'express';
import { Event, getEventModel, VoteEvent } from '../models/event';
import checkObjectId from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createEvent(req, res) {
  const { category } = req.body;
  const Model = getEventModel(category);
  if (Model === null) {
    return res.status(400);
  }
  const event = await Model.create(req.body);
  await event
    .save()
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
export async function getEvent(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Event.findById(id)
    .catch((err) => res.status(404).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllEvents(req, res) {
  await Event.find({})
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateEvent(req, res) {
  const { id } = req.params;
  const { category, roomId, name } = req.body;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Event.updateOne({ id }, { category, roomId, name })
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteEvent(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Event.deleteOne({ id })
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}
