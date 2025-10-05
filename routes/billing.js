import express from "express";
import {
  createBilling,
  getBillings,
  getBillingByInvoiceNo,
  updateBilling,
  deleteBilling,
  getNextInvoiceNo,
} from "../controllers/billingController.js";

const router = express.Router();

// Routes
router.post("/", createBilling);
router.get("/next-invoice", getNextInvoiceNo); // fetch next invoice
router.get("/", getBillings);
router.get("/:invoiceNo", getBillingByInvoiceNo);
router.put("/:invoiceNo", updateBilling);
router.delete("/:invoiceNo", deleteBilling);

export default router;
