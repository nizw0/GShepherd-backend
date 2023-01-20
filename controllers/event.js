import express from 'express';
import { Event, getEventModel, VoteEvent } from '../models/event';
import { checkObjectId } from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createEvent(req, res) {
  const { category } = req.body;
  const model = getEventModel(category);
  if (model === null) {
    return res.status(400).end();
  }

  const event = await model
    .create(req.body)
    .catch((err) => {
      return res.status(400).end();
    })
    .then((data) => {
      if (!(data instanceof model)) return res.status(404).end();
      return data;
    });
  event
    .save()
    .catch((err) => {
      return res.status(500).end();
    })
    .then((data) => {
      if (!(data instanceof model)) return res.status(404).end();
      return res.json(data);
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
export async function getAllEvents(req, res) {
  await Event.find({})
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
export async function updateEvent(req, res) {
  const { id } = req.params;
  const { category } = req.body;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  const model = getEventModel(category);

  await model.findByIdAndUpdate(id, req.body)
    .catch((err) => {
      console.log(err);
      return res.status(500).end();
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
export async function deleteEvent(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Event.findByIdAndDelete(id)
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      if (data === null) return res.status(404).end();
      return res.json({ msg: 'success' });
    });
}
