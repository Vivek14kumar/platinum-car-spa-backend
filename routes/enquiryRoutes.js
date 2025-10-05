// routes/enquiry.js
import express from "express";
import Enquiry from "../models/enquiry.js";

const router = express.Router();

// Create new enquiry
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enquiry status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Contacted", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) return res.status(404).json({ error: "Enquiry not found" });

    res.json({ message: "Status updated", enquiry: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
