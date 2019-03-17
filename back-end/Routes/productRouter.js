const express = require('express');
const bodyParser = require('body-parser');
const productController = require('../Controller/productsController')

const router = express.Router();

router.use(bodyParser.json());

router.post('/savedata',productController.initializeData)

router.post('/getProducts',productController.getProducts)

router.post('/filter',productController.filterProducts)

module.exports = router;