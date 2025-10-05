import Customer from '../models/Customer.js';
import { sendWhatsAppMsg } from '../utils/whatsapp.js';

export const addCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and Phone are required!' });
    }

    const customer = new Customer(req.body);
    await customer.save();

    // Send WhatsApp message
    await sendWhatsAppMsg(
      customer.phone,
      `Hello ${customer.name}, you are successfully registered at our Car Spa!`
    );

    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add customer', error: err.message });
  }
};

// Additional controllers for full CRUD:

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { customerId: req.params.customerId },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ customerId: req.params.customerId });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
