import { Router } from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/studentController.js';

const router = Router();

router.get('/', getStudentProfile);
router.put('/', updateStudentProfile);

export default router;
