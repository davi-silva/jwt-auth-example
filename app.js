const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use("/protected", require("./routes/protected"));
app.use("/unprotected", require("./routes/unprotected"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const { connection } = mongoose;
connection.once("open", () => {
  console.log("MongoDB Atlas database connection established successfully.");
});

app.listen(5000, () => {
  console.log("Server is listen on port: 5000");
});
