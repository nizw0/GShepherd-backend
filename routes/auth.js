import express from 'express';
import passport from 'passport';
import { checkAuth, login, logout } from '../controllers/auth';

const AuthRoute = express.Router();

AuthRoute.get('/', checkAuth);
AuthRoute.post('/login', passport.authenticate('local'), login);
AuthRoute.post('/logout', logout);

export default AuthRoute;
