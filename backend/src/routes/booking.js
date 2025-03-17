import express from 'express';
import { getAvailableSlots, bookAppointment } from '../controllers/booking.controller.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);
router.post('/book', bookAppointment);

export default router;
