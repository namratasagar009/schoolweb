import { Router } from 'express';
import { getSubjects, getSubjectById } from '../controllers/subjectsController.js';

const router = Router();

router.get('/', getSubjects);
router.get('/:id', getSubjectById);

export default router;
