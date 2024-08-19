
const contactModel = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a contact
// @route POST /api/contacts
const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({ name, email, phone });
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getContacts, createContact };
