const express = require("express");

const app = express();

const User = require("../models/user/User");

app.get("/api", (req, res) => {
  res.json("Welcome to the unprotected route");
});

app.post("/login", (req, res) => {
  const { id } = req.body;

  User.find({
    _id: id
  })
    .then((user) => {
      console.log("user logedin:", user);
      jwt.sign({ user }, "secretkey", { expiresIn: "7d" }, (err, token) => {
        res.json({ token });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
