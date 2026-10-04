// routes/auth.js -- handlers moved to controllers/authController.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// mounted at /api/auth in server.js
router.post('/register', register);
router.post('/login', login);

export default router;