import { Router } from 'express';
import studentRoutes from './studentRoutes.js';
import timetableRoutes from './timetableRoutes.js';
import noticesRoutes from './noticesRoutes.js';
import subjectsRoutes from './subjectsRoutes.js';
import homeworkRoutes from './homeworkRoutes.js';
import assembliesRoutes from './assembliesRoutes.js';
import resultsRoutes from './resultsRoutes.js';

const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'S.S. Memorial School Portal API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Resource Routers
apiRouter.use('/student', studentRoutes);
apiRouter.use('/timetable', timetableRoutes);
apiRouter.use('/notices', noticesRoutes);
apiRouter.use('/subjects', subjectsRoutes);
apiRouter.use('/homework', homeworkRoutes);
apiRouter.use('/assemblies', assembliesRoutes);
apiRouter.use('/results', resultsRoutes);

export default apiRouter;
