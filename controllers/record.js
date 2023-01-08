import express from 'express';
import { getRecordModel, Record } from '../models/record';
import { checkObjectId } from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createRecord(req, res) {
  const { category } = req.body;
  const model = getRecordModel(category);
  if (model === null) {
    return res.status(400).end();
  }

  const record = await model
    .create(req.body)
    .catch((err) => {
      return res.status(400).end();
    })
    .then((data) => {
      if (!(data instanceof model)) return res.status(404).end();
      return data;
    });
  record
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
export async function getRecord(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Record.findById(id)
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
export async function getAllRecords(req, res) {
  await Record.find({})
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
export async function updateRecord(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  const model = await Record.findById(id)
    .catch(() => {
      return res.status(500).end();
    })
    .then((data) => {
      if (!(data instanceof Record)) return res.status(404).end();
      return data;
    });

  await model
    .update(req.body)
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
export async function deleteRecord(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Record.findByIdAndDelete(id)
    .catch((err) => {
      res.status(500).end();
    })
    .then((data) => {
      if (data === null) return res.status(404).end();
      return res.json({ msg: 'success' });
    });
}
