// controllers/bookingController.js
import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status (Completed / Cancelled)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // expecting { status: "Completed" } or { status: "Cancelled" }
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (["Pending", "Completed", "Cancelled"].includes(status)) {
      booking.status = status;
      await booking.save();
      return res.status(200).json({ message: `Booking marked as ${status}`, booking });
    }

    res.status(400).json({ message: "Invalid status" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
