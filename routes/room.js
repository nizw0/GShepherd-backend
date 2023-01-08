import express from 'express';
import passport from 'passport';
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from '../controllers/room';

const RoomRoute = express.Router();

RoomRoute.get('/', getAllRooms);
RoomRoute.post('/', createRoom);
RoomRoute.get('/:id', getRoom);
RoomRoute.put('/:id', updateRoom);
RoomRoute.delete('/:id', deleteRoom);

export default RoomRoute;
