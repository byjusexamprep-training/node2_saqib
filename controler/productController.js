const uuid = require('uuid')
const {getProductById,getProducts,getCategory} = require("../models/products")
const asde = require('../helpers/asde');

async function getProductsController(req,res) {
        const [error,data] = await asde(getProducts());
        
        res.send(data);
    }

async function getProductByIdController(req,res) {
       const id = req.params.id;
       const data = await getProductById(id);
       
       res.send(data);
    }

async function getCategoryController(req,res) {
        const data = await getCategory();
        
        res.send(data);
    }  
 
 module.exports={
    getProductsController,
    getProductByIdController,
    getCategoryController
 }
