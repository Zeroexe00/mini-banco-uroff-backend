import express from 'express';
import auth from './auth.routes';
import transactions from './transactions.routes';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to test API - 👋',
  });
});

router.use(auth);
router.use(transactions);

export default router;
