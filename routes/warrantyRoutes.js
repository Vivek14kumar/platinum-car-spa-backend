import express from "express";
import Warranty from "../models/Warranty.js";
import {
  createWarranty,
  getWarranties,
  getWarrantyByNumber,
  deleteWarranty,
  getBillingByInvoice,
} from "../controllers/warrantyController.js";

const router = express.Router();

// Create Warranty
router.post("/", createWarranty);

// Get all Warranties
router.get("/", getWarranties);

// 🔹 Search Warranty (must come before /:number)
router.get("/search", async (req, res) => {
  try {
    const { field, value } = req.query;
    if (!field || !value) return res.status(400).json({ message: "Field and value required" });

    let warranty;

    if (field === "warrantyNumber") {
      warranty = await Warranty.findOne({ warrantyNumber: value });
    } else if (field === "mobileNumber") {
      warranty = await Warranty.findOne({ mobileNumber: value });
    } else if (field === "invoiceNo") {
      warranty = await Warranty.findOne({ invoiceNo: value });
    } else if (field === "vehicleNumber") {
      warranty = await Warranty.findOne({
        vehicleNumber: { $regex: `^${value}$`, $options: "i" },
      });
    }

    if (!warranty) return res.status(404).json({ message: "Warranty not found" });

    res.json(warranty);
  } catch (error) {
    console.error("Warranty search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Warranty by Number (after /search!)
router.get("/:number", getWarrantyByNumber);

// Delete Warranty
router.delete("/:number", deleteWarranty);

// Get Billing by Invoice Number
router.get("/billing/:invoiceNo", getBillingByInvoice);

export default router;
