const { getUser } = require("../models/user");
const { getUserRedis, setUserRedis } = require("../models/redis");
function me(req, res) {
  const { id } = req.session;
  getUserRedis(id)
    .then((user) => {
      if (user) return res.status(200).json({ user });
      getUser(id).then((user) => {
        // console.log(user);
        if (user && user.userid) {
          setUserRedis(id, user);
          return res.status(200).json(user);
        }
        return Promise.reject({ status: 401, message: "Unauthrized Request" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(req.session)
  // // const user = await getUser(req.se)
  //   getUserRedis(req.session.id).then((user) => {
  //     if (user) {
  //       return res.status(200).json({ user });
  //     }
  //   });

  //   getUser(req.session.id)
  //     .then((user) => {
  //       console.log(user);
  //       if (user && user.userid) {
  //         setUserRedis(user.userid, user);
  //         console.log(user);
  //         return res.status(200).json(user);
  //       }
  //       return Promise.reject({ status: 401, message: "Unauthorized" });
  //     })
  //     .catch((error) => {
  //       res.status(400).send(error);
  //     });
}
module.exports = { me };
