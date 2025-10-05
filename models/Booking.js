import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  vehicle: { type: String, required: true },
  service: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
