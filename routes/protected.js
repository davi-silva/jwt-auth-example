const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json("Welcome to the protected route");
});

app.post("/posts", verifyToken, (req, res) => {
  const token = req.token;
  console.log("token:", token);

  jwt.verify(token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
});

// Verify Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log("bearerHeader:", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = app;
