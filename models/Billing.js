import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },       // optional, e.g., coating brand
  warranty: { type: String },    // months/years
  servicing: { type: String },   
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const billingSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, required: true, unique: true },

    // Store the exact bill date & time
    date: { type: Date, default: Date.now },

    customer: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      address: { type: String },
    },

    vehicle: {
      name: { type: String, required: true },
      color: { type: String },
      company: { type: String },
      type: { type: String },        // e.g., Sedan, SUV
      number: { type: String },      // vehicle number plate
    },

    services: [serviceSchema],

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Billing", billingSchema);
