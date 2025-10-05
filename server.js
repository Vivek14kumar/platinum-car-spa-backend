import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import customerRoutes from './routes/customer.js';
import bookingRoutes from './routes/booking.js';
import billingRoutes from './routes/billing.js';
import enquiryRoutes from "./routes/enquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import warrantyRoutes from "./routes/warrantyRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: ['https://platinumcarspa.in'], // your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

connectDB();

app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/billings', billingRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/warranty", warrantyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
