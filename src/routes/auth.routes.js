import express from 'express';

import {
  register,
  login
} from '../controllers/AuthController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Hi from auth',
  });
});

router.post('/register', register);

router.post('/login', login);

export default router;
