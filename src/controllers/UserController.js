const User = require("../../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  let { firstName, lastName, password } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      const email = req.body.email.toLowerCase().trim();
      User.sequelize.transaction().then(async (t) => {
        User.create(
          {
            firstName,
            lastName,
            email: email,
            password: hash,
          },
          { transaction: t }
        )
          .then(async (data) => {
            if (!data) {
              t.rollback();
              return res.status(500).json({
                message: "something went wrong",
              });
            }
            t.commit();
            return res.status(201).json({
              message: "User created successfully",
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: err.message,
            });
          });
      });
    });
  } catch (err) {
    return err.message;
  }
};
