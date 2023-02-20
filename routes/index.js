const express=require('express');
const app=express();
const authRoutes=require('./auth');
const productRoutes= require('./product');
const userRoutes=require('./user')

app.use('/',authRoutes);
app.use('/products',productRoutes);
app.use('/',userRoutes);
module.exports=app