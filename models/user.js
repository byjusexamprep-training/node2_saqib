const knex = require("../libraries/db")
const uuid = require("uuid");
const { arrayParser } = require("pg-types");

function createUser(username, email){
     knex("users")
     .returning("*")
     .insert({ 
        userid: uuid.v4(),
        username,
        email
    })
    .then((rows) => rows[0]); 
}
 
function getUserByEmail(email){
 return   knex("users")
    .select("*")
    .where({
        email
    })
    .then((rows) => rows[0]);
}


module.exports = {
    createUser,
    getUserByEmail
};