const knex = require("../libraries/db");
const uuid = require("uuid");
const { arrayParser } = require("pg-types");

function createUser(username, email) {
  knex("users")
    .returning("*")
    .insert({
      userid: uuid.v4(),
      username,
      email,
    })
    .then((rows) => rows[0]);
}

function getUserByEmail(email) {
  return knex("users")
    .select("*")
    .where({
      email,
    })
    .then((rows) => rows[0]);
}

function insertAuth(email, passwordHash) {
  return knex("auth")
    .insert({
      email,
      password: passwordHash,
    })
    .returning("*");
  //.then(console.log, console.log);
}

function getPassword(email) {
  return knex("auth")
    .select("password")
    .where({
      email,
    })
    .then((rows) => rows[0] && rows[0].password)
    .catch(console.log);
}

async function getUser(id) {
  return await knex("users")
    .select("*")
    .where({
      userid: id,
    })
    .then((rows) => rows[0] && rows[0])
    .catch(console.log);
}
async function putCount(count) {
  knex
    .raw("update counttable set count=? where query='login'", [count])
    .then(console.log)
    .catch(console.log);
}

async function getCount() {
  return knex("counttable")
    .select("count")
    .then((rows) => rows[0] && rows[0].count)
    .catch(console.log);
        // return knex.raw("select count from counttable where query='login")
        // .then(console.log,console.log)

}

module.exports = {
  createUser,
  getUserByEmail,
  insertAuth,
  getPassword,
  getUser,
  putCount,
  getCount,
};
