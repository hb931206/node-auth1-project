const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./userModels");
//  MiddleWare

const router = express.Router();

router.post("/register", async (res, req, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14),
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
