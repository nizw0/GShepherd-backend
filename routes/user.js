import express from 'express';
import passport from 'passport';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user';

const UserRoute = express.Router();

UserRoute.get('/', getAllUsers);
UserRoute.post('/', createUser);
UserRoute.get('/:id', getUser);
UserRoute.put('/:id', updateUser);
UserRoute.delete('/:id', deleteUser);

export default UserRoute;
