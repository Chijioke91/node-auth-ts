import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import authRoutes from './routes/auth';

const port = process.env.PORT || 8080;

// let's initialize our express app
const app = express();

// let's parse our incoming request with JSON payload using the express.json() middleware
app.use(express.json());

// add our routes
app.use('/api/v1/auth', authRoutes);

// catch all route
app.all('*', async () => {
  throw new NotFoundError();
});

// add our error handler middleware
app.use(errorHandler);

// listen to our express app
app.listen(port, () => {
  console.log(`Our Application is up and running on port ${port}`);
});
