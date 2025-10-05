import express from 'express';
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';

const router = express.Router();

router.post('/', addCustomer);
router.get('/', getCustomers);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;
