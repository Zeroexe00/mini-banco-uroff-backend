import express from 'express';
import routes from './routes';
const cors = require('cors')

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Hi!! ✨'
  });
});

app.use('/api', routes);

module.exports = app;
