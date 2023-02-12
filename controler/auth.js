const uuid = require('uuid')
const {validateEmail} = require('../helpers/validation');
const {getUserByEmail, createUser} = require("../models/user")

async function registeration(req,res) {

    const {
        username, 
        email,
        password,
    } = req.body;
    if(!Boolean(email)) {
        res.send("Please Enter Email")
        return;
    }

        if(validateEmail(email)) {
            const user = await getUserByEmail(email);
            if(user) {
                res.send("User Already Exist");
                return;
            }
            createUser(username,email);
            res.send("created")
        }
        
        else res.send("Please enter a valid email!");
    }

    
 
 module.exports={
    registeration
 }
