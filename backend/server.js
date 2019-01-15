const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

//require("./database");

const mongoose = require("mongoose");

// this is our MongoDB database, censored the pass for obvious reasons.
const dbRoute = "mongodb://admin:ks77T7Lt6Tv8bYp@ds211724.mlab.com:11724/charon";

/**
 * @description Connects the back end code with the database
 * @param string - dbRoute, string for DB connection
 * @param Object - configuration object
 */
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const API_PORT = 3001;
const app = express();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", require("./routes"));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));