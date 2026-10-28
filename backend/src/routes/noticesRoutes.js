import { Router } from 'express';
import {
  getNotices,
  getNoticeById,
  markNoticeRead,
  markAllNoticesRead,
  createNotice
} from '../controllers/noticesController.js';

const router = Router();

router.get('/', getNotices);
router.post('/', createNotice);
router.post('/mark-all-read', markAllNoticesRead);
router.get('/:id', getNoticeById);
router.patch('/:id/read', markNoticeRead);

export default router;
