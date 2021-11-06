import express from 'express';

import {
  deposit,
  withdraw,
  transfer,
  getTransactions
} from '../controllers/TransactionController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Hi from transactions',
  });
});

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/transfer', transfer);
router.get('/get-transactions', getTransactions);


export default router;
