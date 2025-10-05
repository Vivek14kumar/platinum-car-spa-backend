import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
  warrantyNumber: { type: String, required: true, unique: true }, // e.g. WTY2509270001
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  invoiceNo: { type: String, required: true }, // invoice number
  vehicleNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  warrantyPeriod: { type: Number, default: 12 }, // in months
  warrantyStart: { type: Date, default: Date.now },
  warrantyEnd: { type: Date }, // calculated from warrantyStart + warrantyPeriod
  createdAt: { type: Date, default: Date.now },
});

// Auto-calculate warrantyEnd before saving
warrantySchema.pre("save", function (next) {
  if (!this.warrantyEnd && this.warrantyPeriod) {
    const end = new Date(this.warrantyStart);
    end.setMonth(end.getMonth() + this.warrantyPeriod);
    this.warrantyEnd = end;
  }
  next();
});

const Warranty = mongoose.model("Warranty", warrantySchema);

export default Warranty;
