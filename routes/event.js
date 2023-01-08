import express from 'express';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from '../controllers/event';

const EventRoute = express.Router();

EventRoute.get('/', getAllEvents);
EventRoute.post('/', createEvent);
EventRoute.get('/:id', getEvent);
EventRoute.put('/:id', updateEvent);
EventRoute.delete('/:id', deleteEvent);

export default EventRoute;
