const Contacts = require("../models/contactModel");

// Function handling the process of getting all created contacts
const getContacts = (req, res) => {
  Contacts.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({
        data: response,
        status: 200,
        isSuccess: true,
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: error.message,
        isSuccess: false,
      });
    });
};

// Function handling the process of creating new contacts
const createContacts = (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  Contacts.create({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  })
    .then((contact) => {
      console.log(contact);
      res.json({
        statusCode: 201,
        isSuccess: true,
        data: contact,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        statusCode: 401,
        isSuccess: false,
        message: error.message,
      });
    });
};

// Function handling the process of updating contacts
const updateContacts = (req, res) => {
  const { updatedContact, id } = req.body;
  Contacts.updateOne({ _id: id }, { $set: updatedContact }, { new: true })
    .then((result) => {
      res.json({
        statusCode: 200,
        isSuccess: true,
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        statusCode: 400,
        isSuccess: false,
        message: error.message,
      });
    });
};

// Function handling the process of deleting contacts
const deleteContact = (req, res) => {
  const { id } = req.params;
  Contacts.deleteOne({ id: id })
    .then((result) => {
      res.json({
        statusCode: 200,
        isSuccess: true,
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        statusCode: 400,
        isSuccess: false,
        message: error.message,
      });
    });
};

module.exports = { getContacts, createContacts, updateContacts, deleteContact };
