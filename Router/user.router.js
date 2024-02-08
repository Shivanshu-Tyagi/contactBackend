const express = require('express');
const { register, login } = require('../controller/user.controller');
const { addTable, getContact, updateContact, deleteContact } = require('../controller/table.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login' , login)
router.post('/addContact/:id' , addTable)
router.get('/getContact/:id' , getContact)
router.put('/updateContact/:id' , updateContact)
router.delete('/deleteCoutact/:id' , deleteContact)

module.exports = router