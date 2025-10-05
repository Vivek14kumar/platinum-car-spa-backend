import Warranty from "../models/Warranty.js";
import Billing from "../models/Billing.js";

// Generate Warranty Number (yymmdd + seq)
/*const generateWarrantyNumber = async () => {
  const today = new Date();
  const prefix = today.toISOString().slice(2, 10).replace(/-/g, ""); // e.g., 250927
  const count = await Warranty.countDocuments({});
  const seq = String(count + 1).padStart(4, "0");
  return `WTY${prefix}${seq}`;
};*/

// CREATE Warranty
export const createWarranty = async (req, res) => {
  try {
   // const warrantyNumber = await generateWarrantyNumber();

    const warranty = new Warranty({
      ...req.body,
    });

    await warranty.save();
    res.status(201).json({ message: "Warranty saved", warranty });
  } catch (err) {
    console.error("Error creating warranty:", err);
    res.status(500).json({ message: "Error saving warranty", error: err.message });
  }
};

// GET All Warranties
export const getWarranties = async (req, res) => {
  try {
    const warranties = await Warranty.find().sort({ createdAt: -1 });
    res.json(warranties);
  } catch (err) {
    console.error("Error fetching warranties:", err);
    res.status(500).json({ message: "Error fetching warranties", error: err.message });
  }
};

// GET Single Warranty by Number
export const getWarrantyByNumber = async (req, res) => {
  try {
    const warranty = await Warranty.findOne({ warrantyNumber: req.params.number });
    if (!warranty) return res.status(404).json({ message: "Warranty not found" });
    res.json(warranty);
  } catch (err) {
    console.error("Error fetching warranty:", err);
    res.status(500).json({ message: "Error fetching warranty", error: err.message });
  }
};

// DELETE Warranty by Number
export const deleteWarranty = async (req, res) => {
  try {
    const warranty = await Warranty.findOneAndDelete({ warrantyNumber: req.params.number });
    if (!warranty) return res.status(404).json({ message: "Warranty not found" });
    res.json({ message: "Warranty deleted successfully" });
  } catch (err) {
    console.error("Error deleting warranty:", err);
    res.status(500).json({ message: "Error deleting warranty", error: err.message });
  }
};

// GET Billing by Invoice Number
export const getBillingByInvoice = async (req, res) => {
  try {
    const billing = await Billing.findOne({ invoiceNo: req.params.invoiceNo });
    if (!billing) return res.status(404).json({ message: "Billing not found" });
    res.json(billing);
  } catch (err) {
    console.error("Error fetching billing:", err);
    res.status(500).json({ message: "Error fetching billing", error: err.message });
  }
};
