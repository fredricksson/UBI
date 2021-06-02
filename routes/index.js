
const express = require('express');
const ContactController = require('../controllers/ContactController');
const router = express.Router(); 
 

router.post('/', ContactController.add); 
router.get('/all', ContactController.readContact);
router.get('/find/:value', ContactController.readContactBynameOrContact);

router.put('/:id', ContactController.update);
router.delete('/:id', ContactController.deleteOne);

 
module.exports =  router;