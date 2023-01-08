import express from 'express';
import passport from 'passport';
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecord,
  updateRecord,
} from '../controllers/record';

const RecordRoute = express.Router();

RecordRoute.get('/', getAllRecords);
RecordRoute.post('/', createRecord);
RecordRoute.get('/:id', getRecord);
RecordRoute.put('/:id', updateRecord);
RecordRoute.delete('/:id', deleteRecord);

export default RecordRoute;
