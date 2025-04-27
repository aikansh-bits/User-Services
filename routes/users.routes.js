import express from 'express';
import { signup, login, getUser, updateUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUser/:userId', getUser);
router.put('/updateUser/:userId', updateUser);

export default router;
