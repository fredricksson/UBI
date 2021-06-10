const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contactController')

router.post('/', contactController.create)
router.get('/', contactController.all)
router.put('/:id', contactController.update)
router.delete('/:id', contactController.delete)
router.get('/findByName/:name', contactController.findByName)
module.exports = router