import express from 'express';
import { reportBug } from '../controllers/bug.controllers.js';

const router = express.Router();

router.post('/report-bug', reportBug);

export default router;