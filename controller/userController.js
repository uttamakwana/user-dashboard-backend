const asyncHanlder = require("express-async-handler");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//To register user
//POST api/users/register
//@access public

const registerUser = asyncHanlder(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvaliable = await User.findOne({ email });
  if (userAvaliable) {
    res.status(400);
    throw new Error("User is already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Passoword : ", hashedPassword);
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not found");
  }
});

//To login user
//POST api/users/login
//@access public

const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "20m" }
    );

    res.status(201).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  res.status(201).json({ message: "Login succesfull" });
});

//To see current user information
//POST api/users/current
//@access private (as only logged in user can see)

const currentUser = asyncHanlder(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
