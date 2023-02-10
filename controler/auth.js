const importedPool = require('../libraries/db')
const uuid = require('uuid')
const {validateEmail} = require('../helpers/validation');
const {getUserByEmail, createUser} = require("../models/user")
async function registeration(req,res) {

    const {
        username, 
        email,
        password,
    } = req.body;

    const user = await getUserByEmail(email);
        if(user) {
            res.send("User Already Exist");
            return;
        }
        if(validateEmail(email)) {
            createUser(username,email);
            res.send("created")
        }
        else res.send("Please enter email");
    }

    
 
 module.exports={
    registeration
 }
