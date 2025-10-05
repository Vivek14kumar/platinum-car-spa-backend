import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  updateBookingStatus
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.put("/:id/status", updateBookingStatus);

export default router;
