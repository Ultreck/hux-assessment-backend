const Contacts = require("../models/contactModel");

// Function handling the process of getting all created contacts
const getContacts = (req, res) => {
  const {id} = req.params;  
  Contacts.find({userId:id})
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
// Function handling the process of getting all created contacts
const getOnlyOneContact = (req, res) => {
  const {id} = req.params;  
  Contacts.find({_id:id})
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
  const { firstName, lastName, phoneNumber, email, userId } = req.body;
  Contacts.create({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email, 
    userId
  })
    .then((contact) => {
      res.json({
        statusCode: 201,
        isSuccess: true,
        message: "Contact is Created Successfully",
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
  const { payload, id } = req.body;
  console.log(payload);
  console.log(id);
  
  Contacts.updateOne({ _id: id }, { $set: payload }, { new: true })
    .then((result) => {
      res.json({
        statusCode: 200,
        isSuccess: true,
        message: "Contact is Successfully updated",
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
  console.log(id);

  Contacts.deleteOne({ _id: id })
    .then((result) => {
      res.json({
        statusCode: 200,
        isSuccess: true,
        message: "Contact is Successfully deleted",
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

module.exports = { getContacts, createContacts, getOnlyOneContact, updateContacts, deleteContact };
