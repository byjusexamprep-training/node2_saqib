const uuid = require("uuid");
const { validateEmail } = require("../helpers/validation");
const {
  getUserByEmail,
  createUser,
  insertAuth,
  getPassword,
  putCount,
  getCount,
} = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_Key = "cgnm,mgnfbxvhkjhnhcvkckyklylkyly";

async function registeration(req, res) {
  const { username, email, password } = req.body;

  if (!password) {
    res.send("Please Enter Password");
    return;
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (!email) {
    res.send("Please Enter Email");
    return;
  }

  if (validateEmail(email)) {
    const user = await getUserByEmail(email);
    if (user) {
      res.send("User Already Exist");
      return;
    }
    await createUser(username, email);
    await insertAuth(email, passwordHash);
    res.json({ data: "created" });
  } else res.send("Please enter a valid email!");
}

async function login(req, res) {
  setTimeout(()=>{
    putCount(0);
    console.log("putted count=0")
  },60000)
//   var timest=Date.now();
//   console.log("timeStamp= "+Date.now())
  var count = await getCount();
  
  console.log("count= "+count)
  if (count > 3){
     res.send("More than 3 requests");
     return;
    }
  count=count+1;
  console.log("count= "+count)
  await putCount(count).then(console.log, console.log);
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    res.send("Please Enter Email");
    return;
  }
  if (!password) {
    res.send("Please Enter Password");
    return;
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  if (validateEmail(email)) {
    const user = await getUserByEmail(email);
    if (!user) {
      res.send("User does not exist");
      return;
    }
    if (user) {
      const fetchedPasswordHash = await getPassword(email);
      //console.log("fetched Password="+fetchedPasswordHash);
      if (fetchedPasswordHash === passwordHash) {
        const token = jwt.sign({ id: user.userid }, JWT_Key);

        res.send(token);
      }
      if (fetchedPasswordHash !== passwordHash) res.send("Wrong Password");
    }
  }
}

module.exports = {
  registeration,
  login,
  JWT_Key,
};
