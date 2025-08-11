const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/userModel");

loginRouter.post("/", async (request, response) => {
  // console.log("ENTERING LOGIN POST");
  const { username, password } = request.body;
  // console.log("body", request.body);
  const user = await User.findOne({ username });

  if (!user) {
    // console.log("no user");
    return response.status(404).json({ error: "no user found" });
  }
  // console.log("user", user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // console.log("passwordCorrect value", passwordCorrect);

  if (!(user && passwordCorrect)) {
    // console.log("user and password incorrect");
    return response.status(401).json({
      error: "invalid username and password",
    });
  }
  // console.log("user and password correct");

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  /**
   * Signs and generates the token based on the env secret as well as the username and user id
   */
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;
