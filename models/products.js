const knex = require("../libraries/db")


function getProductById(id){
    return knex("products")
       .select("*")
       .where({
           id
       })
       .then((rows) => rows[0]);
   }
   async function getProducts() {
    return knex("products")
       .select("*")
       .then((rows) => rows[0]);
   }

async function getCategory() {
    return knex("products")
        .select("category")
        .then((rows) => rows[0]);
   } 

   module.exports={
    getProductById,
    getProducts,
    getCategory
   }