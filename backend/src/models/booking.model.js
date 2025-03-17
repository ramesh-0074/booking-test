import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  timeSlot: String
});

export default mongoose.model('Booking', bookingSchema);