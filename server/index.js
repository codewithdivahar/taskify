const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// Load config
// 1. dotenv config
dotenv.config({ path: "./config/config.env" });
// 2. passport config
require("./config/passport.js")(passport);

connectDB();

const app = express();

app.use(cors({ credentials: true, origin: true }));

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Logging
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(
  session({
    secret: "taskify-session",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/v1", require("./routes/tasks"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
