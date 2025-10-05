import mongoose from 'mongoose';

const generateCustomerId = () => {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CUST${randomStr}`;
};

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    default: generateCustomerId,
    unique: true,
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  address: String,
  carModel: String,
  carNumber: String,
  serviceType: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Customer', customerSchema);
