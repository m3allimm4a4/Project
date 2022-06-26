const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./shared/errors/appError');
const globalErrorHandler = require('./middlewares/errorMiddlewares');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');

const app = express();

//! Global Middlewares

//Serving static files
app.use(express.static('./public'));

//Seurity HTTP headers
app.use(helmet());

//Logging HTTP requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

//Data sanitization
app.use(mongoSanitize());
app.use(xss());

//Prevent parameter pollution
app.use(hpp({ whitelist: [] }));

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Routes
app.get('/', (req, res) => {
  res.status(200).render('base', { tour: 'The Forest Hicker', user: 'Bechara' });
});

app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
