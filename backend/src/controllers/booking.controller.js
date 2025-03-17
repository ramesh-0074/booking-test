import generateSlots from "../config/generateSlots.js";
import Booking from "../models/booking.model.js";

export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const bookedSlots = await Booking.find({ date }).select("timeSlot");
    const availableSlots = generateSlots().filter(
      (slot) => !bookedSlots.some((booking) => booking.timeSlot === slot)
    );

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { name, phone, date, timeSlot } = req.body;
    if (!name || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Booking.findOne({ date, timeSlot });
    if (existing) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    const booking = new Booking({ name, phone, date, timeSlot });
    await booking.save();
    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
