import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import config from './config';
import { authRoutes, commentRoutes, twitRoutes } from './routes';
import { ErrorHandler } from './handlers';

const app: Application = express();
const apiVersion = config.API_VERSION || 'v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

//routes
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/twits`, twitRoutes);
app.use(`/api/${apiVersion}/comments`, commentRoutes);

//error handler
app.use(ErrorHandler.error);

export default app;
