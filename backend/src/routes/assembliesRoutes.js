import { Router } from 'express';
import { getAssemblies } from '../controllers/assembliesController.js';

const router = Router();

router.get('/', getAssemblies);

export default router;
