import express from 'express';
import { getRecordModel, Record } from '../models/record';
import checkObjectId from '../utils';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createRecord(req, res) {
  const { category } = req.body;
  const model = getRecordModel(category);
  const record = await model.create(req.body);
  await record
    .save()
    .catch((err) => res.status(500).json(record.toJSON()))
    .then((data) => res.json(data));
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
    .catch((err) => res.status(404).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllRecords(req, res) {
  await Record.find({})
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateRecord(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Record.updateOne({ id }, req.body)
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteRecord(req, res) {
  const { id } = req.params;
  const isValid = checkObjectId(id);
  if (!isValid) return res.status(404).end();

  await Record.deleteOne({ id })
    .catch((err) => res.status(500).end())
    .then((data) => res.json(data));
}
