// routes/users.js -- new in Session 11. Mounted at /api/users.
import express from 'express';
import { listUsers } from '../controllers/authController.js';

const router = express.Router();

router.get('/', listUsers);

export default router;