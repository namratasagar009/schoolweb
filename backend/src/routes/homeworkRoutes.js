import { Router } from 'express';
import { getHomework, submitHomework } from '../controllers/homeworkController.js';

const router = Router();

router.get('/', getHomework);
router.patch('/:id/submit', submitHomework);

export default router;
