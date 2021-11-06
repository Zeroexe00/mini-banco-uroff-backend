import express from 'express';
import auth from './auth.routes';
import transactions from './transactions.routes';
// import cors from '../middlewares/cors';

const router = express.Router();
// cors(router);
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to test API - 👋',
  });
});

router.use(auth);
router.use(transactions);

// eslint-disable-next-line eol-last
export default router;
