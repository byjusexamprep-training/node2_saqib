const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express();
const knex = require('./libraries/db');

app.use(bodyParser.json());

app.use('/',routes);

app.listen(3001,()=>{
    console.log("listening at 3001");
})