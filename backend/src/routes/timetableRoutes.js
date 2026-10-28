import { Router } from 'express';
import { getTimetable } from '../controllers/timetableController.js';

const router = Router();

router.get('/', getTimetable);

export default router;
