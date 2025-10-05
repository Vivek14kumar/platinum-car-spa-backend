import Billing from "../models/Billing.js";

// Create a new bill
export const createBilling = async (req, res) => {
  try {
    const billingData = {
      invoiceNo: req.body.invoiceNo,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      customer: req.body.customer,
      vehicle: req.body.vehicle,
      services: req.body.services || [],
      subtotal: req.body.subtotal,
      discount: req.body.discount || 0,
      total: req.body.total,
    };

    const billing = new Billing(billingData);
    await billing.save();
    res.status(201).json(billing);
  } catch (err) {
    console.error("❌ Billing save error:", err.message);
    res.status(400).json({ error: err.message, details: err.errors });
  }
};

// Get all bills
export const getBillings = async (req, res) => {
  try {
    const bills = await Billing.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bill by invoiceNo
export const getBillingByInvoiceNo = async (req, res) => {
  try {
    const { invoiceNo } = req.params;
    const bill = await Billing.findOne({ invoiceNo });
    if (!bill) return res.status(404).json({ error: "Invoice not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update bill by invoiceNo
export const updateBilling = async (req, res) => {
  try {
    const { invoiceNo } = req.params;
    const updatedData = { ...req.body, date: req.body.date ? new Date(req.body.date) : new Date() };
    const bill = await Billing.findOneAndUpdate({ invoiceNo }, updatedData, { new: true, runValidators: true });
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete bill by invoiceNo
export const deleteBilling = async (req, res) => {
  try {
    const { invoiceNo } = req.params;
    const bill = await Billing.findOneAndDelete({ invoiceNo });
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json({ message: "Bill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get next invoice number (without creating a bill)
export const getNextInvoiceNo = async (req, res) => {
  try {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");

    // Generate a random 4-digit number from 0001 to 9999
    const randomSeq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");

    const nextInvoiceNo = `${yy}${mm}${randomSeq}`;

    res.json({ nextInvoiceNo, generatedAt: now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
