const express = require("express");
const jwt = require("jsonwebtoken")
const usersRouter = express.Router();
const { createUser, getUserByUsernameWithPassword } = require("../db");

// POST /api/users/login

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (password && password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password has to be at least 8 characters",
      });
    }

    const userTest = await getUserByUsernameWithPassword(username);
    if (userTest) {
      next({ name: "UserExist", message: "User already exists" });
    }
    console.log("here", username, password);
    const user = await createUser({ username, password });
    console.log("here2", user);
    if (!user) {
      next({ name: "UserCreationError", message: "Problem with registering" });
    } else {
        const token = jwt.sign(
            {id: user.id, username: user.username},
            process.env.JWT_SECRET
        )
        console.log(token, "token")
        console.log(user, "user message")
      res.send({message:"You're logged in!", token, user});
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;
