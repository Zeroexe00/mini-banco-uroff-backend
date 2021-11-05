/* eslint-disable no-console */
import express from 'express';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
// import { notFound, errorHandler } from './errorMiddlewares';
import routes from './routes';
const cors = require('cors')

const app = express();
// app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Hi!! ✨'
  });
});

app.use('/api', routes);

// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
