const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

//session middleware for tracking logins
app.use(session({
    secret: "2pacisalive",
    resave: true,
    saveUninitialized: false
}));


//mongodb connection
mongoose.connect("mongodb://admin:test@ds161833.mlab.com:61833/prepxp", {userClient: true});
var db = mongoose.connection;

//mongo error
db.on("error", console.error.bind(console, "connection error:"));

// routing
const routes = require("./routes/routes");
const router = express.Router();

// view set to pug
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/", routes);
app.use(express.static("public"));




//error handlers
// 404 error and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("File Not Found");
    err.status = 404;
    next(err);
})

// handle server errors - use as last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("header", { message: err.message, error: {}});
});



app.listen(3000, function() {
    console.log("Listening on 3000");
});