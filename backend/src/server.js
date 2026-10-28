import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/api.js';

const app = express();

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from localhost/any client in dev or with no origin (e.g. mobile/curl)
      callback(null, true);
    },
    credentials: true
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use(requestLogger);

// Mount API Routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to S.S. Memorial School Portal API',
    endpoints: {
      health: '/api/health',
      student: '/api/student',
      timetable: '/api/timetable',
      notices: '/api/notices',
      subjects: '/api/subjects',
      homework: '/api/homework',
      assemblies: '/api/assemblies',
      results: '/api/results'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url} - Endpoint not found`
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`===================================================`);
  console.log(`  S.S. Memorial School Portal Backend Service`);
  console.log(`  Server running at: http://localhost:${config.port}`);
  console.log(`  API Health:       http://localhost:${config.port}/api/health`);
  console.log(`===================================================`);
});

export default app;
