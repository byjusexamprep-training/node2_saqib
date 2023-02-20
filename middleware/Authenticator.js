const { JWT_Key } = require('../controler/auth');
const verifyToken = require('../helpers/auth');

const JWT_authentication = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes('Bearer')
  ) {
    return res.status(400).send({
      status: 400,
      message: 'done',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  const payload = verifyToken(token, JWT_Key);
  console.log(payload);
//   console.log(error)
  if (!payload) {
    return res.send('invalid');
  }
  req.session = payload;
  next();
};
module.exports = JWT_authentication;