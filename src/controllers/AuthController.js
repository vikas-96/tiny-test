const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ where: { email: email } })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({ message: "Login failed" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        const token = jwt.sign(
          {
            email: user.email,
            fullname: user.firstName + " " + user.lastName,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message: "Login success",
          access_token: token,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
