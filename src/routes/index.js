import express from 'express';
import auth from './auth.routes';
// import cors from '../middlewares/cors';

const router = express.Router();
// cors(router);
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to test API - 👋',
  });
});

router.use(auth);

// eslint-disable-next-line eol-last
export default router;
