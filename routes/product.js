const express = require('express');
const routes = express.Router();
const productController= require('../controler/productController')


routes.get('/', productController.getProductsController)
routes.get('/categories',productController.getCategoryController)
routes.get('/:id',productController.getProductByIdController)




module.exports=routes;