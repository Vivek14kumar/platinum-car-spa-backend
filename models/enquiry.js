import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Contacted", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Enquiry", enquirySchema);
